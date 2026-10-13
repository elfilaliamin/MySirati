import { Construction } from 'lucide-react';
import type { FC } from 'react';

import { Card, CardDescription, CardHeader, CardTitle } from '../ui';

export const PlaceholderPage: FC<{ title: string; phase: string }> = ({ title, phase }) => (
  <div className="max-w-xl mx-auto py-12">
    <Card className="text-center">
      <CardHeader>
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-soft text-primary">
          <Construction className="h-6 w-6" />
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Scheduled for implementation in {phase}</CardDescription>
      </CardHeader>
    </Card>
  </div>
);
