import { z } from 'zod';

import {
  resourceLinkSchema,
  updateProfileSchema,
} from '../profile/profile.schema.js';
import { EDUCATION_TYPES } from '../sections/sections.schema.js';

export const deleteAccountSchema = z.object({
  password: z.string().min(1, 'Password is required to confirm account deletion'),
});

const flexibleDate = z.preprocess((val) => {
  if (val === '' || val === undefined || val === null) return null;
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return null;
    if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) return trimmed;
    if (/^\d{4}-\d{2}$/.test(trimmed)) return `${trimmed}-01`;
    if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01-01`;
  }
  return val;
}, z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional());

export const importEducationItemSchema = z.object({
  type: z.enum(EDUCATION_TYPES).default('academic'),
  institution: z.string().trim().min(1, 'Institution is required').max(200),
  degree: z.string().trim().max(150).nullable().optional(),
  fieldOfStudy: z.string().trim().max(150).nullable().optional(),
  startDate: flexibleDate,
  endDate: flexibleDate,
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(5000).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const importExperienceItemSchema = z.object({
  company: z.string().trim().min(1, 'Company is required').max(200),
  title: z.string().trim().min(1, 'Title is required').max(150),
  location: z.string().trim().max(150).nullable().optional(),
  startDate: flexibleDate,
  endDate: flexibleDate,
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(5000).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const importProjectItemSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required').max(200),
  role: z.string().trim().max(150).nullable().optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  startDate: flexibleDate,
  endDate: flexibleDate,
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const importSkillItemSchema = z.object({
  name: z.string().trim().min(1, 'Skill name is required').max(100),
  level: z.string().trim().max(50).nullable().optional(),
  category: z.string().trim().max(100).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const importLanguageItemSchema = z.object({
  name: z.string().trim().min(1, 'Language is required').max(100),
  proficiency: z.string().trim().min(1, 'Proficiency is required').max(100),
});

export const importAccountSchema = z.object({
  mode: z.enum(['merge', 'replace']).default('merge'),
  profile: updateProfileSchema.optional().nullable(),
  education: z.array(importEducationItemSchema).optional().default([]),
  experiences: z.array(importExperienceItemSchema).optional().default([]),
  projects: z.array(importProjectItemSchema).optional().default([]),
  skills: z.array(importSkillItemSchema).optional().default([]),
  languages: z.array(importLanguageItemSchema).optional().default([]),
});

export type DeleteAccountInput = z.infer<typeof deleteAccountSchema>;
export type ImportAccountInput = z.infer<typeof importAccountSchema>;

