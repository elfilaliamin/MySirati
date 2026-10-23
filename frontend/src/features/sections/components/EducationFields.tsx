import { Award, GraduationCap, MonitorPlay, Terminal } from 'lucide-react';
import type { FC } from 'react';

import { DateRangeFields } from './DateRangeFields';
import { Input } from '../../../components/ui';
import type { EducationType } from '../sections.types';

interface EducationFieldsProps {
  type: EducationType;
  setType: (v: EducationType) => void;
  institution: string;
  setInstitution: (v: string) => void;
  degree: string;
  setDegree: (v: string) => void;
  fieldOfStudy: string;
  setFieldOfStudy: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  isCurrent: boolean;
  setIsCurrent: (v: boolean) => void;
  description: string;
  setDescription: (v: string) => void;
}

const TYPE_CONFIG = {
  academic: {
    label: 'Academic Degree',
    shortLabel: 'Degree',
    icon: GraduationCap,
    institutionLabel: 'Institution / University',
    institutionPlaceholder: 'e.g. Technical University of Munich, Stanford',
    degreeLabel: 'Degree / Qualification',
    degreePlaceholder: 'e.g. B.Sc. in Computer Science, M.Sc., High School',
    fieldLabel: 'Field of Study / Major',
    fieldPlaceholder: 'e.g. Computer Science, Mechanical Engineering',
    currentLabel: 'Currently studying here',
    descriptionPlaceholder: 'Honors, thesis, coursework, academic societies...',
  },
  course: {
    label: 'Online Course',
    shortLabel: 'Course',
    icon: MonitorPlay,
    institutionLabel: 'Platform / Academy',
    institutionPlaceholder: 'e.g. Udemy, Coursera, edX, Frontend Masters',
    degreeLabel: 'Course Title',
    degreePlaceholder: 'e.g. React - The Complete Guide (incl Hooks & Next.js)',
    fieldLabel: 'Topic / Specialization',
    fieldPlaceholder: 'e.g. Web Development, Deep Learning, Cloud Architecture',
    currentLabel: 'Currently taking this course / In progress',
    descriptionPlaceholder: 'Key skills learned, instructor name, hands-on projects, hours...',
  },
  bootcamp: {
    label: 'Bootcamp',
    shortLabel: 'Bootcamp',
    icon: Terminal,
    institutionLabel: 'Bootcamp / Academy',
    institutionPlaceholder: 'e.g. Le Wagon, General Assembly, Springboard',
    degreeLabel: 'Program / Track',
    degreePlaceholder: 'e.g. Full-Stack Web Development, Data Science Bootcamp',
    fieldLabel: 'Focus / Tech Stack',
    fieldPlaceholder: 'e.g. React, Node.js, PostgreSQL, Docker',
    currentLabel: 'Currently enrolled / In progress',
    descriptionPlaceholder: 'Intensive curriculum covered, final capstone project...',
  },
  certificate: {
    label: 'Certification',
    shortLabel: 'Certificate',
    icon: Award,
    institutionLabel: 'Issuing Organization',
    institutionPlaceholder: 'e.g. Amazon Web Services, Google Cloud, CompTIA',
    degreeLabel: 'Certificate Name',
    degreePlaceholder: 'e.g. AWS Certified Solutions Architect - Associate',
    fieldLabel: 'Domain / Specialization',
    fieldPlaceholder: 'e.g. Cloud Infrastructure, Security, DevOps',
    currentLabel: 'In progress / preparing for exam',
    descriptionPlaceholder: 'Skills validated, credential ID, score or renewal date...',
  },
} as const;

const EducationTypeSelector: FC<{
  type: EducationType;
  setType: (type: EducationType) => void;
}> = ({ type, setType }) => (
  <div className="flex flex-col gap-1.5 text-start w-full">
    <label className="text-xs font-semibold text-text">Education Category</label>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
      {(Object.keys(TYPE_CONFIG) as EducationType[]).map((key) => {
        const item = TYPE_CONFIG[key];
        const Icon = item.icon;
        const isSelected = type === key;

        return (
          <button
            key={key}
            type="button"
            onClick={() => setType(key)}
            className={`flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-semibold transition-all ${
              isSelected
                ? 'border-primary bg-primary-soft text-primary shadow-sm shadow-primary/10 ring-1 ring-primary/30'
                : 'border-border bg-surface-raised text-text-muted hover:border-text-muted/40 hover:text-text'
            }`}
          >
            <Icon className={`h-4 w-4 shrink-0 ${isSelected ? 'text-primary' : 'text-text-muted'}`} />
            <span>{item.shortLabel}</span>
          </button>
        );
      })}
    </div>
  </div>
);

const EducationDegreeFields: FC<{
  degree: string;
  setDegree: (val: string) => void;
  fieldOfStudy: string;
  setFieldOfStudy: (val: string) => void;
  degreeLabel: string;
  degreePlaceholder: string;
  fieldLabel: string;
  fieldPlaceholder: string;
}> = ({
  degree,
  setDegree,
  fieldOfStudy,
  setFieldOfStudy,
  degreeLabel,
  degreePlaceholder,
  fieldLabel,
  fieldPlaceholder,
}) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
    <Input
      label={degreeLabel}
      placeholder={degreePlaceholder}
      value={degree}
      onChange={(e) => setDegree(e.target.value)}
    />
    <Input
      label={fieldLabel}
      placeholder={fieldPlaceholder}
      value={fieldOfStudy}
      onChange={(e) => setFieldOfStudy(e.target.value)}
    />
  </div>
);

const EducationDescriptionField: FC<{
  description: string;
  setDescription: (val: string) => void;
  placeholder?: string;
}> = ({ description, setDescription, placeholder }) => (
  <div className="flex flex-col gap-1.5 text-start w-full">
    <label className="text-xs font-semibold text-text">Description & Highlights</label>
    <textarea
      rows={3}
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-surface-raised px-3.5 py-2.5 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
    />
  </div>
);

export const EducationFields: FC<EducationFieldsProps> = (props) => {
  const { type, setType, institution, setInstitution } = props;
  const currentConfig = TYPE_CONFIG[type] || TYPE_CONFIG.academic;

  return (
    <>
      <EducationTypeSelector type={type} setType={setType} />

      <Input
        label={currentConfig.institutionLabel}
        required
        placeholder={currentConfig.institutionPlaceholder}
        value={institution}
        onChange={(e) => setInstitution(e.target.value)}
      />

      <EducationDegreeFields
        degree={props.degree}
        setDegree={props.setDegree}
        fieldOfStudy={props.fieldOfStudy}
        setFieldOfStudy={props.setFieldOfStudy}
        degreeLabel={currentConfig.degreeLabel}
        degreePlaceholder={currentConfig.degreePlaceholder}
        fieldLabel={currentConfig.fieldLabel}
        fieldPlaceholder={currentConfig.fieldPlaceholder}
      />

      <DateRangeFields
        startDate={props.startDate}
        setStartDate={props.setStartDate}
        endDate={props.endDate}
        setEndDate={props.setEndDate}
        isCurrent={props.isCurrent}
        setIsCurrent={props.setIsCurrent}
        currentLabel={currentConfig.currentLabel}
      />

      <EducationDescriptionField
        description={props.description}
        setDescription={props.setDescription}
        placeholder={currentConfig.descriptionPlaceholder}
      />
    </>
  );
};
