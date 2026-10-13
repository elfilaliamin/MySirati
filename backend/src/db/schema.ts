import type { InferInsertModel, InferSelectModel } from 'drizzle-orm';
import {
  boolean,
  date,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

// ---------------------------------------------------------------------------
// Enums
// ---------------------------------------------------------------------------
export const userRoleEnum = pgEnum('user_role', ['user', 'admin']);
export const userStatusEnum = pgEnum('user_status', ['active', 'suspended']);

// ---------------------------------------------------------------------------
// Shared Types
// ---------------------------------------------------------------------------
export interface ResourceLink {
  readonly label: string;
  readonly url: string;
}

export interface ShareLinkIncludeOptions {
  readonly basics: boolean;
  readonly email: boolean;
  readonly phone: boolean;
  readonly itemLinks: boolean;
  readonly education: boolean;
  readonly educationItemIds?: readonly string[] | null;
  readonly experiences: boolean;
  readonly experienceItemIds?: readonly string[] | null;
  readonly projects: boolean;
  readonly projectItemIds?: readonly string[] | null;
  readonly skills: boolean;
  readonly skillItemIds?: readonly string[] | null;
  readonly languages: boolean;
  readonly languageItemIds?: readonly string[] | null;
}

// ---------------------------------------------------------------------------
// 1. Users Table
// ---------------------------------------------------------------------------
export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 255 }).notNull(),
  role: userRoleEnum('role').default('user').notNull(),
  status: userStatusEnum('status').default('active').notNull(),
  emailVerified: boolean('email_verified').default(false).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 2. Profiles Table
// ---------------------------------------------------------------------------
export const profilesTable = pgTable('profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .unique()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  fullName: varchar('full_name', { length: 150 }).notNull(),
  headline: varchar('headline', { length: 200 }),
  summary: text('summary'),
  location: varchar('location', { length: 150 }),
  phone: varchar('phone', { length: 50 }),
  websiteUrl: varchar('website_url', { length: 255 }),
  links: jsonb('links').$type<readonly ResourceLink[]>().default([]).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 3. Education Table
// ---------------------------------------------------------------------------
export const educationTable = pgTable('education', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  institution: varchar('institution', { length: 200 }).notNull(),
  degree: varchar('degree', { length: 150 }),
  fieldOfStudy: varchar('field_of_study', { length: 150 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  isCurrent: boolean('is_current').default(false).notNull(),
  description: text('description'),
  links: jsonb('links').$type<readonly ResourceLink[]>().default([]).notNull(),
  position: integer('position').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 4. Experiences Table
// ---------------------------------------------------------------------------
export const experiencesTable = pgTable('experiences', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  company: varchar('company', { length: 200 }).notNull(),
  title: varchar('title', { length: 150 }).notNull(),
  location: varchar('location', { length: 150 }),
  startDate: date('start_date'),
  endDate: date('end_date'),
  isCurrent: boolean('is_current').default(false).notNull(),
  description: text('description'),
  links: jsonb('links').$type<readonly ResourceLink[]>().default([]).notNull(),
  position: integer('position').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 5. Projects Table
// ---------------------------------------------------------------------------
export const projectsTable = pgTable('projects', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 200 }).notNull(),
  role: varchar('role', { length: 150 }),
  description: text('description'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  links: jsonb('links').$type<readonly ResourceLink[]>().default([]).notNull(),
  position: integer('position').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 6. Skills Table
// ---------------------------------------------------------------------------
export const skillsTable = pgTable('skills', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  level: varchar('level', { length: 50 }),
  category: varchar('category', { length: 100 }),
  links: jsonb('links').$type<readonly ResourceLink[]>().default([]).notNull(),
  position: integer('position').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 7. Languages Table
// ---------------------------------------------------------------------------
export const languagesTable = pgTable('languages', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 100 }).notNull(),
  proficiency: varchar('proficiency', { length: 100 }).notNull(),
  position: integer('position').default(0).notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// 8. Share Links Table
// ---------------------------------------------------------------------------
export const shareLinksTable = pgTable('share_links', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 60 }).notNull(),
  keyHash: varchar('key_hash', { length: 64 }).notNull().unique(),
  keyPrefix: varchar('key_prefix', { length: 6 }).notNull(),
  include: jsonb('include').$type<ShareLinkIncludeOptions>().notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
  expiresAt: timestamp('expires_at', { withTimezone: true }),
  revokedAt: timestamp('revoked_at', { withTimezone: true }),
  lastUsedAt: timestamp('last_used_at', { withTimezone: true }),
});

// ---------------------------------------------------------------------------
// 9. Admin Audit Log Table (Append-Only)
// ---------------------------------------------------------------------------
export const adminAuditLogTable = pgTable('admin_audit_log', {
  id: uuid('id').primaryKey().defaultRandom(),
  adminId: uuid('admin_id')
    .notNull()
    .references(() => usersTable.id),
  action: varchar('action', { length: 100 }).notNull(),
  targetUserId: uuid('target_user_id'),
  targetType: varchar('target_type', { length: 50 }).notNull(),
  targetId: varchar('target_id', { length: 100 }),
  metadata: jsonb('metadata').$type<Record<string, unknown>>().default({}).notNull(),
  ip: varchar('ip', { length: 45 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow().notNull(),
});

// ---------------------------------------------------------------------------
// Inferred TypeScript Model Types
// ---------------------------------------------------------------------------
export type User = InferSelectModel<typeof usersTable>;
export type NewUser = InferInsertModel<typeof usersTable>;

export type Profile = InferSelectModel<typeof profilesTable>;
export type NewProfile = InferInsertModel<typeof profilesTable>;

export type Education = InferSelectModel<typeof educationTable>;
export type NewEducation = InferInsertModel<typeof educationTable>;

export type Experience = InferSelectModel<typeof experiencesTable>;
export type NewExperience = InferInsertModel<typeof experiencesTable>;

export type Project = InferSelectModel<typeof projectsTable>;
export type NewProject = InferInsertModel<typeof projectsTable>;

export type Skill = InferSelectModel<typeof skillsTable>;
export type NewSkill = InferInsertModel<typeof skillsTable>;

export type Language = InferSelectModel<typeof languagesTable>;
export type NewLanguage = InferInsertModel<typeof languagesTable>;

export type ShareLink = InferSelectModel<typeof shareLinksTable>;
export type NewShareLink = InferInsertModel<typeof shareLinksTable>;

export type AdminAuditLog = InferSelectModel<typeof adminAuditLogTable>;
export type NewAdminAuditLog = InferInsertModel<typeof adminAuditLogTable>;
