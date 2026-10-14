import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { importAccountSchema } from '../src/account/account.schema.js';

describe('Account Data Import Schema Validation', () => {
  it('parses valid exported career data payload', () => {
    const rawExport = {
      mode: 'merge',
      profile: {
        fullName: 'Jane Doe',
        headline: 'Senior Full Stack Engineer',
        summary: 'Experienced web developer',
        location: 'Rabat, Morocco',
        phone: '+212600000000',
        websiteUrl: 'https://janedoe.dev',
        links: [{ label: 'GitHub', url: 'https://github.com/janedoe' }],
      },
      education: [
        {
          type: 'academic',
          institution: 'ENSIAS',
          degree: 'Software Engineering',
          startDate: '2019-09-01',
          endDate: '2022-06-30',
          isCurrent: false,
          description: 'Specialized in distributed systems',
          links: [],
        },
      ],
      experiences: [
        {
          company: 'TechCorp',
          title: 'Senior Developer',
          location: 'Casablanca, Morocco',
          startDate: '2022-07-01',
          isCurrent: true,
          description: 'Architecting scalable cloud applications',
          links: [],
        },
      ],
      projects: [
        {
          name: 'MySirati Platform',
          role: 'Lead Architect',
          description: 'Career intelligence and resume sharing engine',
          startDate: '2023-01-01',
          links: [{ label: 'Source', url: 'https://github.com/janedoe/mysirati' }],
        },
      ],
      skills: [
        { name: 'TypeScript', level: 'Expert', category: 'Language' },
        { name: 'React', level: 'Advanced', category: 'Frontend' },
      ],
      languages: [
        { name: 'English', proficiency: 'Fluent' },
        { name: 'Arabic', proficiency: 'Native' },
      ],
    };

    const parsed = importAccountSchema.parse(rawExport);

    assert.strictEqual(parsed.mode, 'merge');
    assert.strictEqual(parsed.profile?.fullName, 'Jane Doe');
    assert.strictEqual(parsed.education?.length, 1);
    assert.strictEqual(parsed.experiences?.length, 1);
    assert.strictEqual(parsed.projects?.length, 1);
    assert.strictEqual(parsed.skills?.length, 2);
    assert.strictEqual(parsed.languages?.length, 2);
  });

  it('normalizes partial dates gracefully (e.g. YYYY and YYYY-MM)', () => {
    const partialDatesData = {
      education: [
        {
          institution: 'Bootcamp Academy',
          startDate: '2021',
          endDate: '2021-08',
        },
      ],
    };

    const parsed = importAccountSchema.parse(partialDatesData);

    assert.strictEqual(parsed.education?.[0]?.startDate, '2021-01-01');
    assert.strictEqual(parsed.education?.[0]?.endDate, '2021-08-01');
  });

  it('defaults to merge mode when not explicitly supplied', () => {
    const data = {
      skills: [{ name: 'Node.js' }],
    };

    const parsed = importAccountSchema.parse(data);
    assert.strictEqual(parsed.mode, 'merge');
  });
});
