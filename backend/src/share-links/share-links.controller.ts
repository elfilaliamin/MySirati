import type { Request, Response } from 'express';

import {
  createShareLinkSchema,
  previewShareLinkSchema,
  updateShareLinkSchema,
} from './share-links.schema.js';
import type { ShareLinksService } from './share-links.service.js';

export class ShareLinksController {
  constructor(private readonly service: ShareLinksService) {}

  list = async (req: Request, res: Response): Promise<void> => {
    const links = await this.service.listLinks(req.user!.id);
    res.json({ links });
  };

  create = async (req: Request, res: Response): Promise<void> => {
    const input = createShareLinkSchema.parse(req.body);
    const result = await this.service.createLink(req.user!.id, input);
    res.status(201).json(result);
  };

  getById = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const link = await this.service.getLink(req.user!.id, id);
    if (!link) {
      res.status(404).json({ message: 'Share link not found' });
      return;
    }
    res.json({ link });
  };

  update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const input = updateShareLinkSchema.parse(req.body);
    const link = await this.service.updateLink(req.user!.id, id, input);
    if (!link) {
      res.status(404).json({ message: 'Share link not found' });
      return;
    }
    res.json({ link });
  };

  regenerate = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const result = await this.service.regenerateKey(
      req.user!.id,
      id,
      req.body?.expiresAt
    );
    if (!result) {
      res.status(404).json({ message: 'Share link not found' });
      return;
    }
    res.json(result);
  };

  revoke = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const link = await this.service.revokeLink(req.user!.id, id);
    if (!link) {
      res.status(404).json({ message: 'Share link not found' });
      return;
    }
    res.json({ link });
  };

  delete = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id as string;
    const deleted = await this.service.deleteLink(req.user!.id, id);
    if (!deleted) {
      res.status(404).json({ message: 'Share link not found' });
      return;
    }
    res.json({ message: 'Share link deleted' });
  };

  preview = async (req: Request, res: Response): Promise<void> => {
    const input = previewShareLinkSchema.parse(req.body);
    const previewData = await this.service.preview(req.user!.id, input.include);
    if (!previewData) {
      res.status(404).json({ message: 'Career dataset not found' });
      return;
    }
    res.json(previewData);
  };

  private extractKey(req: Request): string | null {
    if (typeof req.query.key === 'string' && req.query.key.length >= 10) {
      return req.query.key;
    }
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7).trim();
      if (token.length >= 10) return token;
    }
    return null;
  }

  publicResume = async (req: Request, res: Response): Promise<void> => {
    const rawKey = this.extractKey(req);
    if (!rawKey) {
      res.status(404).json({ message: 'Resume link not found or inactive' });
      return;
    }

    const resume = await this.service.getPublicResume(rawKey);
    if (!resume) {
      res.status(404).json({ message: 'Resume link not found or inactive' });
      return;
    }

    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.json(resume);
  };
}
