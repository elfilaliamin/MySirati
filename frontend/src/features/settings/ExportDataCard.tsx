import { Download, Upload } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { ImportDataModal } from './ImportDataModal';
import { Button, Card, CardDescription, CardHeader, CardTitle, useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

const downloadJsonFile = (data: unknown) => {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `mysirati-career-data-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

export const ExportDataCard: FC = () => {
  const { showToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const data = await apiClient<unknown>('/api/account/export');
      downloadJsonFile(data);
      showToast('Career data exported successfully', 'success');
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Export failed', 'error');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Data Portability (Export & Import)</CardTitle>
          <CardDescription>
            Download a complete copy of your career records in structured JSON format, or import career data from an existing backup.
          </CardDescription>
        </CardHeader>
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            isLoading={isExporting}
            leftIcon={<Download className="h-4 w-4" />}
          >
            Export Career Data (JSON)
          </Button>
          <Button
            variant="outline"
            onClick={() => setImportModalOpen(true)}
            leftIcon={<Upload className="h-4 w-4" />}
          >
            Import Career Data (JSON)
          </Button>
        </div>
      </Card>

      <ImportDataModal
        isOpen={importModalOpen}
        onClose={() => setImportModalOpen(false)}
      />
    </>
  );
};

