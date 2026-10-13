import type { Request, Response } from 'express';

import {
  auditLogQuerySchema,
  deleteUserSchema,
  updateUserStatusSchema,
  userListQuerySchema,
} from './admin.schemas.js';
import {
  changeUserStatus,
  getAdminAuditLogs,
  getAdminStats,
  getAdminUserDetail,
  getAdminUsers,
  purgeUser,
  revokeAllUserLinks,
} from './admin.service.js';
import { HTTP_STATUS } from '../constants/http.constants.js';

function extractClientIp(req: Request): string {
  const header = req.headers['cf-connecting-ip'] ?? req.ip ?? '127.0.0.1';
  return Array.isArray(header) ? (header[0] ?? '127.0.0.1') : header;
}

function extractTargetUserId(req: Request): string {
  const { id } = req.params;
  return Array.isArray(id) ? (id[0] ?? '') : (id ?? '');
}

export async function getStatsHandler(
  _req: Request,
  res: Response
): Promise<void> {
  const stats = await getAdminStats();
  res.status(HTTP_STATUS.OK).json({ stats });
}

export async function listUsersHandler(
  req: Request,
  res: Response
): Promise<void> {
  const query = userListQuerySchema.parse(req.query);
  const result = await getAdminUsers(query);
  res.status(HTTP_STATUS.OK).json(result);
}

export async function getUserDetailHandler(
  req: Request,
  res: Response
): Promise<void> {
  const ip = extractClientIp(req);
  const targetUserId = extractTargetUserId(req);
  const detail = await getAdminUserDetail(req.user!.id, targetUserId, ip);
  res.status(HTTP_STATUS.OK).json(detail);
}

export async function updateUserStatusHandler(
  req: Request,
  res: Response
): Promise<void> {
  const ip = extractClientIp(req);
  const targetUserId = extractTargetUserId(req);
  const payload = updateUserStatusSchema.parse(req.body);
  await changeUserStatus(req.user!.id, targetUserId, payload, ip);
  res.status(HTTP_STATUS.OK).json({ message: 'User status updated successfully' });
}

export async function revokeUserLinksHandler(
  req: Request,
  res: Response
): Promise<void> {
  const ip = extractClientIp(req);
  const targetUserId = extractTargetUserId(req);
  const result = await revokeAllUserLinks(req.user!.id, targetUserId, ip);
  res.status(HTTP_STATUS.OK).json({
    message: `Successfully revoked ${result.revokedCount} share links`,
    ...result,
  });
}

export async function deleteUserHandler(
  req: Request,
  res: Response
): Promise<void> {
  const ip = extractClientIp(req);
  const targetUserId = extractTargetUserId(req);
  const payload = deleteUserSchema.parse(req.body);
  await purgeUser(req.user!.id, targetUserId, payload, ip);
  res.status(HTTP_STATUS.OK).json({ message: 'User deleted permanently' });
}

export async function listAuditLogsHandler(
  req: Request,
  res: Response
): Promise<void> {
  const query = auditLogQuerySchema.parse(req.query);
  const result = await getAdminAuditLogs(query);
  res.status(HTTP_STATUS.OK).json(result);
}
