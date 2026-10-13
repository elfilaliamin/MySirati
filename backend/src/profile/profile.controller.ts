import type { Request, Response } from 'express';

import { updateProfileSchema } from './profile.schema.js';
import { getProfile, updateProfile } from './profile.service.js';
import { HTTP_STATUS } from '../constants/http.constants.js';

export async function handleGetProfile(
  request: Request,
  response: Response
): Promise<void> {
  const userId = request.user!.id;
  const profile = await getProfile(userId);

  response.status(HTTP_STATUS.OK).json({ profile });
}

export async function handleUpdateProfile(
  request: Request,
  response: Response
): Promise<void> {
  const userId = request.user!.id;
  const validatedInput = updateProfileSchema.parse(request.body);
  const profile = await updateProfile(userId, validatedInput);

  response.status(HTTP_STATUS.OK).json({ profile });
}
