import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    /** Outcome title: verb + result + method/context, ≤ 70 characters. */
    title: z.string(),
    /** One-line card summary, ≤ 20 words. */
    tagline: z.string(),
    /** 25–35 words: problem → what I did → result vs baseline → so-what. Shown under the title. */
    tldr: z.string(),
    /** Meta description for search and link previews, ~155 characters. */
    summary: z.string(),
    category: z.enum(['Optimization', 'Predictive Modelling', 'Analytics & BI', 'Agentic AI']),
    /** Where the work happened: employer, course, competition, my business. */
    context: z.string(),
    /** "Solo" or "Team of 6". */
    team: z.string(),
    /** My part, with ownership verbs. */
    role: z.string(),
    timeline: z.string(),
    /** ≤ 6 tools, in job-posting vocabulary. Cards show the first 4. */
    stack: z.array(z.string()),
    /** The one number on the card: a value plus its comparison or context. */
    headline: z.object({ value: z.string(), label: z.string() }),
    /** Fact box: the result stated against its baseline. */
    result: z.string(),
    /** Fact box: what it means in money, time or a decision. Label estimates as estimates. */
    impact: z.string().optional(),
    /** Metrics strip under the fact box. Keep to 3. */
    metrics: z
      .array(z.object({ value: z.string(), label: z.string() }))
      .default([]),
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
