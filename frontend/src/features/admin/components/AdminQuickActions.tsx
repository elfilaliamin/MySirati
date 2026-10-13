import { ArrowRight, FileText, Users } from 'lucide-react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';

import { Button, Card, CardHeader, CardTitle } from '../../../components/ui';

export const AdminQuickActions: FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <Card className="p-4 space-y-3">
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Users className="h-4 w-4 text-primary" />
          <span>User Moderation Directory</span>
        </CardTitle>
      </CardHeader>
      <p className="text-xs text-text-muted">
        Inspect user career sections, suspend or reactivate accounts, and manage compromised share keys.
      </p>
      <Link to="/admin/users">
        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
          Manage Users
        </Button>
      </Link>
    </Card>

    <Card className="p-4 space-y-3">
      <CardHeader>
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span>Append-Only Audit Trail</span>
        </CardTitle>
      </CardHeader>
      <p className="text-xs text-text-muted">
        Review immutable logs of all administrative inspections, user suspensions, and link revocations.
      </p>
      <Link to="/admin/audit-log">
        <Button variant="outline" size="sm" rightIcon={<ArrowRight className="h-3.5 w-3.5" />}>
          View Audit Logs
        </Button>
      </Link>
    </Card>
  </div>
);
