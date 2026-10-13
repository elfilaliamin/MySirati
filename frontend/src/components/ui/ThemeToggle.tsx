import { Monitor, Moon, Sun } from 'lucide-react';
import type { FC } from 'react';

import type { ThemeMode } from '../../constants/theme.constants';
import { useTheme } from '../../hooks/useTheme';

const THEME_OPTIONS: Array<{ mode: ThemeMode; label: string; icon: typeof Sun }> = [
  { mode: 'light', label: 'Light theme', icon: Sun },
  { mode: 'system', label: 'System theme', icon: Monitor },
  { mode: 'dark', label: 'Dark theme', icon: Moon },
];

export const ThemeToggle: FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();

  return (
    <div
      role="group"
      aria-label="Theme selector"
      className={`inline-flex items-center rounded-lg border border-border bg-surface p-1 ${className}`}
    >
      {THEME_OPTIONS.map(({ mode, label, icon: Icon }) => {
        const isActive = theme === mode;
        return (
          <button
            key={mode}
            type="button"
            onClick={() => setTheme(mode)}
            title={label}
            aria-label={label}
            aria-pressed={isActive}
            className={`flex h-7 w-7 items-center justify-center rounded-md transition-colors ${
              isActive
                ? 'bg-surface-raised text-primary shadow-sm font-semibold'
                : 'text-text-muted hover:text-text'
            }`}
          >
            <Icon className="h-4 w-4" />
          </button>
        );
      })}
    </div>
  );
};
