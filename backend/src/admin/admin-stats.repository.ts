import { and, count, eq, gt, isNull, or } from 'drizzle-orm';

import type { AdminStats } from './admin.types.js';
import { db } from '../db/connection.js';
import { adminAuditLogTable, shareLinksTable, usersTable } from '../db/schema.js';

export async function fetchAdminStats(): Promise<AdminStats> {
  const [userTotals] = await db
    .select({
      total: count(usersTable.id),
    })
    .from(usersTable);

  const [activeUsers] = await db
    .select({ total: count(usersTable.id) })
    .from(usersTable)
    .where(eq(usersTable.status, 'active'));

  const [suspendedUsers] = await db
    .select({ total: count(usersTable.id) })
    .from(usersTable)
    .where(eq(usersTable.status, 'suspended'));

  const [totalLinks] = await db
    .select({ total: count(shareLinksTable.id) })
    .from(shareLinksTable);

  const now = new Date();
  const [activeLinks] = await db
    .select({ total: count(shareLinksTable.id) })
    .from(shareLinksTable)
    .where(
      and(
        isNull(shareLinksTable.revokedAt),
        or(isNull(shareLinksTable.expiresAt), gt(shareLinksTable.expiresAt, now))
      )
    );

  const [auditTotal] = await db
    .select({ total: count(adminAuditLogTable.id) })
    .from(adminAuditLogTable);

  return {
    totalUsers: Number(userTotals?.total ?? 0),
    activeUsers: Number(activeUsers?.total ?? 0),
    suspendedUsers: Number(suspendedUsers?.total ?? 0),
    totalShareLinks: Number(totalLinks?.total ?? 0),
    activeShareLinks: Number(activeLinks?.total ?? 0),
    totalAuditLogs: Number(auditTotal?.total ?? 0),
  };
}
