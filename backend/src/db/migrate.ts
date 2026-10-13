import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { migrate } from 'drizzle-orm/node-postgres/migrator';

import { db, pool, verifyDatabaseConnection } from './connection.js';
import { logger } from '../utils/logger.js';

const currentFilename = fileURLToPath(import.meta.url);
const currentDirname = path.dirname(currentFilename);
const migrationsFolder = path.resolve(currentDirname, '../../drizzle');

export async function runMigrations(): Promise<void> {
  logger.info({ migrationsFolder }, 'Starting database migrations...');
  await verifyDatabaseConnection();
  await migrate(db, { migrationsFolder });
  logger.info('Database migrations applied successfully.');
}

async function runCli(): Promise<void> {
  try {
    await runMigrations();
  } catch (error) {
    logger.error({ error }, 'Database migration failed');
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

// Execute directly if run via CLI
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  void runCli();
}
