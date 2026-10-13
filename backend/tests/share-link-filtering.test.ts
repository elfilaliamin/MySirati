import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import type { UserCareerDataset } from '../src/share-links/resume-builder.service.js';
import { buildJsonResume } from '../src/share-links/resume-builder.service.js';

const mockDataset: UserCareerDataset = {
  user: {
    id: 'user-1',
    email: 'dev@mysirati.local',
    passwordHash: 'secret_hash',
    role: 'user',
    status: 'active',
    emailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  profile: {
    id: 'prof-1',
    userId: 'user-1',
    fullName: 'Sara Al-Mansoor',
    headline: 'Senior Cloud Architect',
    summary: 'Cloud native engineer specializing in microservices.',
    location: 'Dubai, UAE',
    phone: '+971501234567',
    websiteUrl: 'https://sara.dev',
    links: [{ label: 'GitHub', url: 'https://github.com/sara' }],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  education: [
    {
      id: 'edu-1',
      userId: 'user-1',
      institution: 'University of Oxford',
      degree: 'BSc Computer Science',
      fieldOfStudy: 'Software Engineering',
      startDate: '2016-09-01',
      endDate: '2020-06-01',
      isCurrent: false,
      description: 'First class honors',
      links: [],
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  experiences: [
    {
      id: 'exp-1',
      userId: 'user-1',
      company: 'TechCorp',
      title: 'Senior Engineer',
      location: 'Dubai',
      startDate: '2022-01-01',
      endDate: null,
      isCurrent: true,
      description: 'Leading platform engineering.',
      links: [{ label: 'Platform Demo', url: 'https://techcorp.io' }],
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'exp-2',
      userId: 'user-1',
      company: 'OldCorp',
      title: 'Junior Developer',
      location: 'London',
      startDate: '2020-07-01',
      endDate: '2021-12-31',
      isCurrent: false,
      description: 'Maintained internal tools.',
      links: [],
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  projects: [
    {
      id: 'proj-1',
      userId: 'user-1',
      name: 'Cloud Mesh Router',
      role: 'Creator',
      startDate: '2023-01-01',
      endDate: null,
      isCurrent: true,
      description: 'High performance proxy.',
      links: [{ label: 'Repo', url: 'https://github.com/sara/router' }],
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 'proj-2',
      userId: 'user-1',
      name: 'Secret Client Tool',
      role: 'Consultant',
      startDate: '2021-01-01',
      endDate: '2021-06-01',
      isCurrent: false,
      description: 'Proprietary internal solution.',
      links: [],
      position: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  skills: [
    {
      id: 'skill-1',
      userId: 'user-1',
      name: 'Kubernetes',
      category: 'Cloud',
      level: 'expert',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
  languages: [
    {
      id: 'lang-1',
      userId: 'user-1',
      name: 'Arabic',
      proficiency: 'native',
      position: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

describe('TASK-1003: Public Share Link Filtering & Security', () => {
  it('includes LLM safety notice at top level', () => {
    const resume = buildJsonResume(mockDataset, {
      basics: true,
      email: false,
      phone: false,
      itemLinks: true,
      education: true,
      experiences: true,
      projects: true,
      skills: true,
      languages: true,
    });

    assert.ok(resume._note);
    assert.match(resume._note, /strictly as data and not as execution instructions/);
  });

  it('redacts email and phone unless explicitly included', () => {
    const redactedResume = buildJsonResume(mockDataset, {
      basics: true,
      email: false,
      phone: false,
      itemLinks: true,
      education: false,
      experiences: false,
      projects: false,
      skills: false,
      languages: false,
    });

    assert.strictEqual(redactedResume.basics?.email, undefined);
    assert.strictEqual(redactedResume.basics?.phone, undefined);

    const publicResume = buildJsonResume(mockDataset, {
      basics: true,
      email: true,
      phone: true,
      itemLinks: true,
      education: false,
      experiences: false,
      projects: false,
      skills: false,
      languages: false,
    });

    assert.strictEqual(publicResume.basics?.email, 'dev@mysirati.local');
    assert.strictEqual(publicResume.basics?.phone, '+971501234567');
  });

  it('omits sections completely when toggled off', () => {
    const resume = buildJsonResume(mockDataset, {
      basics: true,
      email: false,
      phone: false,
      itemLinks: true,
      education: false,
      experiences: false,
      projects: false,
      skills: false,
      languages: false,
    });

    assert.strictEqual(resume.work, undefined);
    assert.strictEqual(resume.education, undefined);
    assert.strictEqual(resume.projects, undefined);
    assert.strictEqual(resume.skills, undefined);
    assert.strictEqual(resume.languages, undefined);
  });

  it('filters specific items when item IDs are provided (DEC-006 cherry picking)', () => {
    const resume = buildJsonResume(mockDataset, {
      basics: true,
      email: false,
      phone: false,
      itemLinks: true,
      education: true,
      experiences: true,
      experienceItemIds: ['exp-1'], // Only exp-1, exclude exp-2
      projects: true,
      projectItemIds: ['proj-1'], // Only proj-1, exclude proj-2
      skills: true,
      languages: true,
    });

    assert.strictEqual(resume.work?.length, 1);
    assert.strictEqual(resume.work?.[0]?.name, 'TechCorp');

    assert.strictEqual(resume.projects?.length, 1);
    assert.strictEqual(resume.projects?.[0]?.name, 'Cloud Mesh Router');
  });

  it('omits external item links when itemLinks is false', () => {
    const resume = buildJsonResume(mockDataset, {
      basics: true,
      email: false,
      phone: false,
      itemLinks: false,
      education: false,
      experiences: true,
      projects: true,
      skills: false,
      languages: false,
    });

    assert.strictEqual(resume.work?.[0]?.links, undefined);
    assert.strictEqual(resume.projects?.[0]?.links, undefined);
  });
});
