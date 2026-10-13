import { createApp } from './app.js';
import { config } from './config/env.config.js';
import { logger } from './utils/logger.js';

const app = createApp();

const server = app.listen(config.PORT, () => {
  logger.info(`MySirati backend server started on port ${config.PORT}`);
});

function handleShutdown(signal: string): void {
  logger.info(`Received ${signal}. Gracefully terminating server...`);
  server.close(() => {
    logger.info('HTTP server closed cleanly.');
    process.exit(0);
  });
}

process.on('SIGINT', () => handleShutdown('SIGINT'));
process.on('SIGTERM', () => handleShutdown('SIGTERM'));
