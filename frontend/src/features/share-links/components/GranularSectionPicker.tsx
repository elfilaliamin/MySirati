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
  <div className="flex items-center gap-2 text-xs">
    <button
      type="button"
      onClick={() => onModeChange(false)}
      className={`px-2 py-0.5 rounded-md transition-colors ${
        !isCustom ? 'bg-primary-soft text-primary font-medium' : 'text-text-muted hover:text-text'
      }`}
    >
      All ({itemsCount})
    </button>
    {itemsCount > 1 && (
      <button
        type="button"
        onClick={() => onModeChange(true)}
        className={`px-2 py-0.5 rounded-md transition-colors ${
          isCustom ? 'bg-primary-soft text-primary font-medium' : 'text-text-muted hover:text-text'
        }`}
      >
        Specific ({selectedCount}/{itemsCount})
      </button>
    )}
    <button
      type="button"
      onClick={onToggleExpand}
      className="text-text-muted hover:text-text p-1 transition-colors"
      aria-label="Toggle items"
    >
      {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
    </button>
  </div>
);

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
    if (isAllSelected) {
      // Transition from All mode to Specific: keep all other items selected except the toggled one
      const remaining = items.map((it) => it.id).filter((itemId) => itemId !== id);
      onChangeSelectedIds(remaining);
      return;
    }

    if (selectedIds.includes(id)) {
      const next = selectedIds.filter((it) => it !== id);
      onChangeSelectedIds(next);
    } else {
      const next = [...selectedIds, id];
      // If all items are selected, reset to [] for canonical All mode
      onChangeSelectedIds(next.length === items.length ? [] : next);
    }
  };

  const handleMode = (custom: boolean) => {
    setIsExpanded(true);
    if (!custom) {
      onChangeSelectedIds([]);
    } else if (isAllSelected) {
      onChangeSelectedIds(items.map((it) => it.id));
    }
  };

  return (
    <div className="rounded-xl border border-border bg-surface p-3.5 space-y-2.5">
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2.5 text-xs font-semibold text-text cursor-pointer">
          <input
            type="checkbox"
            checked={isEnabled}
            disabled={items.length === 0}
            onChange={(e) => onToggleEnabled(e.target.checked)}
            className="rounded border-border text-primary focus:ring-primary"
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
