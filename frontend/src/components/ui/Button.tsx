import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes, FC, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'soft';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-hover active:scale-[0.98] shadow-sm hover:shadow-glow-primary',
  secondary:
    'bg-surface-raised text-text border border-border hover:bg-surface hover:border-border/80 active:scale-[0.98] shadow-subtle',
  outline:
    'border border-border text-text hover:bg-surface hover:border-primary/40 active:scale-[0.98]',
  ghost:
    'text-text-muted hover:text-text hover:bg-surface active:scale-[0.98]',
  danger:
    'bg-danger text-white hover:opacity-90 active:scale-[0.98] shadow-sm',
  soft:
    'bg-primary-soft text-primary hover:opacity-90 active:scale-[0.98]',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-xs rounded-lg gap-1.5 font-medium',
  md: 'h-10 px-4 text-sm rounded-xl gap-2 font-medium',
  lg: 'h-12 px-5 sm:px-6 text-base rounded-xl gap-2.5 font-semibold',
};

export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center whitespace-nowrap transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : leftIcon}
      <span className="inline-flex items-center gap-1.5 leading-none">{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
