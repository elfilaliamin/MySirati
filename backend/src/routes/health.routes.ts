import { Router } from 'express';

import { handleGetHealth } from '../controllers/health.controller.js';

export const healthRouter = Router();

healthRouter.get('/health', handleGetHealth);
