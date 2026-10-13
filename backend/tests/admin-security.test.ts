import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import type { NextFunction, Request, Response } from 'express';

import { requireAdmin } from '../src/middleware/auth.middleware.js';
import { AppError } from '../src/utils/app-error.js';

describe('TASK-1002: Admin Route Security & 404 Obscurity (DEC-001)', () => {
  it('returns 404 Not Found for standard non-admin users to obscure admin existence', () => {
    let capturedError: unknown = null;
    const mockReq = {
      user: { id: 'user-standard', email: 'user@test.com', role: 'user', status: 'active' },
    } as unknown as Request;
    const mockRes = {} as Response;
    const next: NextFunction = (err) => {
      capturedError = err;
    };

    requireAdmin(mockReq, mockRes, next);

    assert.ok(capturedError instanceof AppError);
    assert.strictEqual((capturedError as AppError).statusCode, 404);
    assert.strictEqual((capturedError as AppError).errorCode, 'NOT_FOUND');
    assert.strictEqual((capturedError as AppError).message, 'Endpoint not found');
  });

  it('returns 404 Not Found when unauthenticated request reaches requireAdmin', () => {
    let capturedError: unknown = null;
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const next: NextFunction = (err) => {
      capturedError = err;
    };

    requireAdmin(mockReq, mockRes, next);

    assert.ok(capturedError instanceof AppError);
    assert.strictEqual((capturedError as AppError).statusCode, 404);
  });

  it('permits access when user role is admin', () => {
    let nextCalled = false;
    let capturedError: unknown = null;
    const mockReq = {
      user: { id: 'admin-1', email: 'admin@mysirati.local', role: 'admin', status: 'active' },
    } as unknown as Request;
    const mockRes = {} as Response;
    const next: NextFunction = (err) => {
      nextCalled = true;
      capturedError = err;
    };

    requireAdmin(mockReq, mockRes, next);

    assert.strictEqual(nextCalled, true);
    assert.strictEqual(capturedError, undefined);
  });
});
