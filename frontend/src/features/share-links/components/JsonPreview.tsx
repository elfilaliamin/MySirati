import { Check, Copy, FileJson, Loader2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button } from '../../../components/ui';

interface JsonPreviewProps {
  data: unknown;
  isLoading?: boolean;
}

export const JsonPreview: FC<JsonPreviewProps> = ({ data, isLoading = false }) => {
  const [copied, setCopied] = useState(false);
  const jsonStr = data ? JSON.stringify(data, null, 2) : '{\n  // Configure selections to preview\n}';

  const handleCopy = async () => {
    await navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col rounded-2xl border border-border bg-surface overflow-hidden h-full min-h-[350px]">
      <div className="flex items-center justify-between border-b border-border bg-surface-raised px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-text">
          <FileJson className="h-4 w-4 text-primary" />
          <span>Live AI JSON Feed Preview</span>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
        >
          {copied ? 'Copied' : 'Copy JSON'}
        </Button>
      </div>

      <div className="relative flex-1 p-4 overflow-auto font-mono text-xs text-text leading-relaxed bg-surface/50">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-surface/60 backdrop-blur-xs">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
        <pre className="whitespace-pre-wrap break-all">{jsonStr}</pre>
      </div>
    </div>
  );
};
