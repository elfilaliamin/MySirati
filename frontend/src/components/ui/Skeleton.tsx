import type { FC, HTMLAttributes } from 'react';

import { Card } from './Card';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Skeleton: FC<SkeletonProps> = ({ className = '', ...props }) => (
  <div
    className={`animate-pulse rounded-lg bg-surface-muted/90 dark:bg-surface-muted/80 ${className}`}
    {...props}
  />
);

export const SkeletonText: FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className = '',
}) => (
  <div className={`space-y-2.5 ${className}`}>
    {Array.from({ length: lines }).map((_, i) => (
      <Skeleton
        key={i}
        className={`h-3.5 ${
          i === lines - 1 ? 'w-3/5' : i === 0 ? 'w-full' : 'w-5/6'
        }`}
      />
    ))}
  </div>
);

export const SkeletonCard: FC<{ className?: string }> = ({ className = '' }) => (
  <Card className={`p-5 space-y-4 ${className}`}>
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3 w-2/3">
        <Skeleton className="h-10 w-10 shrink-0 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4 rounded" />
          <Skeleton className="h-3 w-1/2 rounded" />
        </div>
      </div>
      <Skeleton className="h-8 w-20 rounded-lg" />
    </div>
    <SkeletonText lines={2} />
    <div className="flex gap-2 pt-1">
      <Skeleton className="h-5 w-16 rounded-full" />
      <Skeleton className="h-5 w-20 rounded-full" />
      <Skeleton className="h-5 w-14 rounded-full" />
    </div>
  </Card>
);

export const SkeletonList: FC<{ count?: number; className?: string }> = ({
  count = 3,
  className = '',
}) => (
  <div className={`space-y-3.5 ${className}`}>
    {Array.from({ length: count }).map((_, idx) => (
      <SkeletonCard key={idx} />
    ))}
  </div>
);

export const SkeletonStatsGrid: FC<{ count?: number }> = ({ count = 5 }) => (
  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
    {Array.from({ length: count }).map((_, i) => (
      <Card key={i} className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Skeleton className="h-3 w-16 rounded" />
          <Skeleton className="h-4 w-4 rounded" />
        </div>
        <Skeleton className="h-7 w-12 rounded" />
      </Card>
    ))}
  </div>
);

export const SkeletonTableRow: FC<{ columns?: number }> = ({ columns = 4 }) => (
  <tr className="border-b border-border-subtle/50">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i} className="px-4 py-3.5">
        <Skeleton className={`h-4 ${i === 0 ? 'w-32' : i === 1 ? 'w-24' : 'w-16'} rounded`} />
      </td>
    ))}
  </tr>
);
