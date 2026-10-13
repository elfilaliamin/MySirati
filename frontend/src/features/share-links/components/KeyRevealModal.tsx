import { AlertTriangle, Check, Copy } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, Modal } from '../../../components/ui';

interface KeyRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawKey: string;
}

const UrlCopyRow: FC<{ url: string }> = ({ url }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="text-xs font-semibold text-text block mb-1.5">Direct AI Endpoint URL</label>
      <div className="flex items-center gap-2 min-w-0">
        <input
          readOnly
          value={url}
          className="flex-1 min-w-0 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-text select-all"
        />
        <Button
          size="sm"
          className="shrink-0"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        >
          {copied ? 'Copied' : 'Copy'}
        </Button>
      </div>
    </div>
  );
};

const PromptCopySection: FC<{ prompt: string }> = ({ prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <label className="text-xs font-semibold text-text block mb-1.5">
        Ready-Made Prompt for ChatGPT, Claude & Gemini
      </label>
      <div className="rounded-xl border border-border bg-surface p-3 text-xs text-text-muted leading-relaxed whitespace-pre-wrap font-sans break-all [overflow-wrap:anywhere] select-all max-h-48 overflow-y-auto">
        {prompt}
      </div>
      <div className="mt-2 flex justify-end">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        >
          {copied ? 'Prompt Copied' : 'Copy AI Prompt'}
        </Button>
      </div>
    </div>
  );
};

export const KeyRevealModal: FC<KeyRevealModalProps> = ({ isOpen, onClose, rawKey }) => {
  const fullUrl = `${window.location.origin}/api/p?key=${rawKey}`;
  const aiPrompt = `Here is my structured, verified career resume JSON provided via MySirati: ${fullUrl}. Please analyze this data and match it against the following job opportunity:\n\n[Paste Job Description Here]`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Link Created" maxWidth="lg">
      <div className="space-y-5 text-left min-w-0">
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>
            Save this secret link now. For your security, the secret key is displayed only once and
            cannot be retrieved later.
          </span>
        </div>
        <UrlCopyRow url={fullUrl} />
        <PromptCopySection prompt={aiPrompt} />
        <div className="flex justify-end pt-3 border-t border-border">
          <Button onClick={onClose}>I Have Saved This Key</Button>
        </div>
      </div>
    </Modal>
  );
};
