import type { FC } from 'react';

import { GranularSectionPicker } from './GranularSectionPicker';
import { useSection } from '../../sections/useSections';
import type { ShareLinkIncludeOptions } from '../share-links.types';

interface BuilderSectionPickersProps {
  include: ShareLinkIncludeOptions;
  onChange: (patch: Partial<ShareLinkIncludeOptions>) => void;
}

interface RowProps<T> {
  label: string;
  sectionKey: 'education' | 'experiences' | 'projects' | 'skills' | 'languages';
  isEnabled?: boolean;
  onToggleEnabled: (v: boolean) => void;
  selectedIds: string[];
  onChangeSelectedIds: (ids: string[]) => void;
  formatItem: (item: T) => { id: string; title: string; subtitle?: string };
}

function SectionPickerRow<T extends { id: string }>({
  label,
  sectionKey,
  isEnabled,
  onToggleEnabled,
  selectedIds,
  onChangeSelectedIds,
  formatItem,
}: RowProps<T>) {
  const { items } = useSection<T>(sectionKey);
  return (
    <GranularSectionPicker
      label={label}
      isEnabled={Boolean(isEnabled)}
      onToggleEnabled={onToggleEnabled}
      items={items.map(formatItem)}
      selectedIds={selectedIds}
      onChangeSelectedIds={onChangeSelectedIds}
    />
  );
}

const PrimarySectionPickers: FC<BuilderSectionPickersProps> = ({ include, onChange }) => (
  <>
    <SectionPickerRow<{ id: string; institution: string; degree?: string; type?: string }>
      label="Education"
      sectionKey="education"
      isEnabled={include.education}
      onToggleEnabled={(v) => onChange({ education: v })}
      selectedIds={(include.educationItemIds as string[]) || []}
      onChangeSelectedIds={(ids) => onChange({ educationItemIds: ids })}
      formatItem={(i) => {
        const isNonAcademic = i.type && i.type !== 'academic';
        return {
          id: i.id,
          title: isNonAcademic && i.degree ? i.degree : i.institution,
          subtitle: isNonAcademic && i.degree ? i.institution : i.degree,
        };
      }}
    />
    <SectionPickerRow<{ id: string; company: string; title: string }>
      label="Work Experiences"
      sectionKey="experiences"
      isEnabled={include.experiences}
      onToggleEnabled={(v) => onChange({ experiences: v })}
      selectedIds={(include.experienceItemIds as string[]) || []}
      onChangeSelectedIds={(ids) => onChange({ experienceItemIds: ids })}
      formatItem={(i) => ({ id: i.id, title: i.company, subtitle: i.title })}
    />
    <SectionPickerRow<{ id: string; name: string; role?: string }>
      label="Projects"
      sectionKey="projects"
      isEnabled={include.projects}
      onToggleEnabled={(v) => onChange({ projects: v })}
      selectedIds={(include.projectItemIds as string[]) || []}
      onChangeSelectedIds={(ids) => onChange({ projectItemIds: ids })}
      formatItem={(i) => ({ id: i.id, title: i.name, subtitle: i.role })}
    />
  </>
);

const SecondarySectionPickers: FC<BuilderSectionPickersProps> = ({ include, onChange }) => (
  <>
    <SectionPickerRow<{ id: string; name: string; category?: string }>
      label="Skills"
      sectionKey="skills"
      isEnabled={include.skills}
      onToggleEnabled={(v) => onChange({ skills: v })}
      selectedIds={(include.skillItemIds as string[]) || []}
      onChangeSelectedIds={(ids) => onChange({ skillItemIds: ids })}
      formatItem={(i) => ({ id: i.id, title: i.name, subtitle: i.category })}
    />
    <SectionPickerRow<{ id: string; name: string; proficiency: string }>
      label="Languages"
      sectionKey="languages"
      isEnabled={include.languages}
      onToggleEnabled={(v) => onChange({ languages: v })}
      selectedIds={(include.languageItemIds as string[]) || []}
      onChangeSelectedIds={(ids) => onChange({ languageItemIds: ids })}
      formatItem={(i) => ({ id: i.id, title: i.name, subtitle: i.proficiency })}
    />
  </>
);

export const BuilderSectionPickers: FC<BuilderSectionPickersProps> = ({ include, onChange }) => (
  <div className="space-y-3">
    <PrimarySectionPickers include={include} onChange={onChange} />
    <SecondarySectionPickers include={include} onChange={onChange} />
  </div>
);
