import { CheckCircle2, ChevronRight, Circle } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Card, CardDescription, CardHeader, CardTitle } from '../../components/ui';

interface ChecklistItem {
  label: string;
  isComplete: boolean;
  to: string;
}

interface CompletenessProps {
  score: number;
  items: ChecklistItem[];
}

export const ProfileCompletenessCard: FC<CompletenessProps> = ({ score, items }) => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <CardTitle>Profile Completeness</CardTitle>
        <span className="text-xl font-bold text-primary">{score}%</span>
      </div>
      <CardDescription>A complete profile produces superior matches when queried by AI assistants.</CardDescription>
    </CardHeader>

    <div className="w-full bg-surface rounded-full h-2.5 mb-6 overflow-hidden border border-border">
      <div
        className="bg-primary h-2.5 rounded-full transition-all duration-500"
        style={{ width: `${score}%` }}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="flex items-center justify-between p-2.5 rounded-xl border border-border bg-surface hover:bg-surface-raised transition-colors"
        >
          <div className="flex items-center gap-2">
            {item.isComplete ? (
              <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-text-muted shrink-0" />
            )}
            <span className={item.isComplete ? 'font-medium text-text' : 'text-text-muted'}>
              {item.label}
            </span>
          </div>
          <ChevronRight className="h-3.5 w-3.5 text-text-muted" />
        </Link>
      ))}
    </div>
  </Card>
);
