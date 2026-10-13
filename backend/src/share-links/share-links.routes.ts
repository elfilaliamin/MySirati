import { Router } from 'express';

import { ShareLinksController } from './share-links.controller.js';
import { ShareLinksRepository } from './share-links.repository.js';
import { ShareLinksService } from './share-links.service.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { publicAiRateLimiter } from '../middleware/rate-limit.middleware.js';

export const createShareLinksRouter = (): {
  shareLinksRouter: Router;
  publicAiRouter: Router;
} => {
  const repo = new ShareLinksRepository();
  const service = new ShareLinksService(repo);
  const controller = new ShareLinksController(service);

  const shareLinksRouter = Router();
  shareLinksRouter.use(requireAuth);

  shareLinksRouter.get('/', controller.list);
  shareLinksRouter.post('/', controller.create);
  shareLinksRouter.post('/preview', controller.preview);
  shareLinksRouter.get('/:id', controller.getById);
  shareLinksRouter.put('/:id', controller.update);
  shareLinksRouter.post('/:id/regenerate', controller.regenerate);
  shareLinksRouter.post('/:id/revoke', controller.revoke);
  shareLinksRouter.delete('/:id', controller.delete);

  const publicAiRouter = Router();
  publicAiRouter.get('/', publicAiRateLimiter, controller.publicResume);

  return { shareLinksRouter, publicAiRouter };
};
