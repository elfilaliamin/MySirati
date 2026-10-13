import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { LoginPayload, RegisterPayload, User } from './auth.types';
import { useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

export const useAuthMutations = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const invalidateAuth = () => queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

  const loginMutation = useMutation({
    mutationFn: (data: LoginPayload) =>
      apiClient<{ user: User }>('/api/auth/login', { method: 'POST', data }),
    onSuccess: () => {
      invalidateAuth();
      showToast('Signed in successfully', 'success');
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterPayload) =>
      apiClient<{ user: User }>('/api/auth/register', { method: 'POST', data }),
    onSuccess: () => {
      invalidateAuth();
      showToast('Account created successfully', 'success');
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiClient<{ message: string }>('/api/auth/logout', { method: 'POST' }),
    onSuccess: () => {
      queryClient.setQueryData(['auth', 'me'], { user: null });
      showToast('Signed out', 'info');
    },
  });

  return { loginMutation, registerMutation, logoutMutation };
};
