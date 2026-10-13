import { useQuery } from '@tanstack/react-query';

import type { AdminStats } from './admin.types';
import { apiClient } from '../../lib/api-client';

export const useAdminStats = () =>
  useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: () => apiClient<{ stats: AdminStats }>('/api/admin/stats'),
    refetchInterval: 30000,
  });
