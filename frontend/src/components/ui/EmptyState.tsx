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
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-surface-raised/40 p-8 text-center sm:p-12">
    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-surface border border-border text-text-muted shadow-sm">
      {icon}
    </div>
    <h3 className="text-base font-semibold text-text">{title}</h3>
    <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-text-muted">{description}</p>
    {actionLabel && onAction && (
      <div className="mt-5">
        <Button onClick={onAction} size="sm">
          {actionLabel}
        </Button>
      </div>
    )}
  </div>
);
