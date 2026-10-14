import type { FC } from 'react';

interface ImportModeSelectorProps {
  mode: 'merge' | 'replace';
  onModeChange: (mode: 'merge' | 'replace') => void;
}

export const ImportModeSelector: FC<ImportModeSelectorProps> = ({
  mode,
  onModeChange,
}) => (
  <div className="space-y-2">
    <label className="text-xs font-semibold text-text">Import Mode</label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
      <button
        type="button"
        onClick={() => onModeChange('merge')}
        className={`p-3 rounded-xl border text-left transition-all ${
          mode === 'merge'
            ? 'border-primary bg-primary-soft/40 shadow-xs'
            : 'border-border bg-surface hover:border-border/80'
        }`}
      >
        <p className="text-xs font-semibold text-text">Merge (Recommended)</p>
        <p className="text-[11px] text-text-muted mt-0.5">
          Keeps existing records and appends new items.
        </p>
      </button>
      <button
        type="button"
        onClick={() => onModeChange('replace')}
        className={`p-3 rounded-xl border text-left transition-all ${
          mode === 'replace'
            ? 'border-danger/60 bg-danger/10 shadow-xs'
            : 'border-border bg-surface hover:border-border/80'
        }`}
      >
        <p className="text-xs font-semibold text-danger">Replace</p>
        <p className="text-[11px] text-text-muted mt-0.5">
          Overwrites your existing career records.
        </p>
      </button>
    </div>
  </div>
);
