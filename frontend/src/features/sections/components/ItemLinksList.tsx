import { ExternalLink } from 'lucide-react';
import type { FC } from 'react';

import type { ResourceLink } from '../sections.types';

export const ItemLinksList: FC<{ links?: ResourceLink[] }> = ({ links }) => {
  if (!links || links.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 pt-2">
      {links.map((link, idx) => (
        <a
          key={idx}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
        >
          <ExternalLink className="h-3 w-3" />
          <span>{link.label}</span>
        </a>
      ))}
    </div>
  );
};
