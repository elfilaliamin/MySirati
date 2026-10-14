export interface ParsedCareerData {
  profile?: { fullName?: string } | null;
  education?: unknown[];
  experiences?: unknown[];
  projects?: unknown[];
  skills?: unknown[];
  languages?: unknown[];
}

const countItems = (arr: unknown): number => (Array.isArray(arr) ? arr.length : 0);

const parseArray = (val: unknown): unknown[] => (Array.isArray(val) ? val : []);

export const extractCareerData = (
  parsed: Record<string, unknown>
): { data: ParsedCareerData; totalCount: number } => {
  const profile =
    typeof parsed.profile === 'object' && parsed.profile !== null
      ? (parsed.profile as { fullName?: string })
      : null;

  const data: ParsedCareerData = {
    profile,
    education: parseArray(parsed.education),
    experiences: parseArray(parsed.experiences),
    projects: parseArray(parsed.projects),
    skills: parseArray(parsed.skills),
    languages: parseArray(parsed.languages),
  };

  const sections = [
    data.education,
    data.experiences,
    data.projects,
    data.skills,
    data.languages,
  ];

  const totalCount =
    (profile ? 1 : 0) +
    sections.reduce<number>((sum, sec) => sum + countItems(sec), 0);

  return { data, totalCount };
};
