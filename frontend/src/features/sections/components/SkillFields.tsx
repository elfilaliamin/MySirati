import type { FC } from 'react';

import { Input, Select } from '../../../components/ui';

interface SkillFieldsProps {
  name: string;
  setName: (v: string) => void;
  level: string;
  setLevel: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
}

const LEVEL_OPTIONS = [
  { value: '', label: 'Select level (Optional)' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
  { value: 'Expert', label: 'Expert' },
];

export const SkillFields: FC<SkillFieldsProps> = ({
  name,
  setName,
  level,
  setLevel,
  category,
  setCategory,
}) => (
  <>
    <Input
      label="Skill Name"
      required
      placeholder="e.g. TypeScript"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <Select
        label="Proficiency Level"
        options={LEVEL_OPTIONS}
        value={level}
        onChange={(e) => setLevel(e.target.value)}
      />
      <Input
        label="Category"
        placeholder="e.g. Languages, Cloud"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
    </div>
  </>
);
