import { Router } from 'express';

import {
  handleGetProfile,
  handleUpdateProfile,
} from './profile.controller.js';
import { requireAuth } from '../middleware/auth.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';

export const profileRouter = Router();

profileRouter.use(requireAuth);

profileRouter.get('/', asyncHandler(handleGetProfile));
profileRouter.put('/', asyncHandler(handleUpdateProfile));
