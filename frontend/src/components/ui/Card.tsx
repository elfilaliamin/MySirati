import type { FC, HTMLAttributes } from 'react';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div
    {...props}
    className={`rounded-2xl border border-border bg-surface-raised p-6 shadow-sm transition-shadow ${className}`}
  >
    {children}
  </div>
);

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div {...props} className={`mb-4 flex flex-col gap-1 ${className}`}>
    {children}
  </div>
);

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => (
  <h3 {...props} className={`text-lg font-semibold text-text ${className}`}>
    {children}
  </h3>
);

export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p {...props} className={`text-sm text-text-muted ${className}`}>
    {children}
  </p>
);
