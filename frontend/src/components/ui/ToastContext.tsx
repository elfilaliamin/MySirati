import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { createContext, useCallback, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, durationMs?: number) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

const ICONS: Record<ToastType, typeof Info> = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const BORDER_CLASSES: Record<ToastType, string> = {
  success: 'border-emerald-500/30 text-emerald-600 dark:text-emerald-400',
  error: 'border-rose-500/30 text-rose-600 dark:text-rose-400',
  info: 'border-primary/30 text-primary',
};

const ToastCard: FC<{ toast: ToastItem; onDismiss: (id: string) => void }> = ({
  toast,
  onDismiss,
}) => {
  const Icon = ICONS[toast.type];

  return (
    <div
      role="alert"
      className={`pointer-events-auto flex items-center justify-between gap-3 rounded-xl border bg-surface-raised p-3.5 sm:p-4 shadow-lg text-sm text-text transition-all w-full max-w-sm ${BORDER_CLASSES[toast.type]}`}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        <Icon className="h-5 w-5 shrink-0" />
        <span className="text-text font-medium break-words text-xs sm:text-sm">
          {toast.message}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        className="text-text-muted hover:text-text p-1 rounded-lg shrink-0"
        aria-label="Dismiss toast"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export const ToastProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, type: ToastType = 'info', durationMs = 4000) => {
      const id = Math.random().toString(36).slice(2, 9);
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), durationMs);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-4 z-50 flex flex-col items-center sm:items-end gap-2 max-w-sm mx-auto sm:mx-0 w-auto pointer-events-none">
        {toasts.map((toast) => (
          <ToastCard key={toast.id} toast={toast} onDismiss={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};
