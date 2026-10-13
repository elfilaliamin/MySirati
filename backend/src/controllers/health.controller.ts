import type { Request, Response } from 'express';

import { HTTP_STATUS } from '../constants/http.constants.js';
import { getHealthStatus } from '../services/health.service.js';

export function handleGetHealth(_request: Request, response: Response): void {
  const healthStatus = getHealthStatus();
  response.status(HTTP_STATUS.OK).json(healthStatus);
}
