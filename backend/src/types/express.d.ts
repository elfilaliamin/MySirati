import type { AuthenticatedUserPayload } from '../auth/auth.types.js';

declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUserPayload;
    }
  }
}
