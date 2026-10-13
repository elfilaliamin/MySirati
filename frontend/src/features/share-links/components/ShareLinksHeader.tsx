import { Link2, Plus } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button } from '../../../components/ui';

export const ShareLinksHeader: FC = () => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-sm">
        <Link2 className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-text">AI Share Links</h1>
        <p className="text-xs sm:text-sm text-text-muted">Generate and govern read-only JSON links for LLM assistants.</p>
      </div>
    </div>
    <Link to="/share/new" className="w-full sm:w-auto">
      <Button className="w-full sm:w-auto" leftIcon={<Plus className="h-4 w-4" />}>Create Link</Button>
    </Link>
  </div>
);
