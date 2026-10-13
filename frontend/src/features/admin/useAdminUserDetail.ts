import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { AdminUserDetail } from './admin.types';
import { useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

export const useAdminUserDetail = (id?: string) =>
  useQuery({
    queryKey: ['admin', 'user', id],
    queryFn: () => apiClient<AdminUserDetail>(`/api/admin/users/${id}`),
    enabled: Boolean(id),
  });

export const useAdminUserMutations = (userId: string) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['admin', 'user', userId] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
  };

  const statusMutation = useMutation({
    mutationFn: (data: { status: 'active' | 'suspended'; reason: string }) =>
      apiClient<{ message: string }>(`/api/admin/users/${userId}/status`, {
        method: 'PATCH',
        data,
      }),
    onSuccess: (res) => {
      invalidate();
      showToast(res.message, 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Status update failed', 'error'),
  });

  const revokeMutation = useMutation({
    mutationFn: () =>
      apiClient<{ message: string; revokedCount: number }>(
        `/api/admin/users/${userId}/revoke-links`,
        { method: 'POST' }
      ),
    onSuccess: (res) => {
      invalidate();
      showToast(res.message, 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Revoking links failed', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (data: { confirmEmail: string }) =>
      apiClient<{ message: string }>(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        data,
      }),
    onSuccess: () => {
      invalidate();
      showToast('User permanently deleted', 'info');
    },
    onError: (err: Error) => showToast(err.message || 'Deletion failed', 'error'),
  });

  return { statusMutation, revokeMutation, deleteMutation };
};
