import { AlertTriangle, Check, Copy, ExternalLink } from 'lucide-react';
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
      <label className="text-xs font-semibold text-text block mb-1.5 tracking-wide">Direct AI Endpoint URL</label>
      <div className="flex items-center gap-2 min-w-0">
        <input
          readOnly
          value={url}
          className="flex-1 min-w-0 rounded-xl border border-border bg-surface px-3.5 py-2 text-xs font-mono text-text select-all focus:outline-none focus:ring-2 focus:ring-primary/20 shadow-subtle"
        />
        <Button
          size="sm"
          className="shrink-0"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
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
      <div className="flex items-center justify-between mb-1.5">
        <label className="text-xs font-semibold text-text block tracking-wide">
          Ready-Made Prompt for ChatGPT, Claude & Gemini
        </label>
        <a
          href="/docs/ai/prompts-and-workflows"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-primary hover:underline inline-flex items-center gap-1 font-semibold"
        >
          <span>AI Guide & Prompts</span>
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      <div className="rounded-xl border border-border bg-surface p-3.5 text-xs text-text-muted leading-relaxed whitespace-pre-wrap font-sans break-all [overflow-wrap:anywhere] select-all max-h-48 overflow-y-auto no-scrollbar shadow-subtle">
        {prompt}
      </div>
      <div className="mt-2.5 flex justify-end">
        <Button
          size="sm"
          variant="secondary"
          onClick={handleCopy}
          leftIcon={copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
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
      <div className="space-y-5 text-start min-w-0">
        <div className="rounded-xl bg-warning/10 border border-warning/20 p-3.5 flex items-start gap-2.5 text-xs text-warning">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            Save this secret link now. For your security, the secret key is displayed only once and
            cannot be retrieved later.
          </span>
        </div>
        <UrlCopyRow url={fullUrl} />
        <PromptCopySection prompt={aiPrompt} />
        <div className="flex justify-end pt-4 border-t border-border">
          <Button onClick={onClose}>I Have Saved This Key</Button>
        </div>
      </div>
    </Modal>
  );
};
