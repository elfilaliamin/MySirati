import type { Request, Response } from 'express';

import { loginSchema, registerSchema } from './auth.schema.js';
import {
  getUserById,
  login,
  register,
} from './auth.service.js';
import { config } from '../config/env.config.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import {
  parseAndVerifySessionToken,
  SESSION_COOKIE_NAME,
} from '../utils/session.util.js';

function setSessionCookie(response: Response, token: string, maxAge: number): void {
  response.cookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge,
  });
}

export async function handleRegister(
  request: Request,
  response: Response
): Promise<void> {
  const validatedInput = registerSchema.parse(request.body);
  const result = await register(validatedInput);

  setSessionCookie(response, result.token, result.maxAge);
  response.status(HTTP_STATUS.CREATED).json({
    success: true,
    user: result.user,
  });
}

export async function handleLogin(
  request: Request,
  response: Response
): Promise<void> {
  const validatedInput = loginSchema.parse(request.body);
  const result = await login(validatedInput);

  setSessionCookie(response, result.token, result.maxAge);
  response.status(HTTP_STATUS.OK).json({
    success: true,
    user: result.user,
  });
}


export function handleLogout(_request: Request, response: Response): void {
  response.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  response.status(HTTP_STATUS.OK).json({
    success: true,
  });
}

export async function handleGetMe(
  request: Request,
  response: Response
): Promise<void> {
  const token = request.cookies?.[SESSION_COOKIE_NAME] as string | undefined;

  if (!token) {
    response.status(HTTP_STATUS.OK).json({
      user: null,
    });
    return;
  }

  const session = parseAndVerifySessionToken(token);
  if (!session) {
    response.status(HTTP_STATUS.OK).json({
      user: null,
    });
    return;
  }

  const user = await getUserById(session.userId);
  response.status(HTTP_STATUS.OK).json({
    user,
  });
}
