import type { FC } from 'react';

interface Item {
  id: string;
  title: string;
  subtitle?: string;
}

interface SectionItemsListProps {
  items: Item[];
  selectedIds: string[];
  onToggleItem: (id: string) => void;
}

export const SectionItemsList: FC<SectionItemsListProps> = ({
  items,
  selectedIds,
  onToggleItem,
}) => (
  <div className="mt-2 pt-2 border-t border-border space-y-1.5 max-h-48 overflow-y-auto no-scrollbar ps-6">
    {items.map((it) => {
      const checked = selectedIds.length === 0 || selectedIds.includes(it.id);
      return (
        <label
          key={it.id}
          className="flex items-start gap-2 text-xs text-text cursor-pointer hover:bg-surface-raised p-1 rounded-lg transition-colors select-none"
        >
          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggleItem(it.id)}
            className="rounded border-border text-primary focus:ring-primary accent-primary mt-0.5 cursor-pointer h-3.5 w-3.5"
          />
          <div>
            <span className="font-medium text-text">{it.title}</span>
            {it.subtitle && <span className="text-text-muted ms-1.5">({it.subtitle})</span>}
          </div>
        </label>
      );
    })}
  </div>
);
