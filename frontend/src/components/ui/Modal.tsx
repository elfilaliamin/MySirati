import { X } from 'lucide-react';
import { useEffect } from 'react';
import type { FC, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

const MAX_WIDTHS = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
};

const ModalHeader: FC<{ title: string; description?: string; onClose: () => void }> = ({
  title,
  description,
  onClose,
}) => (
  <div className="mb-4 flex items-start justify-between">
    <div>
      <h3 className="text-base sm:text-lg font-semibold text-text">{title}</h3>
      {description && <p className="mt-1 text-xs sm:text-sm text-text-muted">{description}</p>}
    </div>
    <button
      type="button"
      onClick={onClose}
      className="rounded-lg p-1.5 text-text-muted hover:bg-surface hover:text-text transition-colors shrink-0 ml-2"
      aria-label="Close dialog"
    >
      <X className="h-5 w-5" />
    </button>
  </div>
);

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  maxWidth = 'md',
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
    >
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        className={`relative w-full ${MAX_WIDTHS[maxWidth]} max-h-[calc(100vh-2rem)] sm:max-h-[85vh] overflow-y-auto overflow-x-hidden rounded-2xl border border-border bg-surface-raised p-4 sm:p-6 shadow-xl transition-all my-auto min-w-0`}
      >
        <ModalHeader title={title} description={description} onClose={onClose} />
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
};
