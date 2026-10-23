import { forwardRef } from 'react';
import type { FC, InputHTMLAttributes, ReactNode } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

const InputHelper: FC<{ error?: string; helperText?: string }> = ({ error, helperText }) => {
  if (error) return <span className="text-xs font-medium text-danger">{error}</span>;
  if (helperText) return <span className="text-xs text-text-muted">{helperText}</span>;
  return null;
};

const buildInputClass = (hasError: boolean, hasLeft: boolean, hasRight: boolean, custom = '') => {
  const border = hasError ? 'border-danger focus:ring-danger/10' : 'border-border focus:border-primary focus:ring-primary/10';
  const padStart = hasLeft ? 'ps-10' : 'ps-3.5';
  const padEnd = hasRight ? 'pe-10' : 'pe-3.5';
  return `w-full rounded-xl border bg-surface-raised py-2.5 text-base sm:text-sm text-text placeholder:text-text-muted/70 transition-all duration-150 shadow-subtle focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${border} ${padStart} ${padEnd} ${custom}`;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, leftIcon, rightIcon, className = '', containerClassName = '', id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className={`flex flex-col gap-1.5 text-start w-full min-w-0 ${containerClassName}`}>
        {label && (
          <label htmlFor={inputId} className="text-xs font-semibold text-text tracking-wide">
            {label}
            {props.required && <span className="text-danger ms-1">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && <div className="pointer-events-none absolute start-3 text-text-muted">{leftIcon}</div>}
          <input
            {...props}
            id={inputId}
            ref={ref}
            className={buildInputClass(Boolean(error), Boolean(leftIcon), Boolean(rightIcon), className)}
          />
          {rightIcon && <div className="absolute end-3 text-text-muted">{rightIcon}</div>}
        </div>
        <InputHelper error={error} helperText={helperText} />
      </div>
    );
  }
);

Input.displayName = 'Input';
