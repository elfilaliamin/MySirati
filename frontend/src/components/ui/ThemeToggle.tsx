import { Monitor, Moon, Sun } from 'lucide-react';
import type { FC } from 'react';

import type { ThemeMode } from '../../constants/theme.constants';
import { useTheme } from '../../hooks/useTheme';

const THEME_OPTIONS: Array<{ mode: ThemeMode; label: string; icon: typeof Sun }> = [
  { mode: 'light', label: 'Light theme', icon: Sun },
  { mode: 'system', label: 'System theme', icon: Monitor },
  { mode: 'dark', label: 'Dark theme', icon: Moon },
];

interface ThemeToggleProps {
  className?: string;
  variant?: 'segmented' | 'icon';
}

const IconThemeToggle: FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, setTheme } = useTheme();
  const isDark =
    theme === 'dark' ||
    (theme === 'system' &&
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-border bg-surface text-text-muted hover:bg-surface-raised hover:text-text transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${className}`}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
};

export const ThemeToggle: FC<ThemeToggleProps> = ({
  className = '',
  variant = 'segmented',
}) => {
  const { theme, setTheme } = useTheme();

  if (variant === 'icon') {
    return <IconThemeToggle className={className} />;
  }

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
