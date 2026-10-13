import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';

import { accountRouter } from './account/account.routes.js';
import { adminRouter } from './admin/admin.routes.js';
import { authRouter } from './auth/auth.routes.js';
import { HTTP_STATUS } from './constants/http.constants.js';
import { errorHandler } from './middleware/error.middleware.js';
import { globalRateLimiter } from './middleware/rate-limit.middleware.js';
import { profileRouter } from './profile/profile.routes.js';
import { healthRouter } from './routes/health.routes.js';
import { sectionsRouter } from './sections/sections.routes.js';
import { createShareLinksRouter } from './share-links/share-links.routes.js';
import { AppError } from './utils/app-error.js';
import { logger } from './utils/logger.js';

export function createApp(): express.Application {
  const application = express();

  application.set('trust proxy', 1);
  application.use(
    helmet({
      crossOriginEmbedderPolicy: false,
    })
  );
  application.use(express.json());
  application.use(express.urlencoded({ extended: true }));
  application.use(cookieParser());
  application.use(
    pinoHttp({
      logger,
      serializers: {
        req(req) {
          if (req.url && req.url.includes('key=')) {
            req.url = req.url.replace(/key=[^&]+/g, 'key=[REDACTED]');
          }
          return req;
        },
      },
      redact: ['req.headers.cookie', 'req.headers.authorization', 'req.query.key'],
    })
  );

  application.use(globalRateLimiter);

  const { shareLinksRouter, publicAiRouter } = createShareLinksRouter();

  application.use('/api', healthRouter);
  application.use('/api/auth', authRouter);
  application.use('/api/profile', profileRouter);
  application.use('/api/sections', sectionsRouter);
  application.use('/api/account', accountRouter);
  application.use('/api/admin', adminRouter);
  application.use('/api/share-links', shareLinksRouter);
  application.use('/api/p', publicAiRouter);

  application.use((_request, _response, next) => {
    next(new AppError('Endpoint not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND'));
  });

  application.use(errorHandler);

  return application;
}
