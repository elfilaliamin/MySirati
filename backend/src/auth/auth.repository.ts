import { eq } from 'drizzle-orm';

import { db } from '../db/connection.js';
import type { User } from '../db/schema.js';
import { profilesTable, usersTable } from '../db/schema.js';

export async function findUserByEmail(email: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.email, email))
    .limit(1);

  return user ?? null;
}

export async function findUserById(id: string): Promise<User | null> {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, id))
    .limit(1);

  return user ?? null;
}

export async function createUser(
  email: string,
  passwordHash: string
): Promise<User> {
  const [user] = await db
    .insert(usersTable)
    .values({
      email,
      passwordHash,
      role: 'user',
      status: 'active',
      emailVerified: false,
    })
    .returning();

  if (!user) {
    throw new Error('Failed to insert user record');
  }

  return user;
}

export async function createDefaultProfile(
  userId: string,
  defaultName: string
): Promise<void> {
  await db.insert(profilesTable).values({
    userId,
    fullName: defaultName,
    links: [],
  });
}
