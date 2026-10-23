import type { FC, ReactNode } from 'react';

import { Button } from './Button';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState: FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-raised/60 p-8 text-center sm:p-12 shadow-subtle card-specular">
    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-soft/70 border border-primary/20 text-primary shadow-subtle ring-8 ring-primary-soft/30">
      {icon}
    </div>
    <h3 className="text-base sm:text-lg font-bold tracking-tight text-text">{title}</h3>
    <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-text-muted leading-relaxed">{description}</p>
    {actionLabel && onAction && (
      <div className="mt-5">
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      </div>
    )}
  </div>
);
