import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';
import type { Profile } from '../sections/sections.types';

export const useProfile = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const query = useQuery<{ profile: Profile }>({
    queryKey: ['profile'],
    queryFn: () => apiClient<{ profile: Profile }>('/api/profile'),
  });

  const updateMutation = useMutation({
    mutationFn: (data: Partial<Profile>) =>
      apiClient<{ profile: Profile }>('/api/profile', { method: 'PUT', data }),
    onSuccess: (res) => {
      queryClient.setQueryData(['profile'], res);
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      showToast('Profile updated successfully', 'success');
    },
    onError: (err: Error) => {
      showToast(err.message || 'Failed to update profile', 'error');
    },
  });

  return {
    profile: query.data?.profile,
    isLoading: query.isLoading,
    updateProfile: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
};
