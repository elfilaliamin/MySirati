import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HTTP_STATUS } from '../constants/http.constants.js';
import type { ApiErrorPayload } from '../types/error.types.js';
import { AppError } from '../utils/app-error.js';
import { logger } from '../utils/logger.js';

export function errorHandler(
  error: Error,
  _request: Request,
  response: Response,
  _next: NextFunction
): void {
  if (error instanceof AppError) {
    const errorResponse: ApiErrorPayload = {
      success: false,
      error: {
        code: error.errorCode,
        message: error.message,
        details: error.details,
      },
    };
    response.status(error.statusCode).json(errorResponse);
    return;
  }

  if (error instanceof ZodError) {
    const errorResponse: ApiErrorPayload = {
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: error.errors.map((e) => e.message).join(', ') || 'Validation error',
        details: error.flatten(),
      },
    };
    response.status(HTTP_STATUS.BAD_REQUEST).json(errorResponse);
    return;
  }

  logger.error({ error }, 'Unhandled application error occurred');

  const defaultErrorResponse: ApiErrorPayload = {
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An unexpected internal server error occurred',
    },
  };

  response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(defaultErrorResponse);
}
