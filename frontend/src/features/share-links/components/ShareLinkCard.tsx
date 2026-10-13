import { Calendar, Clock } from 'lucide-react';
import type { FC } from 'react';

import { ShareLinkActions } from './ShareLinkActions';
import { Badge, Card } from '../../../components/ui';
import type { ShareLink } from '../share-links.types';

interface ShareLinkCardProps {
  link: ShareLink;
  onRegenerate: (id: string) => void;
  onRevoke: (id: string) => void;
  onDelete: (id: string) => void;
}

const getStatusBadge = (link: ShareLink) => {
  if (link.revokedAt) return <Badge variant="danger">Revoked</Badge>;
  if (link.expiresAt && new Date(link.expiresAt) < new Date()) {
    return <Badge variant="warning">Expired</Badge>;
  }
  return <Badge variant="success">Active</Badge>;
};

export const ShareLinkCard: FC<ShareLinkCardProps> = ({
  link,
  onRegenerate,
  onRevoke,
  onDelete,
}) => (
  <Card className="hover:border-primary/30 transition-colors p-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2 flex-1">
        <div className="flex items-center gap-2.5">
          <h3 className="text-base font-semibold text-text">{link.name}</h3>
          {getStatusBadge(link)}
          <span className="text-xs font-mono text-text-muted">key: {link.keyPrefix}••••</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-text-muted">
          <div className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Created: {new Date(link.createdAt).toLocaleDateString()}</span>
          </div>
          {link.expiresAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              <span>Expires: {new Date(link.expiresAt).toLocaleDateString()}</span>
            </div>
          )}
          {link.lastUsedAt && (
            <span>Last used: {new Date(link.lastUsedAt).toLocaleDateString()}</span>
          )}
        </div>
      </div>
      <ShareLinkActions
        id={link.id}
        isRevoked={Boolean(link.revokedAt)}
        onRegenerate={onRegenerate}
        onRevoke={onRevoke}
        onDelete={onDelete}
      />
    </div>
  </Card>
);
