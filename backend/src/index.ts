import { createApp } from './app.js';
import { config } from './config/env.config.js';
import { runMigrations } from './db/migrate.js';
import { seedAdmin } from './db/seeds/admin.seed.js';
import { logger } from './utils/logger.js';

async function bootstrap(): Promise<void> {
  try {
    await runMigrations();
    await seedAdmin();
  } catch (error) {
    logger.error({ error }, 'Failed to initialize database schema');
    process.exit(1);
  }

  const app = createApp();

  const server = app.listen(config.PORT, () => {
    logger.info(`MySirati backend server started on port ${config.PORT}`);
  });

  const handleShutdown = (signal: string): void => {
    logger.info(`Received ${signal}. Gracefully terminating server...`);
    server.close(() => {
      logger.info('HTTP server closed cleanly.');
      process.exit(0);
    });
  };

  process.on('SIGINT', () => handleShutdown('SIGINT'));
  process.on('SIGTERM', () => handleShutdown('SIGTERM'));
}

void bootstrap();
