import type { NextFunction, Request, Response, RequestHandler } from 'express';

export function asyncHandler(
  handler: (
    request: Request,
    response: Response,
    next: NextFunction
  ) => Promise<unknown>
): RequestHandler {
  return function asyncRouteMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    Promise.resolve(handler(request, response, next)).catch(next);
  };
}
