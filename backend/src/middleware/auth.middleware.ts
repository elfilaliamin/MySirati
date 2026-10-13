import type { NextFunction, Request, Response } from 'express';

import { findUserById } from '../auth/auth.repository.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { AppError } from '../utils/app-error.js';
import {
  parseAndVerifySessionToken,
  SESSION_COOKIE_NAME,
} from '../utils/session.util.js';

export async function requireAuth(
  request: Request,
  _response: Response,
  next: NextFunction
): Promise<void> {
  const token = request.cookies?.[SESSION_COOKIE_NAME] as string | undefined;

  if (!token) {
    next(new AppError('Authentication required', HTTP_STATUS.UNAUTHORIZED, 'UNAUTHORIZED'));
    return;
  }

  const session = parseAndVerifySessionToken(token);
  if (!session) {
    next(new AppError('Invalid or expired session', HTTP_STATUS.UNAUTHORIZED, 'SESSION_EXPIRED'));
    return;
  }

  const user = await findUserById(session.userId);
  if (!user) {
    next(new AppError('User account not found', HTTP_STATUS.UNAUTHORIZED, 'USER_NOT_FOUND'));
    return;
  }

  if (user.status === 'suspended') {
    next(
      new AppError(
        'Your account has been suspended. Please contact support.',
        HTTP_STATUS.FORBIDDEN,
        'ACCOUNT_SUSPENDED'
      )
    );
    return;
  }

  request.user = {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  };

  next();
}

export function requireAdmin(
  request: Request,
  _response: Response,
  next: NextFunction
): void {
  // Non-admins receive 404 to obscure admin endpoint existence
  if (!request.user || request.user.role !== 'admin') {
    next(new AppError('Endpoint not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND'));
    return;
  }

  next();
}
