import type { SkillItem } from '../sections.types';

export type SkillSortOption = 'default' | 'name-asc' | 'name-desc' | 'level-desc' | 'level-asc';

export const LEVEL_WEIGHTS: Record<string, number> = {
  expert: 4,
  advanced: 3,
  intermediate: 2,
  beginner: 1,
};

export const getLevelWeight = (level?: string | null): number => {
  if (!level) return 0;
  return LEVEL_WEIGHTS[level.trim().toLowerCase()] ?? 0;
};

export const getDistinctCategories = (items: SkillItem[]): string[] => {
  const set = new Set<string>();
  items.forEach((item) => {
    const cat = item.category?.trim();
    if (cat) set.add(cat);
  });
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

const matchesSearch = (item: SkillItem, query: string): boolean => {
  if (!query) return true;
  const q = query.toLowerCase();
  const nameMatch = item.name.toLowerCase().includes(q);
  const categoryMatch = Boolean(item.category?.toLowerCase().includes(q));
  return nameMatch || categoryMatch;
};

const matchesCategory = (item: SkillItem, category: string): boolean => {
  if (!category) return true;
  return item.category?.trim().toLowerCase() === category.trim().toLowerCase();
};

const matchesLevel = (item: SkillItem, level: string): boolean => {
  if (!level) return true;
  return item.level?.trim().toLowerCase() === level.trim().toLowerCase();
};

const sortSkills = (skills: SkillItem[], sortBy: SkillSortOption): SkillItem[] => {
  const copy = [...skills];
  switch (sortBy) {
    case 'name-asc':
      return copy.sort((a, b) => a.name.localeCompare(b.name));
    case 'name-desc':
      return copy.sort((a, b) => b.name.localeCompare(a.name));
    case 'level-desc':
      return copy.sort((a, b) => getLevelWeight(b.level) - getLevelWeight(a.level));
    case 'level-asc':
      return copy.sort((a, b) => getLevelWeight(a.level) - getLevelWeight(b.level));
    case 'default':
    default:
      return copy;
  }
};

export const filterAndSortSkills = (
  items: SkillItem[],
  query: string,
  category: string,
  level: string,
  sortBy: SkillSortOption
): SkillItem[] => {
  const trimmedQuery = query.trim();
  const filtered = items.filter(
    (item) =>
      matchesSearch(item, trimmedQuery) &&
      matchesCategory(item, category) &&
      matchesLevel(item, level)
  );
  return sortSkills(filtered, sortBy);
};
