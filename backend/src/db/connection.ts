import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

import * as schema from './schema.js';
import { config } from '../config/env.config.js';
import { logger } from '../utils/logger.js';

const { Pool } = pg;

export const pool = new Pool({
  connectionString: config.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

pool.on('error', (error: Error) => {
  logger.error({ error }, 'Unexpected PostgreSQL pool client error');
});

export const db = drizzle(pool, { schema });

const MAX_RETRY_ATTEMPTS = 5;
const RETRY_DELAY_MS = 2000;

function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export async function verifyDatabaseConnection(): Promise<void> {
  for (let attempt = 1; attempt <= MAX_RETRY_ATTEMPTS; attempt += 1) {
    try {
      const client = await pool.connect();
      client.release();
      logger.info('PostgreSQL database connection established successfully.');
      return;
    } catch (error) {
      logger.warn(
        { attempt, maxAttempts: MAX_RETRY_ATTEMPTS, error },
        'Failed to connect to PostgreSQL database. Retrying...'
      );

      if (attempt === MAX_RETRY_ATTEMPTS) {
        throw error;
      }

      await delay(RETRY_DELAY_MS);
    }
  }
}
