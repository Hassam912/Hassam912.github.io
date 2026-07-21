import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line a recruiter can read in three seconds. Lead with the outcome. */
    tagline: z.string(),
    /** Card blurb on the index pages. */
    summary: z.string(),
    category: z.enum([
      'Optimization',
      'Machine Learning',
      'Business Intelligence',
      'AI & Automation',
    ]),
    /** Where the work happened — my business, a course, an employer. */
    context: z.string(),
    role: z.string(),
    timeline: z.string(),
    stack: z.array(z.string()),
    /** Big numbers for the at-a-glance strip. Keep to 3. */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
    glance: z.object({
      problem: z.string(),
      approach: z.string(),
      result: z.string(),
    }),
    links: z
      .array(z.object({ label: z.string(), href: z.string() }))
      .default([]),
    featured: z.boolean().default(false),
    /** Lower sorts first. */
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
