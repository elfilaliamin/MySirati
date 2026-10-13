import argon2 from 'argon2';

import {
  createDefaultProfile,
  createUser,
  findUserByEmail,
  findUserById,
} from './auth.repository.js';
import type { LoginInput, RegisterInput } from './auth.schema.js';
import type { AuthenticatedUserPayload } from './auth.types.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { AppError } from '../utils/app-error.js';
import { generateSessionToken } from '../utils/session.util.js';

export interface AuthSuccessResult {
  readonly user: AuthenticatedUserPayload;
  readonly token: string;
  readonly maxAge: number;
}

function mapToAuthenticatedUser(user: {
  readonly id: string;
  readonly email: string;
  readonly role: 'user' | 'admin';
  readonly status: 'active' | 'suspended';
}): AuthenticatedUserPayload {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    status: user.status,
  };
}

export async function register(input: RegisterInput): Promise<AuthSuccessResult> {
  const normalizedEmail = input.email.toLowerCase().trim();
  const existingUser = await findUserByEmail(normalizedEmail);

  if (existingUser) {
    throw new AppError(
      'An account with this email address already exists',
      HTTP_STATUS.CONFLICT,
      'EMAIL_ALREADY_EXISTS'
    );
  }

  const passwordHash = await argon2.hash(input.password);
  const newUser = await createUser(normalizedEmail, passwordHash);

  const defaultName = normalizedEmail.split('@')[0] ?? 'User';
  const profileName = input.fullName?.trim() || defaultName;
  await createDefaultProfile(newUser.id, profileName);

  const { token, maxAge } = generateSessionToken(newUser.id, newUser.role);
  return {
    user: mapToAuthenticatedUser(newUser),
    token,
    maxAge,
  };
}

export async function login(input: LoginInput): Promise<AuthSuccessResult> {
  const normalizedEmail = input.email.toLowerCase().trim();
  const user = await findUserByEmail(normalizedEmail);

  if (!user) {
    throw new AppError(
      'Invalid email or password',
      HTTP_STATUS.UNAUTHORIZED,
      'INVALID_CREDENTIALS'
    );
  }

  const isPasswordValid = await argon2.verify(user.passwordHash, input.password);
  if (!isPasswordValid) {
    throw new AppError(
      'Invalid email or password',
      HTTP_STATUS.UNAUTHORIZED,
      'INVALID_CREDENTIALS'
    );
  }

  if (user.status === 'suspended') {
    throw new AppError(
      'Your account has been suspended. Please contact support.',
      HTTP_STATUS.FORBIDDEN,
      'ACCOUNT_SUSPENDED'
    );
  }

  const { token, maxAge } = generateSessionToken(user.id, user.role);
  return {
    user: mapToAuthenticatedUser(user),
    token,
    maxAge,
  };
}


export async function getUserById(
  id: string
): Promise<AuthenticatedUserPayload | null> {
  const user = await findUserById(id);
  if (!user) {
    return null;
  }
  return mapToAuthenticatedUser(user);
}
