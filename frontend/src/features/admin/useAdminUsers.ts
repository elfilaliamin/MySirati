import { useQuery } from '@tanstack/react-query';

import type { AdminUserSummary, PaginatedResult } from './admin.types';
import { apiClient } from '../../lib/api-client';

export interface AdminUsersFilter {
  page: number;
  limit: number;
  search?: string;
  status?: string;
  role?: string;
}

export const useAdminUsers = (filters: AdminUsersFilter) => {
  const queryParams = new URLSearchParams();
  queryParams.set('page', String(filters.page));
  queryParams.set('limit', String(filters.limit));
  if (filters.search) queryParams.set('search', filters.search);
  if (filters.status) queryParams.set('status', filters.status);
  if (filters.role) queryParams.set('role', filters.role);

  return useQuery({
    queryKey: ['admin', 'users', filters],
    queryFn: () =>
      apiClient<PaginatedResult<AdminUserSummary>>(`/api/admin/users?${queryParams.toString()}`),
  });
};
