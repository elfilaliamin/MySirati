import { forwardRef } from 'react';
import type { ReactNode, SelectHTMLAttributes } from 'react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  options?: SelectOption[];
  children?: ReactNode;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, helperText, options, children, className = '', id, ...props }, ref) => {
    const selectId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5 text-start w-full min-w-0">
        {label && (
          <label htmlFor={selectId} className="text-xs font-semibold text-text tracking-wide">
            {label}
            {props.required && <span className="text-danger ms-1">*</span>}
          </label>
        )}
        <select
          {...props}
          id={selectId}
          ref={ref}
          className={`w-full rounded-xl border bg-surface-raised px-3.5 py-2.5 text-sm text-text shadow-subtle transition-all duration-150 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-50 ${
            error
              ? 'border-danger focus:ring-danger/10'
              : 'border-border focus:border-primary focus:ring-primary/10'
          } ${className}`}
        >
          {options ? options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          )) : children}
        </select>
        {error && <span className="text-xs font-medium text-danger">{error}</span>}
        {!error && helperText && <span className="text-xs text-text-muted">{helperText}</span>}
      </div>
    );
  }
);

Select.displayName = 'Select';
