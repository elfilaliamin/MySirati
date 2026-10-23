import type { FC, HTMLAttributes } from 'react';

export type BadgeVariant = 'primary' | 'success' | 'warning' | 'danger' | 'neutral';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: 'sm' | 'md';
}

const BADGE_VARIANTS: Record<BadgeVariant, string> = {
  primary: 'bg-primary-soft text-primary border-primary/25',
  success: 'bg-success/10 text-success border-success/25',
  warning: 'bg-warning/10 text-warning border-warning/25',
  danger: 'bg-danger/10 text-danger border-danger/25',
  neutral: 'bg-surface text-text-muted border-border',
};

export const Badge: FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const sizeClass = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-0.5 text-xs';

  return (
    <span
      {...props}
      className={`inline-flex items-center gap-1.5 font-semibold rounded-full border transition-colors select-none tracking-wide ${BADGE_VARIANTS[variant]} ${sizeClass} ${className}`}
    >
      {children}
    </span>
  );
};
