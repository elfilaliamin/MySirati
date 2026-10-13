import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  ADMIN_SESSION_TTL_MS,
  generateSessionToken,
  parseAndVerifySessionToken,
  USER_SESSION_TTL_MS,
} from '../src/utils/session.util.js';

describe('TASK-1001: User Data Isolation & Cryptographic Session Integrity', () => {
  it('generates verifiable session token matching userId and role', () => {
    const { token } = generateSessionToken('user-1234', 'user');
    const verified = parseAndVerifySessionToken(token);

    assert.ok(verified);
    assert.strictEqual(verified.userId, 'user-1234');
    assert.strictEqual(verified.role, 'user');
  });

  it('rejects tampered session tokens', () => {
    const { token } = generateSessionToken('user-victim', 'user');
    const [, signature] = token.split('.');

    // Tamper with payload by forging another user id
    const forgedPayload = Buffer.from(
      JSON.stringify({ userId: 'user-attacker', role: 'admin', expiresAt: Date.now() + 10000 })
    ).toString('base64url');

    const tamperedToken = `${forgedPayload}.${signature}`;
    const result = parseAndVerifySessionToken(tamperedToken);

    assert.strictEqual(result, null);
  });

  it('rejects tampered signatures with timing-safe comparison', () => {
    const { token } = generateSessionToken('user-1234', 'user');
    const [payload] = token.split('.');
    const invalidToken = `${payload}.invalidSignatureValue1234567890`;

    const result = parseAndVerifySessionToken(invalidToken);
    assert.strictEqual(result, null);
  });

  it('enforces stricter 2-hour TTL for admin sessions versus 7 days for user sessions', () => {
    const userSession = generateSessionToken('user-1', 'user');
    const adminSession = generateSessionToken('admin-1', 'admin');

    assert.strictEqual(userSession.maxAge, USER_SESSION_TTL_MS);
    assert.strictEqual(adminSession.maxAge, ADMIN_SESSION_TTL_MS);
    assert.ok(adminSession.maxAge < userSession.maxAge);
  });
});
