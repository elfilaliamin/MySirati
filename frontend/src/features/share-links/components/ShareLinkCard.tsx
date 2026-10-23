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
  <Card className="hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-card-hover transition-all duration-200 p-4 sm:p-5">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-2 flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2.5">
          <h3 className="text-base font-bold text-text tracking-tight truncate">{link.name}</h3>
          {getStatusBadge(link)}
          <span className="text-xs font-mono bg-surface border border-border px-2 py-0.5 rounded-md text-text-muted select-all">
            key: {link.keyPrefix}••••
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3.5 text-xs text-text-muted">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 text-text-muted/80 shrink-0" />
            <span className="font-mono tabular-nums">Created: {new Date(link.createdAt).toLocaleDateString()}</span>
          </div>
          {link.expiresAt && (
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-text-muted/80 shrink-0" />
              <span className="font-mono tabular-nums">Expires: {new Date(link.expiresAt).toLocaleDateString()}</span>
            </div>
          )}
          {link.lastUsedAt && (
            <span className="font-mono tabular-nums">Last used: {new Date(link.lastUsedAt).toLocaleDateString()}</span>
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
