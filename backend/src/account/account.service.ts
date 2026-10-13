import argon2 from 'argon2';

import {
  deleteUserById,
  fetchFullCareerData,
  getUserWithPassword,
} from './account.repository.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { AppError } from '../utils/app-error.js';

export async function exportUserData(userId: string) {
  const user = await getUserWithPassword(userId);
  if (!user) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }

  const careerData = await fetchFullCareerData(userId);

  return {
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
      status: user.status,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    },
    ...careerData,
    exportedAt: new Date().toISOString(),
  };
}

export async function deleteUserAccount(
  userId: string,
  passwordConfirmation: string
): Promise<void> {
  const user = await getUserWithPassword(userId);
  if (!user) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }

  const isValidPassword = await argon2.verify(user.passwordHash, passwordConfirmation);
  if (!isValidPassword) {
    throw new AppError(
      'Incorrect password confirmation',
      HTTP_STATUS.UNAUTHORIZED,
      'INVALID_PASSWORD'
    );
  }

  await deleteUserById(userId);
}
