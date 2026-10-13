import { useQuery } from '@tanstack/react-query';

import type { AdminAuditLogEntry, PaginatedResult } from './admin.types';
import { apiClient } from '../../lib/api-client';

export interface AdminAuditLogsFilter {
  page: number;
  limit: number;
  action?: string;
  adminId?: string;
  targetUserId?: string;
}

export const useAdminAuditLogs = (filters: AdminAuditLogsFilter) => {
  const queryParams = new URLSearchParams();
  queryParams.set('page', String(filters.page));
  queryParams.set('limit', String(filters.limit));
  if (filters.action) queryParams.set('action', filters.action);
  if (filters.adminId) queryParams.set('adminId', filters.adminId);
  if (filters.targetUserId) queryParams.set('targetUserId', filters.targetUserId);

  return useQuery({
    queryKey: ['admin', 'audit-log', filters],
    queryFn: () =>
      apiClient<PaginatedResult<AdminAuditLogEntry>>(`/api/admin/audit-log?${queryParams.toString()}`),
  });
};
