import { forwardRef } from 'react';
import type { FC, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const InputHelper: FC<{ error?: string; helperText?: string }> = ({ error, helperText }) => {
  if (error) return <span className="text-xs font-medium text-danger">{error}</span>;
  if (helperText) return <span className="text-xs text-text-muted">{helperText}</span>;
  return null;
};

const buildInputClass = (hasError: boolean, hasLeft: boolean, hasRight: boolean, custom = '') => {
  const border = hasError ? 'border-danger' : 'border-border';
  const padLeft = hasLeft ? 'pl-10' : '';
  const padRight = hasRight ? 'pr-10' : '';
  return `w-full rounded-xl border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 ${border} ${padLeft} ${padRight} ${custom}`;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 text-left w-full">
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-text">
            {label}
            {props.required && <span className="text-danger ml-0.5">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="pointer-events-none absolute left-3 text-text-muted">{leftIcon}</div>}
          <input
            {...props}
            id={inputId}
            ref={ref}
            className={buildInputClass(Boolean(error), Boolean(leftIcon), Boolean(rightIcon), className)}
          />
          {rightIcon && <div className="absolute right-3 text-text-muted">{rightIcon}</div>}
        </div>
        <InputHelper error={error} helperText={helperText} />
      </div>
    );
  }
);

Input.displayName = 'Input';
