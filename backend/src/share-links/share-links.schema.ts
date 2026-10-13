import { z } from 'zod';

export const shareLinkIncludeSchema = z.object({
  basics: z.boolean().default(true),
  email: z.boolean().default(false),
  phone: z.boolean().default(false),
  itemLinks: z.boolean().default(true),
  education: z.boolean().default(true),
  educationItemIds: z.array(z.string().uuid()).nullable().optional(),
  experiences: z.boolean().default(true),
  experienceItemIds: z.array(z.string().uuid()).nullable().optional(),
  projects: z.boolean().default(true),
  projectItemIds: z.array(z.string().uuid()).nullable().optional(),
  skills: z.boolean().default(true),
  skillItemIds: z.array(z.string().uuid()).nullable().optional(),
  languages: z.boolean().default(true),
  languageItemIds: z.array(z.string().uuid()).nullable().optional(),
});

export const createShareLinkSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60),
  include: shareLinkIncludeSchema,
  expiresAt: z.string().datetime().nullable().optional(),
});

export const updateShareLinkSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(60).optional(),
  include: shareLinkIncludeSchema.optional(),
  expiresAt: z.string().datetime().nullable().optional(),
});

export const previewShareLinkSchema = z.object({
  include: shareLinkIncludeSchema,
});

export const publicQuerySchema = z.object({
  key: z.string().trim().min(10).optional(),
});

export type ShareLinkIncludeInput = z.infer<typeof shareLinkIncludeSchema>;
export type CreateShareLinkInput = z.infer<typeof createShareLinkSchema>;
export type UpdateShareLinkInput = z.infer<typeof updateShareLinkSchema>;
