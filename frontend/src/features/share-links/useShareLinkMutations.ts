import { useMutation, useQueryClient } from '@tanstack/react-query';

import type {
  CreateShareLinkPayload,
  CreateShareLinkResponse,
  ShareLink,
} from './share-links.types';
import { useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

const useShareLinkLifecycleMutations = (
  invalidate: () => Promise<void>,
  showToast: (msg: string, variant: 'success' | 'error' | 'info') => void,
) => {
  const regenerateMutation = useMutation({
    mutationFn: ({ id, expiresAt }: { id: string; expiresAt?: string | null }) =>
      apiClient<CreateShareLinkResponse>(`/api/share-links/${id}/regenerate`, {
        method: 'POST',
        data: { expiresAt },
      }),
    onSuccess: () => {
      invalidate();
      showToast('Key regenerated successfully', 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to regenerate key', 'error'),
  });

  const revokeMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ link: ShareLink }>(`/api/share-links/${id}/revoke`, { method: 'POST' }),
    onSuccess: () => {
      invalidate();
      showToast('Share link revoked', 'info');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to revoke link', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ message: string }>(`/api/share-links/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      invalidate();
      showToast('Share link deleted', 'info');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to delete link', 'error'),
  });

  return { regenerateMutation, revokeMutation, deleteMutation };
};

export const useShareLinkMutations = () => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ['share-links'] });

  const createMutation = useMutation({
    mutationFn: (data: CreateShareLinkPayload) =>
      apiClient<CreateShareLinkResponse>('/api/share-links', { method: 'POST', data }),
    onSuccess: () => invalidate(),
    onError: (err: Error) => showToast(err.message || 'Failed to create share link', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreateShareLinkPayload> }) =>
      apiClient<{ link: ShareLink }>(`/api/share-links/${id}`, { method: 'PUT', data }),
    onSuccess: () => {
      invalidate();
      showToast('Share link updated successfully', 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update share link', 'error'),
  });

  const lifecycleMutations = useShareLinkLifecycleMutations(invalidate, showToast);

  return { createMutation, updateMutation, ...lifecycleMutations };
};
