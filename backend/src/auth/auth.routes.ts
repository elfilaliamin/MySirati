import { Router } from 'express';

import {
  handleGetMe,
  handleLogin,
  handleLogout,
  handleRegister,
} from './auth.controller.js';
import { authRateLimiter } from '../middleware/rate-limit.middleware.js';
import { asyncHandler } from '../utils/async-handler.js';

export const authRouter = Router();

authRouter.post('/register', authRateLimiter, asyncHandler(handleRegister));
authRouter.post('/login', authRateLimiter, asyncHandler(handleLogin));
authRouter.post('/logout', asyncHandler(async (req, res) => handleLogout(req, res)));
authRouter.get('/me', asyncHandler(handleGetMe));
