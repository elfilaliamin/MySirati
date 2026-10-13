import { and, count, desc, eq } from 'drizzle-orm';

import type { AuditLogQuery } from './admin.schemas.js';
import type { AdminAuditLogEntry, PaginatedResult } from './admin.types.js';
import { db } from '../db/connection.js';
import type { NewAdminAuditLog } from '../db/schema.js';
import { adminAuditLogTable, usersTable } from '../db/schema.js';

export async function insertAuditLogEntry(entry: NewAdminAuditLog): Promise<void> {
  await db.insert(adminAuditLogTable).values(entry);
}

function buildAuditFilters(query: AuditLogQuery) {
  const conditions = [];
  if (query.action) {
    conditions.push(eq(adminAuditLogTable.action, query.action));
  }
  if (query.adminId) {
    conditions.push(eq(adminAuditLogTable.adminId, query.adminId));
  }
  if (query.targetUserId) {
    conditions.push(eq(adminAuditLogTable.targetUserId, query.targetUserId));
  }
  return conditions.length > 0 ? and(...conditions) : undefined;
}

export async function fetchPaginatedAuditLogs(
  query: AuditLogQuery
): Promise<PaginatedResult<AdminAuditLogEntry>> {
  const filter = buildAuditFilters(query);
  const [totalRes] = await db
    .select({ total: count(adminAuditLogTable.id) })
    .from(adminAuditLogTable)
    .where(filter);

  const total = Number(totalRes?.total ?? 0);
  const offset = (query.page - 1) * query.limit;

  const rows = await db
    .select({
      id: adminAuditLogTable.id,
      adminId: adminAuditLogTable.adminId,
      action: adminAuditLogTable.action,
      targetUserId: adminAuditLogTable.targetUserId,
      targetType: adminAuditLogTable.targetType,
      targetId: adminAuditLogTable.targetId,
      metadata: adminAuditLogTable.metadata,
      ip: adminAuditLogTable.ip,
      createdAt: adminAuditLogTable.createdAt,
      adminEmail: usersTable.email,
    })
    .from(adminAuditLogTable)
    .leftJoin(usersTable, eq(adminAuditLogTable.adminId, usersTable.id))
    .where(filter)
    .orderBy(desc(adminAuditLogTable.createdAt))
    .limit(query.limit)
    .offset(offset);

  return {
    items: rows,
    total,
    page: query.page,
    limit: query.limit,
    totalPages: Math.ceil(total / query.limit) || 1,
  };
}
