import { z } from 'zod';

export const resourceLinkSchema = z.object({
  label: z.string().trim().min(1, 'Label is required').max(100),
  url: z.string().trim().url('Must be a valid URL').max(500),
});

export const updateProfileSchema = z.object({
  fullName: z.string().trim().min(1, 'Full name is required').max(150),
  headline: z.string().trim().max(200).nullable().optional(),
  summary: z.string().trim().max(5000).nullable().optional(),
  location: z.string().trim().max(150).nullable().optional(),
  phone: z.string().trim().max(50).nullable().optional(),
  websiteUrl: z
    .string()
    .trim()
    .url('Must be a valid URL')
    .max(255)
    .nullable()
    .optional()
    .or(z.literal('')),
  links: z.array(resourceLinkSchema).max(20).default([]),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
