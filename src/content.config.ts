import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    /** One line a recruiter can read in three seconds. Lead with the outcome. */
    tagline: z.string(),
    /** Short label for the hero pill — a few words, no punctuation. */
    short: z.string().optional(),
    /** Two-word label for the jump-nav above the featured cards. */
    navLabel: z.string().optional(),
    /** Card blurb on the index pages. */
    summary: z.string(),
    /** Doubles as the grouping for the featured-work jump-nav. Order here is
        the order the groups appear on the homepage. */
    category: z.enum([
      'Optimization',
      'Predictive Modelling',
      'Analytics & BI',
      'Agentic AI',
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
