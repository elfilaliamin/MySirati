export interface ShareLinkIncludeOptions {
  basics: boolean;
  email: boolean;
  phone: boolean;
  itemLinks: boolean;
  education: boolean;
  educationItemIds?: string[] | null;
  experiences: boolean;
  experienceItemIds?: string[] | null;
  projects: boolean;
  projectItemIds?: string[] | null;
  skills: boolean;
  skillItemIds?: string[] | null;
  languages: boolean;
  languageItemIds?: string[] | null;
}

export interface ShareLink {
  id: string;
  userId: string;
  name: string;
  keyPrefix: string;
  include: ShareLinkIncludeOptions;
  createdAt: string;
  expiresAt?: string | null;
  revokedAt?: string | null;
  lastUsedAt?: string | null;
}

export interface CreateShareLinkPayload {
  name: string;
  include: ShareLinkIncludeOptions;
  expiresAt?: string | null;
}

export interface CreateShareLinkResponse {
  link: ShareLink;
  key: string;
}

export type LinkStatus = 'active' | 'revoked' | 'expired';
