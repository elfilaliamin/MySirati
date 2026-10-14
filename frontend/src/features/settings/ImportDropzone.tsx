import { Upload } from 'lucide-react';
import type { FC, RefObject } from 'react';
import { useState } from 'react';

import { Button } from '../../components/ui';

interface ImportDropzoneProps {
  onFileSelect: (file: File) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const ImportDropzone: FC<ImportDropzoneProps> = ({
  onFileSelect,
  fileInputRef,
}) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setIsDragging(false);
        const f = e.dataTransfer.files?.[0];
        if (f) onFileSelect(f);
      }}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
        isDragging
          ? 'border-primary bg-primary-soft/50 scale-[1.01]'
          : 'border-border bg-surface hover:border-primary/50 hover:bg-surface-raised'
      }`}
    >
      <div className="flex flex-col items-center gap-2">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Upload className="h-6 w-6" />
        </div>
        <h4 className="text-sm font-semibold text-text">Choose a JSON file or drag & drop here</h4>
        <p className="text-xs text-text-muted">
          Accepts <span className="font-mono text-primary">.json</span> files exported from MySirati.
        </p>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="mt-2"
          onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
        >
          Browse Files
        </Button>
      </div>
    </div>
  );
};
