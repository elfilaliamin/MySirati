import { useQuery } from '@tanstack/react-query';

import type { SectionType } from './sections.types';
import { useSectionMutations } from './useSectionMutations';
import { apiClient } from '../../lib/api-client';

export const useSection = <T extends { id: string }>(section: SectionType) => {
  const query = useQuery<{ items: T[] }>({
    queryKey: ['sections', section],
    queryFn: () => apiClient<{ items: T[] }>(`/api/sections/${section}`),
  });

  const { createMutation, updateMutation, deleteMutation, reorderMutation } =
    useSectionMutations<T>(section);

  return {
    items: query.data?.items ?? [],
    isLoading: query.isLoading,
    createItem: createMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
    reorderItems: reorderMutation.mutateAsync,
  };
};
