import type { Profile } from '../sections/sections.types';

interface Counts {
  edu: number;
  exp: number;
  proj: number;
  skill: number;
  lang: number;
}

interface Rule {
  label: string;
  weight: number;
  to: string;
  check: (profile?: Profile, counts?: Counts) => boolean;
}

const RULES: Rule[] = [
  {
    label: 'Profile headline & bio',
    weight: 30,
    to: '/profile',
    check: (p) => Boolean(p?.fullName && p?.headline),
  },
  {
    label: 'Work experiences',
    weight: 20,
    to: '/experiences',
    check: (_, c) => (c?.exp ?? 0) > 0,
  },
  {
    label: 'Education credentials',
    weight: 15,
    to: '/education',
    check: (_, c) => (c?.edu ?? 0) > 0,
  },
  {
    label: 'Featured projects',
    weight: 15,
    to: '/projects',
    check: (_, c) => (c?.proj ?? 0) > 0,
  },
  {
    label: 'Key technical skills',
    weight: 10,
    to: '/skills',
    check: (_, c) => (c?.skill ?? 0) > 0,
  },
  {
    label: 'Languages spoken',
    weight: 10,
    to: '/languages',
    check: (_, c) => (c?.lang ?? 0) > 0,
  },
];

export const computeCompleteness = (profile?: Profile, counts?: Counts) => {
  let score = 0;
  const checklist = RULES.map((rule) => {
    const isComplete = rule.check(profile, counts);
    if (isComplete) score += rule.weight;
    return { label: rule.label, isComplete, to: rule.to };
  });

  return { score, checklist };
};
