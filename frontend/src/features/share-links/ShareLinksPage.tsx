import { Link2 } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { KeyRevealModal } from './components/KeyRevealModal';
import { ShareLinkCard } from './components/ShareLinkCard';
import { ShareLinksHeader } from './components/ShareLinksHeader';
import { useShareLinks } from './useShareLinks';
import { EmptyState } from '../../components/ui';

export const ShareLinksPage: FC = () => {
  const { links, regenerateKey, revokeLink, deleteLink } = useShareLinks();
  const [revealedKey, setRevealedKey] = useState<string | null>(null);

  const handleRegenerate = async (id: string) => {
    const res = await regenerateKey({ id });
    if (res?.key) {
      setRevealedKey(res.key);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <ShareLinksHeader />

      {links.length === 0 ? (
        <EmptyState
          icon={<Link2 className="h-6 w-6 text-primary" />}
          title="No share links created yet"
          description="Create named, granular JSON Resume share links for ChatGPT, Claude, and Gemini."
          actionLabel="Create your first link"
          onAction={() => window.location.assign('/share/new')}
        />
      ) : (
        <div className="space-y-3">
          {links.map((link) => (
            <ShareLinkCard
              key={link.id}
              link={link}
              onRegenerate={handleRegenerate}
              onRevoke={revokeLink}
              onDelete={deleteLink}
            />
          ))}
        </div>
      )}

      {revealedKey && (
        <KeyRevealModal
          isOpen={Boolean(revealedKey)}
          onClose={() => setRevealedKey(null)}
          rawKey={revealedKey}
        />
      )}
    </div>
  );
};
