import crypto from 'node:crypto';

import type { SessionTokenPayload } from '../auth/auth.types.js';
import { config } from '../config/env.config.js';

export const SESSION_COOKIE_NAME = 'mysirati_session';
export const USER_SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;
export const ADMIN_SESSION_TTL_MS = 2 * 60 * 60 * 1000;

function createHmacSignature(payloadBase64: string): string {
  return crypto
    .createHmac('sha256', config.SESSION_SECRET)
    .update(payloadBase64)
    .digest('base64url');
}

export function generateSessionToken(
  userId: string,
  role: 'user' | 'admin'
): { readonly token: string; readonly maxAge: number } {
  const now = Date.now();
  const maxAge = role === 'admin' ? ADMIN_SESSION_TTL_MS : USER_SESSION_TTL_MS;
  const expiresAt = now + maxAge;

  const sessionPayload: SessionTokenPayload = {
    userId,
    role,
    issuedAt: now,
    expiresAt,
  };

  const payloadString = JSON.stringify(sessionPayload);
  const payloadBase64 = Buffer.from(payloadString).toString('base64url');
  const signature = createHmacSignature(payloadBase64);

  return {
    token: `${payloadBase64}.${signature}`,
    maxAge,
  };
}

export function parseAndVerifySessionToken(
  token: string
): SessionTokenPayload | null {
  const parts = token.split('.');
  if (parts.length !== 2) {
    return null;
  }

  const [payloadBase64, providedSignature] = parts as [string, string];
  const expectedSignature = createHmacSignature(payloadBase64);

  const providedBuffer = Buffer.from(providedSignature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (
    providedBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(providedBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const jsonString = Buffer.from(payloadBase64, 'base64url').toString('utf8');
    const parsed = JSON.parse(jsonString) as SessionTokenPayload;

    if (Date.now() > parsed.expiresAt) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}
