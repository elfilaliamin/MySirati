import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import argon2 from 'argon2';

import { loginSchema, registerSchema } from '../src/auth/auth.schema.js';
import {
  generateSessionToken,
  parseAndVerifySessionToken,
  USER_SESSION_TTL_MS,
} from '../src/utils/session.util.js';

describe('Auth Flow: Registration Validation', () => {
  it('validates correct registration payload', () => {
    const input = {
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      password: 'StrongPassword123!',
    };
    const parsed = registerSchema.parse(input);
    assert.strictEqual(parsed.email, 'john.doe@example.com');
    assert.strictEqual(parsed.fullName, 'John Doe');
  });

  it('rejects registration with invalid email format', () => {
    assert.throws(
      () => registerSchema.parse({ email: 'not-an-email', password: 'ValidPassword123' }),
      /valid email/
    );
  });

  it('rejects registration with password shorter than 8 characters', () => {
    assert.throws(
      () => registerSchema.parse({ email: 'valid@example.com', password: 'short' }),
      /at least 8 characters/
    );
  });
});

describe('Auth Flow: Login & Session Authentication', () => {
  it('validates correct login payload', () => {
    const input = { email: 'User@Example.com ', password: 'SecretPassword123' };
    const parsed = loginSchema.parse(input);
    assert.strictEqual(parsed.email, 'user@example.com');
  });

  it('rejects login with empty password', () => {
    assert.throws(
      () => loginSchema.parse({ email: 'user@example.com', password: '' }),
      /Password is required/
    );
  });

  it('verifies passwords securely with Argon2id', async () => {
    const password = 'UserSecurePassword2026!';
    const hashedPassword = await argon2.hash(password);

    const matches = await argon2.verify(hashedPassword, password);
    const wrongMatches = await argon2.verify(hashedPassword, 'WrongPassword!');

    assert.strictEqual(matches, true);
    assert.strictEqual(wrongMatches, false);
  });

  it('issues and verifies authenticated session token on login', () => {
    const userId = 'usr_test_9876';
    const role = 'user';
    const { token, maxAge } = generateSessionToken(userId, role);

    assert.strictEqual(maxAge, USER_SESSION_TTL_MS);
    const session = parseAndVerifySessionToken(token);

    assert.ok(session);
    assert.strictEqual(session.userId, userId);
    assert.strictEqual(session.role, role);
  });
});
