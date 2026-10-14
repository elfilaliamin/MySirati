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
  primary: 'bg-primary text-white hover:bg-primary-hover active:opacity-95 shadow-sm',
  secondary: 'bg-surface-raised text-text border border-border hover:bg-surface active:opacity-95',
  outline: 'border border-border text-text hover:bg-surface active:opacity-95',
  ghost: 'text-text-muted hover:text-text hover:bg-surface',
  danger: 'bg-danger text-white hover:opacity-90 active:opacity-95 shadow-sm',
  soft: 'bg-primary-soft text-primary hover:opacity-90',
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  sm: 'h-8 px-2.5 text-xs rounded-lg gap-1.5',
  md: 'h-10 px-4 text-sm rounded-xl gap-2',
  lg: 'h-12 px-5 text-base rounded-xl gap-2.5',
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
      className={`inline-flex items-center justify-center font-medium whitespace-nowrap transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${VARIANT_STYLES[variant]} ${SIZE_STYLES[size]} ${className}`}
    >
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : leftIcon}
      <span className="inline-flex items-center gap-1.5 leading-none">{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
