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
        <span className="text-xl sm:text-2xl font-extrabold text-primary font-mono tabular-nums">{score}%</span>
      </div>
      <CardDescription>A complete profile produces superior matches when queried by AI assistants.</CardDescription>
    </CardHeader>

    <div className="w-full bg-surface rounded-full h-3 mb-6 overflow-hidden border border-border p-0.5 shadow-subtle">
      <div
        className="bg-primary h-full rounded-full transition-all duration-700 shadow-sm"
        style={{ width: `${score}%` }}
      />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
      {items.map((item) => (
        <Link
          key={item.label}
          to={item.to}
          className="group flex items-center justify-between p-3 rounded-xl border border-border bg-surface hover:bg-surface-raised hover:border-primary/40 transition-all duration-150 shadow-subtle"
        >
          <div className="flex items-center gap-2.5">
            {item.isComplete ? (
              <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
            ) : (
              <Circle className="h-4 w-4 text-text-muted shrink-0" />
            )}
            <span className={item.isComplete ? 'font-semibold text-text' : 'text-text-muted'}>
              {item.label}
            </span>
          </div>
          <ChevronRight className="h-4 w-4 text-text-muted group-hover:text-primary group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5 transition-all" />
        </Link>
      ))}
    </div>
  </Card>
);
