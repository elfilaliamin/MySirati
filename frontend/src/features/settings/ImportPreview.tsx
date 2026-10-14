import {
  BookOpen,
  Briefcase,
  CheckCircle2,
  Code2,
  FileJson,
  FolderGit2,
  Languages,
  User,
  X,
} from 'lucide-react';
import type { FC, ReactNode } from 'react';

import type { ParsedCareerData } from './importUtils';
import { Button } from '../../components/ui';

interface ImportPreviewProps {
  fileName: string;
  data: ParsedCareerData;
  onClear: () => void;
}

const SummaryPill: FC<{ icon: ReactNode; title: string; subtitle: string }> = ({
  icon,
  title,
  subtitle,
}) => (
  <div className="flex items-center gap-2 p-2 rounded-lg bg-surface-raised border border-border/60">
    <div className="text-primary shrink-0">{icon}</div>
    <div className="truncate">
      <p className="font-semibold text-text truncate">{title}</p>
      <p className="text-[11px] text-text-muted">{subtitle}</p>
    </div>
  </div>
);

const FileHeader: FC<{ fileName: string; onClear: () => void }> = ({ fileName, onClear }) => (
  <div className="flex items-center justify-between p-3 rounded-xl bg-surface border border-border">
    <div className="flex items-center gap-2.5 min-w-0">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft text-primary">
        <FileJson className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold text-text truncate">{fileName}</p>
        <p className="text-xs text-emerald-500 flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" /> Valid career backup
        </p>
      </div>
    </div>
    <Button type="button" variant="ghost" size="sm" onClick={onClear} aria-label="Remove file">
      <X className="h-4 w-4" />
    </Button>
  </div>
);

const RecordGrid: FC<{ data: ParsedCareerData }> = ({ data }) => (
  <div className="rounded-xl border border-border bg-surface p-3.5 space-y-2">
    <h5 className="text-xs font-semibold text-text uppercase tracking-wider">Detected Records</h5>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
      {data.profile && (
        <SummaryPill
          icon={<User className="h-4 w-4" />}
          title={data.profile.fullName || 'Profile'}
          subtitle="Personal Info"
        />
      )}
      <SummaryPill
        icon={<Briefcase className="h-4 w-4" />}
        title={String(data.experiences?.length || 0)}
        subtitle="Experiences"
      />
      <SummaryPill
        icon={<BookOpen className="h-4 w-4" />}
        title={String(data.education?.length || 0)}
        subtitle="Education"
      />
      <SummaryPill
        icon={<FolderGit2 className="h-4 w-4" />}
        title={String(data.projects?.length || 0)}
        subtitle="Projects"
      />
      <SummaryPill
        icon={<Code2 className="h-4 w-4" />}
        title={String(data.skills?.length || 0)}
        subtitle="Skills"
      />
      <SummaryPill
        icon={<Languages className="h-4 w-4" />}
        title={String(data.languages?.length || 0)}
        subtitle="Languages"
      />
    </div>
  </div>
);

export const ImportPreview: FC<ImportPreviewProps> = ({ fileName, data, onClear }) => (
  <div className="space-y-3">
    <FileHeader fileName={fileName} onClear={onClear} />
    <RecordGrid data={data} />
  </div>
);
