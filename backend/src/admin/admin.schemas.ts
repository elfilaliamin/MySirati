import { z } from 'zod';

export const userListQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().trim().optional(),
  status: z.enum(['active', 'suspended']).optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export const updateUserStatusSchema = z.object({
  status: z.enum(['active', 'suspended']),
  reason: z.string().trim().min(3).max(500),
});

export const deleteUserSchema = z.object({
  confirmEmail: z.string().trim().email(),
});

export const auditLogQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
  action: z.string().trim().optional(),
  adminId: z.string().uuid().optional(),
  targetUserId: z.string().uuid().optional(),
});

export type UserListQuery = z.infer<typeof userListQuerySchema>;
export type UpdateUserStatusPayload = z.infer<typeof updateUserStatusSchema>;
export type DeleteUserPayload = z.infer<typeof deleteUserSchema>;
export type AuditLogQuery = z.infer<typeof auditLogQuerySchema>;
