import { Sparkles } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card } from '../../components/ui';

export const DashboardCta: FC = () => (
  <Card className="bg-gradient-to-r from-primary/10 via-surface-raised to-primary/5 border-primary/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
    <div className="space-y-1 text-center sm:text-left">
      <div className="flex items-center justify-center sm:justify-start gap-2">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="text-base font-semibold text-text">Ready to share your CV with an AI?</h3>
      </div>
      <p className="text-xs sm:text-sm text-text-muted">
        Create tailored share links with granular item selection and one-click AI prompts.
      </p>
    </div>
    <Link to="/share">
      <Button size="sm" variant="primary">Create AI Share Link</Button>
    </Link>
  </Card>
);
