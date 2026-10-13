import type { FC, HTMLAttributes } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  primary: 'bg-primary-soft text-primary border-primary/20',
  success: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  neutral: 'bg-surface text-text-muted border-border',
};

export const Badge: FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs';

  return (
    <span
      {...props}
      className={`inline-flex items-center gap-1 font-medium rounded-full border transition-colors ${BADGE_VARIANTS[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
};
