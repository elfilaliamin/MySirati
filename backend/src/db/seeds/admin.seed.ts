import argon2 from 'argon2';
import { eq } from 'drizzle-orm';

import { config } from '../../config/env.config.js';
import { logger } from '../../utils/logger.js';
import { db, pool, verifyDatabaseConnection } from '../connection.js';
import { profilesTable, usersTable } from '../schema.js';

export async function seedAdmin(): Promise<void> {
  await verifyDatabaseConnection();

  const adminEmail = config.ADMIN_EMAIL.toLowerCase().trim();
  const hashedPassword = await argon2.hash(config.ADMIN_PASSWORD);

  logger.info({ adminEmail }, 'Seeding administrative user account...');

  const [existingAdmin] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, adminEmail))
    .limit(1);

  if (existingAdmin) {
    await db
      .update(usersTable)
      .set({
        passwordHash: hashedPassword,
        role: 'admin',
        status: 'active',
        updatedAt: new Date(),
      })
      .where(eq(usersTable.id, existingAdmin.id));

    logger.info({ adminEmail }, 'Existing admin account updated successfully.');
    return;
  }

  const [insertedAdmin] = await db
    .insert(usersTable)
    .values({
      email: adminEmail,
      passwordHash: hashedPassword,
      role: 'admin',
      status: 'active',
      emailVerified: true,
    })
    .returning();

  if (insertedAdmin) {
    await db.insert(profilesTable).values({
      userId: insertedAdmin.id,
      fullName: 'System Administrator',
      headline: 'MySirati Platform Administrator',
    });
  }

  logger.info({ adminEmail }, 'Admin account seeded successfully.');
}

async function runCli(): Promise<void> {
  try {
    await seedAdmin();
  } catch (error) {
    logger.error({ error }, 'Failed to seed admin account');
    process.exitCode = 1;
  } finally {
    await pool.end();
  }
}

if (process.argv[1] && process.argv[1].endsWith('admin.seed.ts')) {
  void runCli();
}
