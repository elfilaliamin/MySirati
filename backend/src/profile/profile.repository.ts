import { eq } from 'drizzle-orm';

import type { UpdateProfileInput } from './profile.schema.js';
import { db } from '../db/connection.js';
import type { Profile } from '../db/schema.js';
import { profilesTable } from '../db/schema.js';

export async function findProfileByUserId(
  userId: string
): Promise<Profile | null> {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .limit(1);

  return profile ?? null;
}

function buildProfilePayload(userId: string, input: UpdateProfileInput) {
  return {
    userId,
    fullName: input.fullName,
    headline: input.headline || null,
    summary: input.summary || null,
    location: input.location || null,
    phone: input.phone || null,
    websiteUrl: input.websiteUrl || null,
    links: input.links,
    updatedAt: new Date(),
  };
}

export async function upsertProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<Profile> {
  const payload = buildProfilePayload(userId, input);

  const [profile] = await db
    .insert(profilesTable)
    .values(payload)
    .onConflictDoUpdate({
      target: profilesTable.userId,
      set: payload,
    })
    .returning();

  if (!profile) {
    throw new Error('Failed to update profile record');
  }

  return profile;
}
