import { and, count, desc, eq, ilike, isNull } from 'drizzle-orm';

import type { UserListQuery } from './admin.schemas.js';
import type {
  AdminUserCounts,
  AdminUserDetail,
  AdminUserSummary,
  PaginatedResult,
} from './admin.types.js';
import { db } from '../db/connection.js';
import {
  adminAuditLogTable,
  educationTable,
  experiencesTable,
  languagesTable,
  profilesTable,
  projectsTable,
  shareLinksTable,
  skillsTable,
  usersTable,
} from '../db/schema.js';

function buildUserFilters(query: UserListQuery) {
  const conditions = [];
  if (query.search) {
    conditions.push(ilike(usersTable.email, `%${query.search}%`));
  }
  if (query.status) {
    conditions.push(eq(usersTable.status, query.status));
  }
  if (query.role) {
    conditions.push(eq(usersTable.role, query.role));
  }
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function fetchPaginatedUsers(
  query: UserListQuery
): Promise<PaginatedResult<AdminUserSummary>> {
  const filter = buildUserFilters(query);
  const [totalRes] = await db
    .select({ total: count(usersTable.id) })
    .from(usersTable)
    .where(filter);

  const total = Number(totalRes?.total ?? 0);
  const offset = (query.page - 1) * query.limit;

  const items = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      role: usersTable.role,
      status: usersTable.status,
      emailVerified: usersTable.emailVerified,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(filter)
    .orderBy(desc(usersTable.createdAt))
    .limit(query.limit)
    .offset(offset);

  return {
    items,
    total,
    page: query.page,
    limit: query.limit,
    totalPages: Math.ceil(total / query.limit) || 1,
  };
}

async function fetchUserCounts(userId: string): Promise<AdminUserCounts> {
  const [edu] = await db.select({ c: count(educationTable.id) }).from(educationTable).where(eq(educationTable.userId, userId));
  const [exp] = await db.select({ c: count(experiencesTable.id) }).from(experiencesTable).where(eq(experiencesTable.userId, userId));
  const [proj] = await db.select({ c: count(projectsTable.id) }).from(projectsTable).where(eq(projectsTable.userId, userId));
  const [skill] = await db.select({ c: count(skillsTable.id) }).from(skillsTable).where(eq(skillsTable.userId, userId));
  const [lang] = await db.select({ c: count(languagesTable.id) }).from(languagesTable).where(eq(languagesTable.userId, userId));
  const [links] = await db.select({ c: count(shareLinksTable.id) }).from(shareLinksTable).where(eq(shareLinksTable.userId, userId));

  return {
    education: Number(edu?.c ?? 0),
    experiences: Number(exp?.c ?? 0),
    projects: Number(proj?.c ?? 0),
    skills: Number(skill?.c ?? 0),
    languages: Number(lang?.c ?? 0),
    shareLinks: Number(links?.c ?? 0),
  };
}

export async function fetchUserDetail(userId: string): Promise<AdminUserDetail | null> {
  const [user] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      role: usersTable.role,
      status: usersTable.status,
      emailVerified: usersTable.emailVerified,
      createdAt: usersTable.createdAt,
      updatedAt: usersTable.updatedAt,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId));

  if (!user) return null;

  const [profile] = await db.select().from(profilesTable).where(eq(profilesTable.userId, userId));
  const counts = await fetchUserCounts(userId);
  const shareLinks = await db
    .select()
    .from(shareLinksTable)
    .where(eq(shareLinksTable.userId, userId))
    .orderBy(desc(shareLinksTable.createdAt));
  const recentAuditLogs = await db
    .select()
    .from(adminAuditLogTable)
    .where(eq(adminAuditLogTable.targetUserId, userId))
    .orderBy(desc(adminAuditLogTable.createdAt))
    .limit(10);

  return { user, profile: profile ?? null, counts, shareLinks, recentAuditLogs };
}

export async function mutateUserStatus(
  userId: string,
  status: 'active' | 'suspended'
): Promise<void> {
  await db
    .update(usersTable)
    .set({ status, updatedAt: new Date() })
    .where(eq(usersTable.id, userId));
}

export async function revokeUserShareLinks(userId: string): Promise<number> {
  const res = await db
    .update(shareLinksTable)
    .set({ revokedAt: new Date() })
    .where(and(eq(shareLinksTable.userId, userId), isNull(shareLinksTable.revokedAt)));

  return (res as unknown as { rowCount?: number })?.rowCount ?? 0;
}

export async function removeUser(userId: string): Promise<void> {
  await db.delete(usersTable).where(eq(usersTable.id, userId));
}
