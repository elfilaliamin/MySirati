import dotenv from 'dotenv';
import { z } from 'zod';

import { DEFAULT_PORT } from '../constants/http.constants.js';

dotenv.config();

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(DEFAULT_PORT),
  DATABASE_URL: z
    .string()
    .default('postgres://mysirati_user:mysirati_pass@localhost:5432/mysirati_db'),
  SESSION_SECRET: z
    .string()
    .min(32)
    .default('super_secret_session_key_minimum_32_characters_long_for_security'),
  ADMIN_EMAIL: z.string().email().default('admin@mysirati.local'),
  ADMIN_PASSWORD: z.string().min(8).default('admin_secure_password_123'),
  PUBLIC_BASE_URL: z.string().url().default('http://localhost:8090'),
});

export type ApplicationConfig = z.infer<typeof environmentSchema>;

export const config: ApplicationConfig = environmentSchema.parse(process.env);
