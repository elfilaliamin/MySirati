export interface AdminStats {
  readonly totalUsers: number;
  readonly activeUsers: number;
  readonly suspendedUsers: number;
  readonly totalShareLinks: number;
  readonly activeShareLinks: number;
  readonly totalAuditLogs: number;
}

export interface AdminUserSummary {
  readonly id: string;
  readonly email: string;
  readonly role: 'user' | 'admin';
  readonly status: 'active' | 'suspended';
  readonly emailVerified: boolean;
  readonly createdAt: string;
  readonly updatedAt: string;
}

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
  readonly profile: {
    readonly fullName?: string;
    readonly headline?: string;
    readonly summary?: string;
    readonly location?: string;
    readonly phone?: string;
    readonly links?: Array<{ label: string; url: string }>;
  } | null;
  readonly counts: AdminUserCounts;
  readonly shareLinks: Array<{
    readonly id: string;
    readonly name: string;
    readonly keyPrefix: string;
    readonly expiresAt: string | null;
    readonly revokedAt: string | null;
    readonly lastUsedAt: string | null;
    readonly createdAt: string;
  }>;
  readonly recentAuditLogs: Array<{
    readonly id: string;
    readonly action: string;
    readonly createdAt: string;
    readonly ip: string;
    readonly metadata: Record<string, unknown>;
  }>;
}

export interface AdminAuditLogEntry {
  readonly id: string;
  readonly adminId: string;
  readonly adminEmail?: string | null;
  readonly action: string;
  readonly targetUserId: string | null;
  readonly targetType: string;
  readonly targetId: string | null;
  readonly metadata: Record<string, unknown>;
  readonly ip: string;
  readonly createdAt: string;
}

export interface PaginatedResult<T> {
  readonly items: readonly T[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}
