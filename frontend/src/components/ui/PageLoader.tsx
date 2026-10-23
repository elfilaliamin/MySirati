import { Loader2 } from 'lucide-react';
import type { FC } from 'react';

import { MySiratiIcon } from './MySiratiLogo';

interface PageLoaderProps {
  label?: string;
  fullscreen?: boolean;
}

export const PageLoader: FC<PageLoaderProps> = ({
  label = 'Loading...',
  fullscreen = false,
}) => {
  const containerClass = fullscreen
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-bg/80 backdrop-blur-md'
    : 'flex min-h-[45vh] items-center justify-center p-8';

  return (
    <div className={containerClass}>
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="relative flex items-center justify-center">
          <div className="absolute -inset-3 rounded-full bg-primary/15 blur-lg animate-pulse" />
          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border/80 bg-surface-raised shadow-card">
            <MySiratiIcon className="h-8 w-8 animate-pulse text-primary" />
          </div>
          <div className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-sm">
            <Loader2 className="h-3 w-3 animate-spin" />
          </div>
        </div>
        {label && (
          <p className="text-xs font-medium text-text-muted animate-pulse tracking-wide">
            {label}
          </p>
        )}
      </div>
    </div>
  );
};
