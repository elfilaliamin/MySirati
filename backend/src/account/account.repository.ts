import { eq, max } from 'drizzle-orm';

import type { ImportAccountInput } from './account.schema.js';
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

export async function importFullCareerData(
  userId: string,
  data: ImportAccountInput
) {
  return await db.transaction(async (tx) => {
    if (data.mode === 'replace') {
      await tx.delete(educationTable).where(eq(educationTable.userId, userId));
      await tx.delete(experiencesTable).where(eq(experiencesTable.userId, userId));
      await tx.delete(projectsTable).where(eq(projectsTable.userId, userId));
      await tx.delete(skillsTable).where(eq(skillsTable.userId, userId));
      await tx.delete(languagesTable).where(eq(languagesTable.userId, userId));
    }

    const importedCounts = {
      profile: false,
      education: 0,
      experiences: 0,
      projects: 0,
      skills: 0,
      languages: 0,
    };

    if (data.profile) {
      const payload = {
        userId,
        fullName: data.profile.fullName,
        headline: data.profile.headline || null,
        summary: data.profile.summary || null,
        location: data.profile.location || null,
        phone: data.profile.phone || null,
        websiteUrl: data.profile.websiteUrl || null,
        links: data.profile.links || [],
        updatedAt: new Date(),
      };

      await tx
        .insert(profilesTable)
        .values(payload)
        .onConflictDoUpdate({
          target: profilesTable.userId,
          set: payload,
        });

      importedCounts.profile = true;
    }

    const getNextPos = async (table: typeof educationTable | typeof experiencesTable | typeof projectsTable | typeof skillsTable | typeof languagesTable) => {
      if (data.mode === 'replace') return 0;
      const [res] = await tx
        .select({ val: max(table.position) })
        .from(table)
        .where(eq(table.userId, userId));
      return (res?.val ?? -1) + 1;
    };

    if (data.education && data.education.length > 0) {
      const startPos = await getNextPos(educationTable);
      const rows = data.education.map((it, idx) => ({
        ...it,
        userId,
        position: startPos + idx,
        updatedAt: new Date(),
      }));
      await tx.insert(educationTable).values(rows);
      importedCounts.education = rows.length;
    }

    if (data.experiences && data.experiences.length > 0) {
      const startPos = await getNextPos(experiencesTable);
      const rows = data.experiences.map((it, idx) => ({
        ...it,
        userId,
        position: startPos + idx,
        updatedAt: new Date(),
      }));
      await tx.insert(experiencesTable).values(rows);
      importedCounts.experiences = rows.length;
    }

    if (data.projects && data.projects.length > 0) {
      const startPos = await getNextPos(projectsTable);
      const rows = data.projects.map((it, idx) => ({
        ...it,
        userId,
        position: startPos + idx,
        updatedAt: new Date(),
      }));
      await tx.insert(projectsTable).values(rows);
      importedCounts.projects = rows.length;
    }

    if (data.skills && data.skills.length > 0) {
      const startPos = await getNextPos(skillsTable);
      const rows = data.skills.map((it, idx) => ({
        ...it,
        userId,
        position: startPos + idx,
        updatedAt: new Date(),
      }));
      await tx.insert(skillsTable).values(rows);
      importedCounts.skills = rows.length;
    }

    if (data.languages && data.languages.length > 0) {
      const startPos = await getNextPos(languagesTable);
      const rows = data.languages.map((it, idx) => ({
        ...it,
        userId,
        position: startPos + idx,
        updatedAt: new Date(),
      }));
      await tx.insert(languagesTable).values(rows);
      importedCounts.languages = rows.length;
    }

    return importedCounts;
  });
}

