export interface ResourceLink {
  label: string;
  url: string;
}

export interface Profile {
  id: string;
  userId: string;
  fullName: string;
  headline?: string | null;
  summary?: string | null;
  location?: string | null;
  phone?: string | null;
  websiteUrl?: string | null;
  links: ResourceLink[];
  updatedAt?: string;
}

export interface EducationItem {
  id: string;
  institution: string;
  degree?: string | null;
  fieldOfStudy?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  links: ResourceLink[];
  position: number;
}

export interface ExperienceItem {
  id: string;
  company: string;
  title: string;
  location?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  isCurrent: boolean;
  description?: string | null;
  links: ResourceLink[];
  position: number;
}

export interface ProjectItem {
  id: string;
  name: string;
  role?: string | null;
  description?: string | null;
  startDate?: string | null;
  endDate?: string | null;
  links: ResourceLink[];
  position: number;
}

export interface SkillItem {
  id: string;
  name: string;
  level?: string | null;
  category?: string | null;
  links: ResourceLink[];
  position: number;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: string;
  position: number;
}

export type SectionType = 'education' | 'experiences' | 'projects' | 'skills' | 'languages';
