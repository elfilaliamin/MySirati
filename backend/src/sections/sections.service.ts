import type { AnySectionItem } from './sections.repository.js';
import {
  createSectionItem,
  deleteSectionItem,
  findSectionItemById,
  findSectionItems,
  getNextPosition,
  reorderSectionItems,
  updateSectionItem,
} from './sections.repository.js';
import type { SectionName } from './sections.schema.js';
import {
  educationInputSchema,
  experienceInputSchema,
  languageInputSchema,
  projectInputSchema,
  skillInputSchema,
} from './sections.schema.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { AppError } from '../utils/app-error.js';

export function parseSectionInput(
  section: SectionName,
  input: unknown
): unknown {
  switch (section) {
    case 'education':
      return educationInputSchema.parse(input);
    case 'experiences':
      return experienceInputSchema.parse(input);
    case 'projects':
      return projectInputSchema.parse(input);
    case 'skills':
      return skillInputSchema.parse(input);
    case 'languages':
      return languageInputSchema.parse(input);
  }
}

export async function listItems(
  section: SectionName,
  userId: string
): Promise<readonly AnySectionItem[]> {
  return findSectionItems(section, userId);
}

export async function getItem(
  section: SectionName,
  userId: string,
  id: string
): Promise<AnySectionItem> {
  const item = await findSectionItemById(section, userId, id);
  if (!item) {
    throw new AppError('Item not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }
  return item;
}

export async function addItem(
  section: SectionName,
  userId: string,
  input: unknown
): Promise<AnySectionItem> {
  const validated = parseSectionInput(section, input);
  const position = await getNextPosition(section, userId);
  return createSectionItem(section, userId, validated, position);
}

export async function editItem(
  section: SectionName,
  userId: string,
  id: string,
  input: unknown
): Promise<AnySectionItem> {
  const validated = parseSectionInput(section, input);
  const updated = await updateSectionItem(section, userId, id, validated);
  if (!updated) {
    throw new AppError('Item not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }
  return updated;
}

export async function removeItem(
  section: SectionName,
  userId: string,
  id: string
): Promise<void> {
  const deleted = await deleteSectionItem(section, userId, id);
  if (!deleted) {
    throw new AppError('Item not found', HTTP_STATUS.NOT_FOUND, 'NOT_FOUND');
  }
}

export async function reorderItems(
  section: SectionName,
  userId: string,
  itemIds: readonly string[]
): Promise<void> {
  await reorderSectionItems(section, userId, itemIds);
}
