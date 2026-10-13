import crypto from 'node:crypto';

import { buildJsonResume } from './resume-builder.service.js';
import type { ShareLinksRepository } from './share-links.repository.js';
import type {
  CreateShareLinkInput,
  ShareLinkIncludeInput,
  UpdateShareLinkInput,
} from './share-links.schema.js';
import type { ShareLink } from '../db/schema.js';

export class ShareLinksService {
  constructor(private readonly repo: ShareLinksRepository) {}

  private generateKeyAndHash() {
    const key = crypto.randomBytes(32).toString('base64url');
    const keyHash = crypto.createHash('sha256').update(key).digest('hex');
    const keyPrefix = key.substring(0, 6);
    return { key, keyHash, keyPrefix };
  }

  private sanitizeLink(link: ShareLink) {
    const { keyHash: _hash, ...safe } = link;
    return safe;
  }

  async listLinks(userId: string) {
    const links = await this.repo.findUserLinks(userId);
    return links.map((l) => this.sanitizeLink(l));
  }

  async createLink(userId: string, input: CreateShareLinkInput) {
    const { key, keyHash, keyPrefix } = this.generateKeyAndHash();
    const created = await this.repo.createLink({
      userId,
      name: input.name,
      keyHash,
      keyPrefix,
      include: input.include,
      expiresAt: input.expiresAt ? new Date(input.expiresAt) : null,
    });
    return { link: this.sanitizeLink(created), key };
  }

  async getLink(userId: string, id: string) {
    const link = await this.repo.findUserLinkById(userId, id);
    if (!link) return null;
    return this.sanitizeLink(link);
  }

  async updateLink(userId: string, id: string, input: UpdateShareLinkInput) {
    const updated = await this.repo.updateLink(userId, id, {
      name: input.name,
      include: input.include,
      expiresAt: input.expiresAt !== undefined ? (input.expiresAt ? new Date(input.expiresAt) : null) : undefined,
    });
    if (!updated) return null;
    return this.sanitizeLink(updated);
  }

  async regenerateKey(userId: string, id: string, expiresAt?: string | null) {
    const { key, keyHash, keyPrefix } = this.generateKeyAndHash();
    const updated = await this.repo.regenerateKey(userId, id, {
      keyHash,
      keyPrefix,
      expiresAt: expiresAt !== undefined ? (expiresAt ? new Date(expiresAt) : null) : undefined,
    });
    if (!updated) return null;
    return { link: this.sanitizeLink(updated), key };
  }

  async revokeLink(userId: string, id: string) {
    const revoked = await this.repo.revokeLink(userId, id);
    if (!revoked) return null;
    return this.sanitizeLink(revoked);
  }

  async deleteLink(userId: string, id: string) {
    return this.repo.deleteLink(userId, id);
  }

  async preview(userId: string, include: ShareLinkIncludeInput) {
    const dataset = await this.repo.getCareerDataset(userId);
    if (!dataset) return null;
    return buildJsonResume(dataset, include);
  }

  async getPublicResume(rawKey: string) {
    const keyHash = crypto.createHash('sha256').update(rawKey).digest('hex');
    const result = await this.repo.findLinkByHash(keyHash);

    if (!result) return null;
    const { link, user } = result;

    if (user.status !== 'active') return null;
    if (link.revokedAt) return null;
    if (link.expiresAt && link.expiresAt < new Date()) return null;

    void this.repo.recordLastUsed(link.id);

    const dataset = await this.repo.getCareerDataset(user.id);
    if (!dataset) return null;

    return buildJsonResume(dataset, link.include);
  }
}
