import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { SectionType } from './sections.types';
import { useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

export const useSectionMutations = <T extends { id: string }>(section: SectionType) => {
  const queryClient = useQueryClient();
  const { showToast } = useToast();

  const invalidate = () => {
    queryClient.invalidateQueries({ queryKey: ['sections', section] });
    queryClient.invalidateQueries({ queryKey: ['dashboard'] });
  };

  const createMutation = useMutation({
    mutationFn: (data: unknown) =>
      apiClient<{ item: T }>(`/api/sections/${section}`, { method: 'POST', data }),
    onSuccess: () => {
      invalidate();
      showToast('Item created successfully', 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to create item', 'error'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      apiClient<{ item: T }>(`/api/sections/${section}/${id}`, { method: 'PUT', data }),
    onSuccess: () => {
      invalidate();
      showToast('Item updated successfully', 'success');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to update item', 'error'),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiClient<{ message: string }>(`/api/sections/${section}/${id}`, { method: 'DELETE' }),
    onSuccess: () => {
      invalidate();
      showToast('Item deleted successfully', 'info');
    },
    onError: (err: Error) => showToast(err.message || 'Failed to delete item', 'error'),
  });

  const reorderMutation = useMutation({
    mutationFn: (itemIds: string[]) =>
      apiClient<{ success: boolean }>(`/api/sections/${section}/reorder`, {
        method: 'PATCH',
        data: { itemIds },
      }),
    onSuccess: () => invalidate(),
    onError: (err: Error) => showToast(err.message || 'Failed to reorder items', 'error'),
  });

  return { createMutation, updateMutation, deleteMutation, reorderMutation };
};
