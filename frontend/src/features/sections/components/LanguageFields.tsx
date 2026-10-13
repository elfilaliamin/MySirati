import type { FC } from 'react';

import { Input, Select } from '../../../components/ui';

interface LanguageFieldsProps {
  name: string;
  setName: (v: string) => void;
  proficiency: string;
  setProficiency: (v: string) => void;
}

const PROFICIENCY_OPTIONS = [
  { value: 'Native / Bilingual', label: 'Native / Bilingual' },
  { value: 'Full Professional', label: 'Full Professional' },
  { value: 'Professional Working', label: 'Professional Working' },
  { value: 'Limited Working', label: 'Limited Working' },
  { value: 'Elementary', label: 'Elementary' },
];

export const LanguageFields: FC<LanguageFieldsProps> = ({
  name,
  setName,
  proficiency,
  setProficiency,
}) => (
  <>
    <Input
      label="Language"
      required
      placeholder="e.g. English, Arabic, French"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <Select
      label="Proficiency"
      options={PROFICIENCY_OPTIONS}
      value={proficiency}
      onChange={(e) => setProficiency(e.target.value)}
    />
  </>
);
