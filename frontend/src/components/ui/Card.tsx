import type { FC, HTMLAttributes } from 'react';

export const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div
    {...props}
    className={`rounded-2xl border border-border/80 bg-surface-raised p-4 sm:p-6 shadow-card transition-all duration-200 card-specular ${className}`}
  >
    {children}
  </div>
);

export const CardHeader: FC<HTMLAttributes<HTMLDivElement>> = ({ className = '', children, ...props }) => (
  <div {...props} className={`mb-5 flex flex-col gap-1.5 ${className}`}>
    {children}
  </div>
);

export const CardTitle: FC<HTMLAttributes<HTMLHeadingElement>> = ({ className = '', children, ...props }) => (
  <h3 {...props} className={`text-base sm:text-lg font-bold tracking-tight text-text ${className}`}>
    {children}
  </h3>
);

export const CardDescription: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className = '',
  children,
  ...props
}) => (
  <p {...props} className={`text-xs sm:text-sm text-text-muted leading-relaxed ${className}`}>
    {children}
  </p>
);
