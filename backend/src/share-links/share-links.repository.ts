import { and, desc, eq } from 'drizzle-orm';

import type { UserCareerDataset } from './resume-builder.service.js';
import { db } from '../db/connection.js';
import type { NewShareLink, ShareLink } from '../db/schema.js';
import {
  educationTable,
  experiencesTable,
  languagesTable,
  profilesTable,
  projectsTable,
  shareLinksTable,
  skillsTable,
  usersTable,
} from '../db/schema.js';

export class ShareLinksRepository {
  async findUserLinks(userId: string): Promise<ShareLink[]> {
    return db
      .select()
      .from(shareLinksTable)
      .where(eq(shareLinksTable.userId, userId))
      .orderBy(desc(shareLinksTable.createdAt));
  }

  async findUserLinkById(userId: string, id: string): Promise<ShareLink | null> {
    const [link] = await db
      .select()
      .from(shareLinksTable)
      .where(and(eq(shareLinksTable.userId, userId), eq(shareLinksTable.id, id)))
      .limit(1);
    return link || null;
  }

  async createLink(data: NewShareLink): Promise<ShareLink> {
    const [created] = await db.insert(shareLinksTable).values(data).returning();
    if (!created) throw new Error('Failed to insert share link');
    return created;
  }

  async updateLink(
    userId: string,
    id: string,
    data: Partial<Pick<ShareLink, 'name' | 'include' | 'expiresAt'>>
  ): Promise<ShareLink | null> {
    const [updated] = await db
      .update(shareLinksTable)
      .set(data)
      .where(and(eq(shareLinksTable.userId, userId), eq(shareLinksTable.id, id)))
      .returning();
    return updated || null;
  }

  async regenerateKey(
    userId: string,
    id: string,
    data: { keyHash: string; keyPrefix: string; expiresAt?: Date | null }
  ): Promise<ShareLink | null> {
    const [updated] = await db
      .update(shareLinksTable)
      .set({
        keyHash: data.keyHash,
        keyPrefix: data.keyPrefix,
        expiresAt: data.expiresAt !== undefined ? data.expiresAt : undefined,
        revokedAt: null,
      })
      .where(and(eq(shareLinksTable.userId, userId), eq(shareLinksTable.id, id)))
      .returning();
    return updated || null;
  }

  async revokeLink(userId: string, id: string): Promise<ShareLink | null> {
    const [revoked] = await db
      .update(shareLinksTable)
      .set({ revokedAt: new Date() })
      .where(and(eq(shareLinksTable.userId, userId), eq(shareLinksTable.id, id)))
      .returning();
    return revoked || null;
  }

  async deleteLink(userId: string, id: string): Promise<boolean> {
    const result = await db
      .delete(shareLinksTable)
      .where(and(eq(shareLinksTable.userId, userId), eq(shareLinksTable.id, id)))
      .returning({ id: shareLinksTable.id });
    return result.length > 0;
  }

  async findLinkByHash(keyHash: string) {
    const [result] = await db
      .select({
        link: shareLinksTable,
        user: usersTable,
      })
      .from(shareLinksTable)
      .innerJoin(usersTable, eq(shareLinksTable.userId, usersTable.id))
      .where(eq(shareLinksTable.keyHash, keyHash))
      .limit(1);
    return result || null;
  }

  async recordLastUsed(id: string): Promise<void> {
    await db
      .update(shareLinksTable)
      .set({ lastUsedAt: new Date() })
      .where(eq(shareLinksTable.id, id));
  }

  async getCareerDataset(userId: string): Promise<UserCareerDataset | null> {
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, userId)).limit(1);
    const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.userId, userId)).limit(1);
    if (!user || !profile) return null;

    const [education, experiences, projects, skills, languages] = await Promise.all([
      db.select().from(educationTable).where(eq(educationTable.userId, userId)).orderBy(educationTable.position),
      db.select().from(experiencesTable).where(eq(experiencesTable.userId, userId)).orderBy(experiencesTable.position),
      db.select().from(projectsTable).where(eq(projectsTable.userId, userId)).orderBy(projectsTable.position),
      db.select().from(skillsTable).where(eq(skillsTable.userId, userId)).orderBy(skillsTable.position),
      db.select().from(languagesTable).where(eq(languagesTable.userId, userId)).orderBy(languagesTable.position),
    ]);

    return { user, profile, education, experiences, projects, skills, languages };
  }
}
