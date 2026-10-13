import { Link2, Plus } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui';

export const ShareLinksHeader: FC = () => (
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
        <Link2 className="h-6 w-6" />
      </div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-text">AI Share Links</h1>
        <p className="text-xs sm:text-sm text-text-muted">Generate and govern read-only JSON links for LLM assistants.</p>
      </div>
    </div>
    <Link to="/share/new">
      <Button leftIcon={<Plus className="h-4 w-4" />}>Create Link</Button>
    </Link>
  </div>
);
