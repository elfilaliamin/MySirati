import { and, asc, eq, max } from 'drizzle-orm';

import type {
  EducationInput,
  ExperienceInput,
  LanguageInput,
  ProjectInput,
  SectionName,
  SkillInput,
} from './sections.schema.js';
import { db } from '../db/connection.js';
import type {
  Education,
  Experience,
  Language,
  Project,
  Skill,
} from '../db/schema.js';
import {
  educationTable,
  experiencesTable,
  languagesTable,
  projectsTable,
  skillsTable,
} from '../db/schema.js';

export type AnySectionItem = Education | Experience | Project | Skill | Language;

interface SectionOperations {
  find(userId: string): Promise<readonly AnySectionItem[]>;
  findById(userId: string, id: string): Promise<AnySectionItem | null>;
  getMaxPos(userId: string): Promise<number | null>;
  create(userId: string, input: unknown, position: number): Promise<AnySectionItem>;
  update(userId: string, id: string, input: unknown): Promise<AnySectionItem | null>;
  delete(userId: string, id: string): Promise<boolean>;
  reorder(userId: string, id: string, position: number): Promise<void>;
}

const educationOps: SectionOperations = {
  find: (userId) => db.select().from(educationTable).where(eq(educationTable.userId, userId)).orderBy(asc(educationTable.position)),
  findById: async (userId, id) => {
    const [item] = await db.select().from(educationTable).where(and(eq(educationTable.id, id), eq(educationTable.userId, userId))).limit(1);
    return item ?? null;
  },
  getMaxPos: async (userId) => {
    const [res] = await db.select({ val: max(educationTable.position) }).from(educationTable).where(eq(educationTable.userId, userId));
    return res?.val ?? null;
  },
  create: async (userId, input, position) => {
    const [item] = await db.insert(educationTable).values({ ...(input as EducationInput), userId, position }).returning();
    if (!item) throw new Error('Failed to create education item');
    return item;
  },
  update: async (userId, id, input) => {
    const [item] = await db.update(educationTable).set({ ...(input as Partial<EducationInput>), updatedAt: new Date() }).where(and(eq(educationTable.id, id), eq(educationTable.userId, userId))).returning();
    return item ?? null;
  },
  delete: async (userId, id) => {
    const res = await db.delete(educationTable).where(and(eq(educationTable.id, id), eq(educationTable.userId, userId))).returning();
    return res.length > 0;
  },
  reorder: async (userId, id, position) => {
    await db.update(educationTable).set({ position, updatedAt: new Date() }).where(and(eq(educationTable.id, id), eq(educationTable.userId, userId)));
  },
};

const experiencesOps: SectionOperations = {
  find: (userId) => db.select().from(experiencesTable).where(eq(experiencesTable.userId, userId)).orderBy(asc(experiencesTable.position)),
  findById: async (userId, id) => {
    const [item] = await db.select().from(experiencesTable).where(and(eq(experiencesTable.id, id), eq(experiencesTable.userId, userId))).limit(1);
    return item ?? null;
  },
  getMaxPos: async (userId) => {
    const [res] = await db.select({ val: max(experiencesTable.position) }).from(experiencesTable).where(eq(experiencesTable.userId, userId));
    return res?.val ?? null;
  },
  create: async (userId, input, position) => {
    const [item] = await db.insert(experiencesTable).values({ ...(input as ExperienceInput), userId, position }).returning();
    if (!item) throw new Error('Failed to create experience item');
    return item;
  },
  update: async (userId, id, input) => {
    const [item] = await db.update(experiencesTable).set({ ...(input as Partial<ExperienceInput>), updatedAt: new Date() }).where(and(eq(experiencesTable.id, id), eq(experiencesTable.userId, userId))).returning();
    return item ?? null;
  },
  delete: async (userId, id) => {
    const res = await db.delete(experiencesTable).where(and(eq(experiencesTable.id, id), eq(experiencesTable.userId, userId))).returning();
    return res.length > 0;
  },
  reorder: async (userId, id, position) => {
    await db.update(experiencesTable).set({ position, updatedAt: new Date() }).where(and(eq(experiencesTable.id, id), eq(experiencesTable.userId, userId)));
  },
};

const projectsOps: SectionOperations = {
  find: (userId) => db.select().from(projectsTable).where(eq(projectsTable.userId, userId)).orderBy(asc(projectsTable.position)),
  findById: async (userId, id) => {
    const [item] = await db.select().from(projectsTable).where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId))).limit(1);
    return item ?? null;
  },
  getMaxPos: async (userId) => {
    const [res] = await db.select({ val: max(projectsTable.position) }).from(projectsTable).where(eq(projectsTable.userId, userId));
    return res?.val ?? null;
  },
  create: async (userId, input, position) => {
    const [item] = await db.insert(projectsTable).values({ ...(input as ProjectInput), userId, position }).returning();
    if (!item) throw new Error('Failed to create project item');
    return item;
  },
  update: async (userId, id, input) => {
    const [item] = await db.update(projectsTable).set({ ...(input as Partial<ProjectInput>), updatedAt: new Date() }).where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId))).returning();
    return item ?? null;
  },
  delete: async (userId, id) => {
    const res = await db.delete(projectsTable).where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId))).returning();
    return res.length > 0;
  },
  reorder: async (userId, id, position) => {
    await db.update(projectsTable).set({ position, updatedAt: new Date() }).where(and(eq(projectsTable.id, id), eq(projectsTable.userId, userId)));
  },
};

const skillsOps: SectionOperations = {
  find: (userId) => db.select().from(skillsTable).where(eq(skillsTable.userId, userId)).orderBy(asc(skillsTable.position)),
  findById: async (userId, id) => {
    const [item] = await db.select().from(skillsTable).where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId))).limit(1);
    return item ?? null;
  },
  getMaxPos: async (userId) => {
    const [res] = await db.select({ val: max(skillsTable.position) }).from(skillsTable).where(eq(skillsTable.userId, userId));
    return res?.val ?? null;
  },
  create: async (userId, input, position) => {
    const [item] = await db.insert(skillsTable).values({ ...(input as SkillInput), userId, position }).returning();
    if (!item) throw new Error('Failed to create skill item');
    return item;
  },
  update: async (userId, id, input) => {
    const [item] = await db.update(skillsTable).set({ ...(input as Partial<SkillInput>), updatedAt: new Date() }).where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId))).returning();
    return item ?? null;
  },
  delete: async (userId, id) => {
    const res = await db.delete(skillsTable).where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId))).returning();
    return res.length > 0;
  },
  reorder: async (userId, id, position) => {
    await db.update(skillsTable).set({ position, updatedAt: new Date() }).where(and(eq(skillsTable.id, id), eq(skillsTable.userId, userId)));
  },
};

const languagesOps: SectionOperations = {
  find: (userId) => db.select().from(languagesTable).where(eq(languagesTable.userId, userId)).orderBy(asc(languagesTable.position)),
  findById: async (userId, id) => {
    const [item] = await db.select().from(languagesTable).where(and(eq(languagesTable.id, id), eq(languagesTable.userId, userId))).limit(1);
    return item ?? null;
  },
  getMaxPos: async (userId) => {
    const [res] = await db.select({ val: max(languagesTable.position) }).from(languagesTable).where(eq(languagesTable.userId, userId));
    return res?.val ?? null;
  },
  create: async (userId, input, position) => {
    const [item] = await db.insert(languagesTable).values({ ...(input as LanguageInput), userId, position }).returning();
    if (!item) throw new Error('Failed to create language item');
    return item;
  },
  update: async (userId, id, input) => {
    const [item] = await db.update(languagesTable).set({ ...(input as Partial<LanguageInput>), updatedAt: new Date() }).where(and(eq(languagesTable.id, id), eq(languagesTable.userId, userId))).returning();
    return item ?? null;
  },
  delete: async (userId, id) => {
    const res = await db.delete(languagesTable).where(and(eq(languagesTable.id, id), eq(languagesTable.userId, userId))).returning();
    return res.length > 0;
  },
  reorder: async (userId, id, position) => {
    await db.update(languagesTable).set({ position, updatedAt: new Date() }).where(and(eq(languagesTable.id, id), eq(languagesTable.userId, userId)));
  },
};

const sectionRegistry: Record<SectionName, SectionOperations> = {
  education: educationOps,
  experiences: experiencesOps,
  projects: projectsOps,
  skills: skillsOps,
  languages: languagesOps,
};

export async function findSectionItems(
  section: SectionName,
  userId: string
): Promise<readonly AnySectionItem[]> {
  return sectionRegistry[section].find(userId);
}

export async function findSectionItemById(
  section: SectionName,
  userId: string,
  id: string
): Promise<AnySectionItem | null> {
  return sectionRegistry[section].findById(userId, id);
}

export async function getNextPosition(
  section: SectionName,
  userId: string
): Promise<number> {
  const maxPos = await sectionRegistry[section].getMaxPos(userId);
  return (maxPos ?? -1) + 1;
}

export async function createSectionItem(
  section: SectionName,
  userId: string,
  input: unknown,
  position: number
): Promise<AnySectionItem> {
  return sectionRegistry[section].create(userId, input, position);
}

export async function updateSectionItem(
  section: SectionName,
  userId: string,
  id: string,
  input: unknown
): Promise<AnySectionItem | null> {
  return sectionRegistry[section].update(userId, id, input);
}

export async function deleteSectionItem(
  section: SectionName,
  userId: string,
  id: string
): Promise<boolean> {
  return sectionRegistry[section].delete(userId, id);
}

export async function reorderSectionItems(
  section: SectionName,
  userId: string,
  itemIds: readonly string[]
): Promise<void> {
  const ops = sectionRegistry[section];
  await db.transaction(async () => {
    for (let index = 0; index < itemIds.length; index += 1) {
      const itemId = itemIds[index];
      if (itemId) {
        await ops.reorder(userId, itemId, index);
      }
    }
  });
}
