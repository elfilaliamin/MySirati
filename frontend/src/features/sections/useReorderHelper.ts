export const swapAndReorder = async <T extends { id: string }>(
  items: T[],
  index: number,
  direction: 'up' | 'down',
  reorderFn: (ids: string[]) => Promise<unknown>
): Promise<void> => {
  const targetIndex = direction === 'up' ? index - 1 : index + 1;
  if (targetIndex < 0 || targetIndex >= items.length) return;

  const clone = [...items];
  const itemA = clone[index];
  const itemB = clone[targetIndex];
  if (!itemA || !itemB) return;

  clone[index] = itemB;
  clone[targetIndex] = itemA;

  await reorderFn(clone.map((it) => it.id));
};
