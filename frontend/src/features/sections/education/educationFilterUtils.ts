import type { EducationItem } from '../sections.types';

export type EducationSortOption =
  | 'default'
  | 'date-desc'
  | 'date-asc'
  | 'institution-asc'
  | 'institution-desc'
  | 'degree-asc';

const parseYearOrDate = (str?: string | null): number => {
  if (!str) return 0;
  const trimmed = str.trim();
  const parsed = Date.parse(trimmed);
  if (!isNaN(parsed)) return parsed;
  const yearMatch = trimmed.match(/\b(19|20)\d{2}\b/);
  if (yearMatch) return new Date(Number(yearMatch[0]), 0, 1).getTime();
  return 0;
};

const getSortDateScore = (item: EducationItem): number => {
  if (item.isCurrent) return Number.MAX_SAFE_INTEGER;
  const endScore = parseYearOrDate(item.endDate);
  if (endScore > 0) return endScore;
  return parseYearOrDate(item.startDate);
};

const matchesSearch = (item: EducationItem, query: string): boolean => {
  if (!query) return true;
  const q = query.toLowerCase();
  const institutionMatch = item.institution.toLowerCase().includes(q);
  const degreeMatch = Boolean(item.degree?.toLowerCase().includes(q));
  const fieldMatch = Boolean(item.fieldOfStudy?.toLowerCase().includes(q));
  const descMatch = Boolean(item.description?.toLowerCase().includes(q));
  return institutionMatch || degreeMatch || fieldMatch || descMatch;
};

const matchesType = (item: EducationItem, type: string): boolean => {
  if (!type) return true;
  const itemType = item.type || 'academic';
  return itemType === type;
};

const matchesStatus = (item: EducationItem, status: string): boolean => {
  if (!status) return true;
  if (status === 'active') return item.isCurrent;
  if (status === 'completed') return !item.isCurrent;
  return true;
};

const sortEducation = (
  items: EducationItem[],
  sortBy: EducationSortOption
): EducationItem[] => {
  const copy = [...items];
  switch (sortBy) {
    case 'date-desc':
      return copy.sort((a, b) => getSortDateScore(b) - getSortDateScore(a));
    case 'date-asc':
      return copy.sort((a, b) => getSortDateScore(a) - getSortDateScore(b));
    case 'institution-asc':
      return copy.sort((a, b) => a.institution.localeCompare(b.institution));
    case 'institution-desc':
      return copy.sort((a, b) => b.institution.localeCompare(a.institution));
    case 'degree-asc':
      return copy.sort((a, b) => (a.degree || '').localeCompare(b.degree || ''));
    case 'default':
    default:
      return copy;
  }
};

export const filterAndSortEducation = (
  items: EducationItem[],
  query: string,
  type: string,
  status: string,
  sortBy: EducationSortOption
): EducationItem[] => {
  const trimmedQuery = query.trim();
  const filtered = items.filter(
    (item) =>
      matchesSearch(item, trimmedQuery) &&
      matchesType(item, type) &&
      matchesStatus(item, status)
  );
  return sortEducation(filtered, sortBy);
};
