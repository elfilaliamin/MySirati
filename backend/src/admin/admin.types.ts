import type { AdminAuditLog, Profile, ShareLink, User } from '../db/schema.js';

export interface AdminStats {
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly suspendedUsers: number;
  readonly totalShareLinks: number;
  readonly activeShareLinks: number;
  readonly totalAuditLogs: number;
}

export type AdminUserSummary = Pick<
  User,
  'id' | 'email' | 'role' | 'status' | 'emailVerified' | 'createdAt' | 'updatedAt'
>;

export interface AdminUserCounts {
  readonly education: number;
  readonly experiences: number;
  readonly projects: number;
  readonly skills: number;
  readonly languages: number;
  readonly shareLinks: number;
}

export interface AdminUserDetail {
  readonly user: AdminUserSummary;
  readonly profile: Profile | null;
  readonly counts: AdminUserCounts;
  readonly shareLinks: readonly ShareLink[];
  readonly recentAuditLogs: readonly AdminAuditLog[];
}

export interface AdminAuditLogEntry extends AdminAuditLog {
  readonly adminEmail?: string | null;
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
