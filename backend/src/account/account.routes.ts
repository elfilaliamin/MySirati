import { Router } from 'express';

import {
  handleDeleteAccount,
  handleExportAccount,
} from './account.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';

export const accountRouter = Router();

accountRouter.use(requireAuth);

accountRouter.get('/export', asyncHandler(handleExportAccount));
accountRouter.delete('/', asyncHandler(handleDeleteAccount));
