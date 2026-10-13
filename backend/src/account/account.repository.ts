import { eq } from 'drizzle-orm';

import { db } from '../db/connection.js';
import {
  educationTable,
  experiencesTable,
  languagesTable,
  profilesTable,
  projectsTable,
  shareLinksTable,
  skillsTable,
  usersTable,
} from '../db/schema.js';

export async function getUserWithPassword(userId: string) {
  const [user] = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  return user ?? null;
}

export async function fetchFullCareerData(userId: string) {
  const [profile] = await db
    .select()
    .from(profilesTable)
    .where(eq(profilesTable.userId, userId))
    .limit(1);

  const education = await db
    .select()
    .from(educationTable)
    .where(eq(educationTable.userId, userId));

  const experiences = await db
    .select()
    .from(experiencesTable)
    .where(eq(experiencesTable.userId, userId));

  const projects = await db
    .select()
    .from(projectsTable)
    .where(eq(projectsTable.userId, userId));

  const skills = await db
    .select()
    .from(skillsTable)
    .where(eq(skillsTable.userId, userId));

  const languages = await db
    .select()
    .from(languagesTable)
    .where(eq(languagesTable.userId, userId));

  const shareLinks = await db
    .select({
      id: shareLinksTable.id,
      name: shareLinksTable.name,
      keyPrefix: shareLinksTable.keyPrefix,
      include: shareLinksTable.include,
      createdAt: shareLinksTable.createdAt,
      expiresAt: shareLinksTable.expiresAt,
      revokedAt: shareLinksTable.revokedAt,
      lastUsedAt: shareLinksTable.lastUsedAt,
    })
    .from(shareLinksTable)
    .where(eq(shareLinksTable.userId, userId));

  return {
    profile: profile ?? null,
    education,
    experiences,
    projects,
    skills,
    languages,
    shareLinks,
  };
}

export async function deleteUserById(userId: string): Promise<boolean> {
  const deleted = await db
    .delete(usersTable)
    .where(eq(usersTable.id, userId))
    .returning();

  return deleted.length > 0;
}
