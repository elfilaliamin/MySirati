import type { User } from '../db/schema.js';

export interface AuthenticatedUserPayload {
  readonly id: string;
  readonly email: string;
  readonly role: 'user' | 'admin';
  readonly status: 'active' | 'suspended';
}

export interface SessionTokenPayload {
  readonly userId: string;
  readonly role: 'user' | 'admin';
  readonly issuedAt: number;
  readonly expiresAt: number;
}

export interface AuthResponsePayload {
  readonly success: boolean;
  readonly user: AuthenticatedUserPayload;
}

export interface AuthStatusPayload {
  readonly user: AuthenticatedUserPayload | null;
  readonly demoEnabled: boolean;
}

export type SafeUser = Omit<User, 'passwordHash'>;
