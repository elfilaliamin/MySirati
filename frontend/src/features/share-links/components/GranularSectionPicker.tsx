import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { SectionItemsList } from './SectionItemsList';

interface GranularSectionPickerProps {
  label: string;
  isEnabled: boolean;
  onToggleEnabled: (enabled: boolean) => void;
  items: Array<{ id: string; title: string; subtitle?: string }>;
  selectedIds: string[];
  onChangeSelectedIds: (ids: string[]) => void;
}

interface ControlsProps {
  itemsCount: number;
  selectedCount: number;
  isCustom: boolean;
  isExpanded: boolean;
  onModeChange: (custom: boolean) => void;
  onToggleExpand: () => void;
}

const Controls: FC<ControlsProps> = ({
  itemsCount,
  selectedCount,
  isCustom,
  isExpanded,
  onModeChange,
  onToggleExpand,
}) => (
  <div className="flex items-center gap-1.5 text-xs bg-surface-raised border border-border/80 rounded-lg p-0.5 shadow-subtle">
    <button
      type="button"
      onClick={() => onModeChange(false)}
      className={`px-2 py-0.5 rounded-md transition-all font-medium ${
        !isCustom ? 'bg-primary-soft text-primary shadow-xs' : 'text-text-muted hover:text-text'
      }`}
    >
      All ({itemsCount})
    </button>
    {itemsCount > 1 && (
      <button
        type="button"
        onClick={() => onModeChange(true)}
        className={`px-2 py-0.5 rounded-md transition-all font-medium ${
          isCustom ? 'bg-primary-soft text-primary shadow-xs' : 'text-text-muted hover:text-text'
        }`}
      >
        Specific ({selectedCount}/{itemsCount})
      </button>
    )}
    <button
      type="button"
      onClick={onToggleExpand}
      className="text-text-muted hover:text-text p-1 rounded transition-colors"
      aria-label="Toggle items"
    >
      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
    </button>
  </div>
);

const getNextToggled = (
  allIds: string[],
  selectedIds: string[],
  isAllSelected: boolean,
  id: string
): string[] => {
  if (isAllSelected) {
    return allIds.filter((itemId) => itemId !== id);
  }
  if (selectedIds.includes(id)) {
    return selectedIds.filter((it) => it !== id);
  }
  const next = [...selectedIds, id];
  return next.length === allIds.length ? [] : next;
};

export const GranularSectionPicker: FC<GranularSectionPickerProps> = ({
  label,
  isEnabled,
  onToggleEnabled,
  items,
  selectedIds,
  onChangeSelectedIds,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isAllSelected = selectedIds.length === 0 || selectedIds.length === items.length;
  const isCustom = !isAllSelected && selectedIds.length > 0;
  const selectedCount = isAllSelected ? items.length : selectedIds.length;

  const toggleItem = (id: string) => {
    const allIds = items.map((it) => it.id);
    onChangeSelectedIds(getNextToggled(allIds, selectedIds, isAllSelected, id));
  };

  const handleMode = (custom: boolean) => {
    setIsExpanded(true);
    onChangeSelectedIds(!custom ? [] : isAllSelected ? items.map((it) => it.id) : selectedIds);
  };

  return (
    <div className="rounded-xl border border-border/80 bg-surface/70 p-3.5 space-y-2.5 shadow-subtle">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 text-xs font-semibold text-text cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isEnabled}
            disabled={items.length === 0}
            onChange={(e) => onToggleEnabled(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary accent-primary h-4 w-4 cursor-pointer"
          />
          <span>{label} ({items.length})</span>
        </label>
        {isEnabled && items.length > 0 && (
          <Controls
            itemsCount={items.length}
            selectedCount={selectedCount}
            isCustom={isCustom}
            isExpanded={isExpanded}
            onModeChange={handleMode}
            onToggleExpand={() => setIsExpanded((p) => !p)}
          />
        )}
      </div>
      {isEnabled && isExpanded && items.length > 0 && (
        <SectionItemsList items={items} selectedIds={selectedIds} onToggleItem={toggleItem} />
      )}
    </div>
  );
};
