import { AlertCircle, Upload } from 'lucide-react';
import type { FC } from 'react';
import { useState } from 'react';

import { ImportDropzone } from './ImportDropzone';
import { ImportModeSelector } from './ImportModeSelector';
import { ImportPreview } from './ImportPreview';
import { useImportFile } from './useImportFile';
import { Button, Modal, useToast } from '../../components/ui';
import { apiClient } from '../../lib/api-client';

interface ImportDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const sendImportRequest = async (mode: 'merge' | 'replace', raw: Record<string, unknown>) => {
  await apiClient<{ success: boolean }>('/api/account/import', {
    method: 'POST',
    data: {
      mode,
      profile: raw.profile || undefined,
      education: raw.education || [],
      experiences: raw.experiences || [],
      projects: raw.projects || [],
      skills: raw.skills || [],
      languages: raw.languages || [],
    },
  });
};

export const ImportDataModal: FC<ImportDataModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { showToast } = useToast();
  const file = useImportFile();
  const [importMode, setImportMode] = useState<'merge' | 'replace'>('merge');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleClose = () => { file.resetState(); onClose(); };

  const handleImport = async () => {
    if (!file.rawPayload) return;
    try {
      setIsSubmitting(true);
      file.setError(null);
      await sendImportRequest(importMode, file.rawPayload);
      showToast('Career data imported successfully!', 'success');
      handleClose();
      onSuccess?.();
    } catch (err: unknown) {
      file.setError(err instanceof Error ? err.message : 'Import failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Import Career Data" description="Upload a JSON backup to restore or append career records." maxWidth="lg">
      <div className="space-y-4">
        <input ref={file.fileInputRef} type="file" accept=".json,application/json" onChange={file.handleFileInput} className="hidden" />
        {!file.parsedData ? (
          <ImportDropzone onFileSelect={file.processFile} fileInputRef={file.fileInputRef} />
        ) : (
          <div className="space-y-3">
            <ImportPreview fileName={file.fileName || 'backup.json'} data={file.parsedData} onClear={file.resetState} />
            <ImportModeSelector mode={importMode} onModeChange={setImportMode} />
          </div>
        )}
        {file.error && (
          <div className="flex items-start gap-2 p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>{file.error}</span>
          </div>
        )}
        <div className="flex items-center justify-end gap-2 pt-2 border-t border-border">
          <Button type="button" variant="ghost" onClick={handleClose} disabled={isSubmitting}>Cancel</Button>
          <Button type="button" variant="primary" onClick={handleImport} disabled={!file.parsedData || isSubmitting} isLoading={isSubmitting} leftIcon={<Upload className="h-4 w-4" />}>
            Import Career Data
          </Button>
        </div>
      </div>
    </Modal>
  );
};
