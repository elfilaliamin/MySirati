import type { Request, Response } from 'express';

import { deleteAccountSchema } from './account.schema.js';
import { deleteUserAccount, exportUserData } from './account.service.js';
import { config } from '../config/env.config.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { SESSION_COOKIE_NAME } from '../utils/session.util.js';

export async function handleExportAccount(
  request: Request,
  response: Response
): Promise<void> {
  const userId = request.user!.id;
  const data = await exportUserData(userId);

  response.status(HTTP_STATUS.OK).json(data);
}

export async function handleDeleteAccount(
  request: Request,
  response: Response
): Promise<void> {
  const userId = request.user!.id;
  const { password } = deleteAccountSchema.parse(request.body);

  await deleteUserAccount(userId, password);

  response.clearCookie(SESSION_COOKIE_NAME, {
    httpOnly: true,
    secure: config.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
  });

  response.status(HTTP_STATUS.OK).json({ success: true });
}
