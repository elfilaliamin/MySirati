import { AlertTriangle, Check, Copy } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, Modal } from '../../../components/ui';

interface KeyRevealModalProps {
  isOpen: boolean;
  onClose: () => void;
  rawKey: string;
}

export const KeyRevealModal: FC<KeyRevealModalProps> = ({ isOpen, onClose, rawKey }) => {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const fullUrl = `${window.location.origin}/api/p?key=${rawKey}`;
  const aiPrompt = `Here is my structured, verified career resume JSON provided via MySirati: ${fullUrl}. Please analyze this data and match it against the following job opportunity:\n\n[Paste Job Description Here]`;

  const copyText = async (text: string, isPrompt: boolean) => {
    await navigator.clipboard.writeText(text);
    if (isPrompt) {
      setCopiedPrompt(true);
      setTimeout(() => setCopiedPrompt(false), 2000);
    } else {
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Link Created" maxWidth="lg">
      <div className="space-y-5 text-left">
        <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3 flex items-start gap-2.5 text-xs text-amber-600 dark:text-amber-400">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <span>Save this secret link now. For your security, the secret key is displayed only once and cannot be retrieved later.</span>
        </div>

        <div>
          <label className="text-xs font-semibold text-text block mb-1.5">Direct AI Endpoint URL</label>
          <div className="flex items-center gap-2">
            <input readOnly value={fullUrl} className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-xs font-mono text-text select-all" />
            <Button size="sm" onClick={() => copyText(fullUrl, false)} leftIcon={copiedUrl ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}>
              {copiedUrl ? 'Copied' : 'Copy'}
            </Button>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-text block mb-1.5">Ready-Made Prompt for ChatGPT, Claude & Gemini</label>
          <div className="rounded-xl border border-border bg-surface p-3 text-xs text-text-muted leading-relaxed whitespace-pre-wrap font-sans">
            {aiPrompt}
          </div>
          <div className="mt-2 flex justify-end">
            <Button size="sm" variant="secondary" onClick={() => copyText(aiPrompt, true)} leftIcon={copiedPrompt ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}>
              {copiedPrompt ? 'Prompt Copied' : 'Copy AI Prompt'}
            </Button>
          </div>
        </div>

        <div className="flex justify-end pt-3 border-t border-border">
          <Button onClick={onClose}>I Have Saved This Key</Button>
        </div>
      </div>
    </Modal>
  );
};
