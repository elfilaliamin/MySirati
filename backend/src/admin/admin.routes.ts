import { Router } from 'express';

import {
  deleteUserHandler,
  getStatsHandler,
  getUserDetailHandler,
  listAuditLogsHandler,
  listUsersHandler,
  revokeUserLinksHandler,
  updateUserStatusHandler,
} from './admin.controller.js';
import { requireAdmin, requireAuth } from '../middleware/auth.middleware.js';

export function createAdminRouter(): Router {
  const router = Router();

  router.use(requireAuth, requireAdmin);

  router.get('/stats', getStatsHandler);
  router.get('/users', listUsersHandler);
  router.get('/users/:id', getUserDetailHandler);
  router.patch('/users/:id/status', updateUserStatusHandler);
  router.post('/users/:id/revoke-links', revokeUserLinksHandler);
  router.delete('/users/:id', deleteUserHandler);
  router.get('/audit-log', listAuditLogsHandler);

  return router;
}

export const adminRouter = createAdminRouter();
