import { findProfileByUserId, upsertProfile } from './profile.repository.js';
import type { UpdateProfileInput } from './profile.schema.js';
import type { Profile } from '../db/schema.js';


export async function getProfile(userId: string): Promise<Profile> {
  const existingProfile = await findProfileByUserId(userId);
  if (existingProfile) {
    return existingProfile;
  }

  // Create default fallback profile if none exists
  return upsertProfile(userId, {
    fullName: 'Professional',
    links: [],
  });
}

export async function updateProfile(
  userId: string,
  input: UpdateProfileInput
): Promise<Profile> {
  return upsertProfile(userId, input);
}
