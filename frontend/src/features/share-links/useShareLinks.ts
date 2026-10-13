import { useQuery } from '@tanstack/react-query';

import type { ShareLink } from './share-links.types';
import { useShareLinkMutations } from './useShareLinkMutations';
import { apiClient } from '../../lib/api-client';

export const useShareLinks = () => {
  const query = useQuery<{ links: ShareLink[] }>({
    queryKey: ['share-links'],
    queryFn: () => apiClient<{ links: ShareLink[] }>('/api/share-links'),
  });

  const mutations = useShareLinkMutations();

  return {
    links: query.data?.links ?? [],
    isLoading: query.isLoading,
    refetch: query.refetch,
    createLink: mutations.createMutation.mutateAsync,
    isCreating: mutations.createMutation.isPending,
    updateLink: mutations.updateMutation.mutateAsync,
    isUpdating: mutations.updateMutation.isPending,
    regenerateKey: mutations.regenerateMutation.mutateAsync,
    isRegenerating: mutations.regenerateMutation.isPending,
    revokeLink: mutations.revokeMutation.mutateAsync,
    isRevoking: mutations.revokeMutation.isPending,
    deleteLink: mutations.deleteMutation.mutateAsync,
    isDeleting: mutations.deleteMutation.isPending,
  };
};

export const useShareLink = (id?: string) => {
  return useQuery<{ link: ShareLink }>({
    queryKey: ['share-links', id],
    queryFn: () => apiClient<{ link: ShareLink }>(`/api/share-links/${id}`),
    enabled: Boolean(id),
  });
};
