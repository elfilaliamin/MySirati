import { z } from 'zod';

import { resourceLinkSchema } from '../profile/profile.schema.js';

export const SECTION_NAMES = [
  'education',
  'experiences',
  'projects',
  'skills',
  'languages',
] as const;

export type SectionName = (typeof SECTION_NAMES)[number];

export const sectionParamSchema = z.enum(SECTION_NAMES);

export const educationInputSchema = z.object({
  institution: z.string().trim().min(1, 'Institution is required').max(200),
  degree: z.string().trim().max(150).nullable().optional(),
  fieldOfStudy: z.string().trim().max(150).nullable().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(5000).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const experienceInputSchema = z.object({
  company: z.string().trim().min(1, 'Company is required').max(200),
  title: z.string().trim().min(1, 'Title is required').max(150),
  location: z.string().trim().max(150).nullable().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  isCurrent: z.boolean().default(false),
  description: z.string().trim().max(5000).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const projectInputSchema = z.object({
  name: z.string().trim().min(1, 'Project name is required').max(200),
  role: z.string().trim().max(150).nullable().optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Date format must be YYYY-MM-DD').nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const skillInputSchema = z.object({
  name: z.string().trim().min(1, 'Skill name is required').max(100),
  level: z.string().trim().max(50).nullable().optional(),
  category: z.string().trim().max(100).nullable().optional(),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export const languageInputSchema = z.object({
  name: z.string().trim().min(1, 'Language is required').max(100),
  proficiency: z.string().trim().min(1, 'Proficiency is required').max(100),
});

export const reorderInputSchema = z.object({
  itemIds: z.array(z.string().uuid()).min(1, 'At least one item ID is required'),
});

export type EducationInput = z.infer<typeof educationInputSchema>;
export type ExperienceInput = z.infer<typeof experienceInputSchema>;
export type ProjectInput = z.infer<typeof projectInputSchema>;
export type SkillInput = z.infer<typeof skillInputSchema>;
export type LanguageInput = z.infer<typeof languageInputSchema>;
export type ReorderInput = z.infer<typeof reorderInputSchema>;
