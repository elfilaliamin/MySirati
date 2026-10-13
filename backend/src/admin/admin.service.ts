import { fetchPaginatedAuditLogs, insertAuditLogEntry } from './admin-audit.repository.js';
import { fetchAdminStats } from './admin-stats.repository.js';
import {
  fetchPaginatedUsers,
  fetchUserDetail,
  mutateUserStatus,
  removeUser,
  revokeUserShareLinks,
} from './admin-users.repository.js';
import type {
  AuditLogQuery,
  DeleteUserPayload,
  UpdateUserStatusPayload,
  UserListQuery,
} from './admin.schemas.js';
import type {
  AdminAuditLogEntry,
  AdminStats,
  AdminUserDetail,
  AdminUserSummary,
  PaginatedResult,
} from './admin.types.js';
import { HTTP_STATUS } from '../constants/http.constants.js';
import { AppError } from '../utils/app-error.js';

export async function getAdminStats(): Promise<AdminStats> {
  return fetchAdminStats();
}

export async function getAdminUsers(
  query: UserListQuery
): Promise<PaginatedResult<AdminUserSummary>> {
  return fetchPaginatedUsers(query);
}

export async function getAdminUserDetail(
  adminId: string,
  targetUserId: string,
  ip: string
): Promise<AdminUserDetail> {
  const detail = await fetchUserDetail(targetUserId);
  if (!detail) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'USER_NOT_FOUND');
  }

  await insertAuditLogEntry({
    adminId,
    action: 'VIEW_USER',
    targetUserId,
    targetType: 'user',
    targetId: targetUserId,
    metadata: { targetEmail: detail.user.email },
    ip,
  });

  return detail;
}

export async function changeUserStatus(
  adminId: string,
  targetUserId: string,
  payload: UpdateUserStatusPayload,
  ip: string
): Promise<void> {
  if (adminId === targetUserId && payload.status === 'suspended') {
    throw new AppError('Cannot suspend your own account', HTTP_STATUS.BAD_REQUEST, 'INVALID_ACTION');
  }

  const detail = await fetchUserDetail(targetUserId);
  if (!detail) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'USER_NOT_FOUND');
  }

  await mutateUserStatus(targetUserId, payload.status);

  const action = payload.status === 'suspended' ? 'SUSPEND_USER' : 'REACTIVATE_USER';
  await insertAuditLogEntry({
    adminId,
    action,
    targetUserId,
    targetType: 'user',
    targetId: targetUserId,
    metadata: { reason: payload.reason, previousStatus: detail.user.status },
    ip,
  });
}

export async function revokeAllUserLinks(
  adminId: string,
  targetUserId: string,
  ip: string
): Promise<{ revokedCount: number }> {
  const detail = await fetchUserDetail(targetUserId);
  if (!detail) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'USER_NOT_FOUND');
  }

  const revokedCount = await revokeUserShareLinks(targetUserId);

  await insertAuditLogEntry({
    adminId,
    action: 'REVOKE_ALL_LINKS',
    targetUserId,
    targetType: 'share_link',
    targetId: targetUserId,
    metadata: { revokedCount },
    ip,
  });

  return { revokedCount };
}

export async function purgeUser(
  adminId: string,
  targetUserId: string,
  payload: DeleteUserPayload,
  ip: string
): Promise<void> {
  if (adminId === targetUserId) {
    throw new AppError('Cannot delete your own account', HTTP_STATUS.BAD_REQUEST, 'INVALID_ACTION');
  }

  const detail = await fetchUserDetail(targetUserId);
  if (!detail) {
    throw new AppError('User not found', HTTP_STATUS.NOT_FOUND, 'USER_NOT_FOUND');
  }

  if (payload.confirmEmail.toLowerCase() !== detail.user.email.toLowerCase()) {
    throw new AppError('Confirmation email does not match', HTTP_STATUS.BAD_REQUEST, 'EMAIL_MISMATCH');
  }

  await insertAuditLogEntry({
    adminId,
    action: 'DELETE_USER',
    targetUserId: null,
    targetType: 'user',
    targetId: targetUserId,
    metadata: { deletedEmail: detail.user.email },
    ip,
  });

  await removeUser(targetUserId);
}

export async function getAdminAuditLogs(
  query: AuditLogQuery
): Promise<PaginatedResult<AdminAuditLogEntry>> {
  return fetchPaginatedAuditLogs(query);
}
