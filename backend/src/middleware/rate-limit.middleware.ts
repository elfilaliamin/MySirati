import type { Request, Response } from 'express';
import rateLimit from 'express-rate-limit';

import {
  AUTH_RATE_LIMIT_MAX_REQUESTS,
  AUTH_RATE_LIMIT_WINDOW_MS,
  HTTP_STATUS,
  PUBLIC_AI_RATE_LIMIT_MAX_REQUESTS,
  PUBLIC_AI_RATE_LIMIT_WINDOW_MS,
  RATE_LIMIT_MAX_REQUESTS,
  RATE_LIMIT_WINDOW_MS,
} from '../constants/http.constants.js';

export function extractClientIp(request: Request): string {
  const cfIp = request.headers['cf-connecting-ip'];
  if (typeof cfIp === 'string' && cfIp.trim() !== '') {
    return cfIp.trim();
  }

  const fwd = request.headers['x-forwarded-for'];
  if (fwd) {
    const raw = Array.isArray(fwd) ? fwd[0] : fwd;
    const first = raw?.split(',')[0]?.trim();
    if (first) return first;
  }

  const realIp = request.headers['x-real-ip'];
  if (typeof realIp === 'string' && realIp.trim() !== '') {
    return realIp.trim();
  }

  return request.ip ?? '127.0.0.1';
}

function handleLimitReached(_req: Request, res: Response): void {
  res.status(HTTP_STATUS.TOO_MANY_REQUESTS).json({
    status: 'fail',
    code: 'RATE_LIMIT_EXCEEDED',
    message: 'Too many requests. Please wait before retrying.',
  });
}

export const globalRateLimiter = rateLimit({
  windowMs: RATE_LIMIT_WINDOW_MS,
  max: RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: extractClientIp,
  handler: handleLimitReached,
});

export const authRateLimiter = rateLimit({
  windowMs: AUTH_RATE_LIMIT_WINDOW_MS,
  max: AUTH_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
  keyGenerator: extractClientIp,
  handler: handleLimitReached,
});

export const publicAiRateLimiter = rateLimit({
  windowMs: PUBLIC_AI_RATE_LIMIT_WINDOW_MS,
  max: PUBLIC_AI_RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: extractClientIp,
  handler: handleLimitReached,
});
