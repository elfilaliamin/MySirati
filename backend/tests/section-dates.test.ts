import assert from 'node:assert';
import test, { describe } from 'node:test';

import {
  educationInputSchema,
  experienceInputSchema,
  projectInputSchema,
} from '../src/sections/sections.schema.js';

describe('Section Date Validation & Clearing', () => {
  test('educationInputSchema permits clearing dates with empty strings or null', () => {
    const parsedWithEmpty = educationInputSchema.parse({
      type: 'course',
      institution: 'Udemy',
      startDate: '',
      endDate: '',
    });
    assert.strictEqual(parsedWithEmpty.startDate, null);
    assert.strictEqual(parsedWithEmpty.endDate, null);

    const parsedWithNull = educationInputSchema.parse({
      type: 'course',
      institution: 'Udemy',
      startDate: null,
      endDate: null,
    });
    assert.strictEqual(parsedWithNull.startDate, null);
    assert.strictEqual(parsedWithNull.endDate, null);

    const parsedValid = educationInputSchema.parse({
      type: 'course',
      institution: 'Udemy',
      startDate: '2023-01-15',
      endDate: '2023-06-30',
    });
    assert.strictEqual(parsedValid.startDate, '2023-01-15');
    assert.strictEqual(parsedValid.endDate, '2023-06-30');

    assert.throws(
      () =>
        educationInputSchema.parse({
          type: 'course',
          institution: 'Udemy',
          startDate: 'invalid-date',
        }),
      /Date format must be YYYY-MM-DD/
    );
  });

  test('experienceInputSchema permits clearing dates with empty strings or null', () => {
    const parsedWithEmpty = experienceInputSchema.parse({
      company: 'Tech Corp',
      title: 'Software Engineer',
      startDate: '',
      endDate: '',
    });
    assert.strictEqual(parsedWithEmpty.startDate, null);
    assert.strictEqual(parsedWithEmpty.endDate, null);

    assert.throws(
      () =>
        experienceInputSchema.parse({
          company: 'Tech Corp',
          title: 'Software Engineer',
          startDate: 'not-a-date',
        }),
      /Date format must be YYYY-MM-DD/
    );
  });

  test('projectInputSchema permits clearing dates with empty strings or null', () => {
    const parsedWithEmpty = projectInputSchema.parse({
      name: 'Portfolio App',
      startDate: '',
      endDate: '',
    });
    assert.strictEqual(parsedWithEmpty.startDate, null);
    assert.strictEqual(parsedWithEmpty.endDate, null);

    assert.throws(
      () =>
        projectInputSchema.parse({
          name: 'Portfolio App',
          endDate: 'bad-date',
        }),
      /Date format must be YYYY-MM-DD/
    );
  });
});
