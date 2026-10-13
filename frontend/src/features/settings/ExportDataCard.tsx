import { Download } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { Button, Card, CardDescription, CardHeader, CardTitle, useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

export const ExportDataCard: FC = () => {
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = await apiClient<unknown>('/api/account/export');
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mysirati-career-data-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('Career data exported successfully', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Export failed', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Portability & Export</CardTitle>
        <CardDescription>
          Download a complete copy of all your career profiles, sections, and items in structured JSON format.
        </CardDescription>
      </CardHeader>
      <Button variant="outline" onClick={handleExport} isLoading={isExporting} leftIcon={<Download className="h-4 w-4" />}>
        Export Career Data (JSON)
      </Button>
    </Card>
  );
};
