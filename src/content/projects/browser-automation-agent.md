---
title: 'A browser agent that learns each site it visits'
tagline: 'Zero-dependency automation that fills any web form — and gets cheaper to run every time it sees a site again.'
summary: 'A universal form-filling agent built on the Chrome DevTools Protocol. A deterministic matcher handles what it can, the language model resolves only what it can’t, and a learning loop turns each run into cached knowledge so repeat visits cost almost nothing.'
category: 'AI & Automation'
context: 'Personal engineering project'
role: 'Sole designer and engineer'
timeline: '2026'
stack: ['Node.js', 'Chrome DevTools Protocol', 'Claude API', 'Agentic workflows']
metrics:
  - value: '0'
    label: 'runtime dependencies'
  - value: '3'
    label: 'layers of learned site memory'
glance:
  problem: 'LLM browser agents are slow and expensive because they re-read the entire page — usually as screenshots — on every single step.'
  approach: 'Push the deterministic work into code: a matcher resolves fields against a profile, and only genuinely ambiguous fields reach the model. Every resolution is logged and promoted into reusable knowledge.'
  result: 'A repeatedly-visited site approaches zero model tokens — it replays a compiled sequence of steps instead of reasoning from scratch.'
featured: false
order: 10
---

## The economics problem

Most LLM browser agents work by screenshotting the page, asking the model what it sees, and
acting on the answer. It works, and it's brutally expensive — every step re-reads the whole
page through the most token-hungry channel available, and the agent is exactly as slow and
costly on the hundredth visit to a site as on the first.

That's the wrong shape. **A human gets faster at a form the second time.** The agent should
too.

## The design principle

Learned knowledge lives in **machine-readable files that scripts read — never files the
model loads.**

Per page, the model sees only three things: a short list of fields the deterministic matcher
couldn't resolve, a compact block of known facts about that host, and the result of a
completeness check. The bulk page data never enters the context window; it moves between the
browser and the matcher on disk.

## Three layers of memory

1. **The engine** — no memory at all. A page scanner that handles native inputs, custom
   widget families (React Select, MUI, Workday, PrimeNG), shadow DOM and cross-origin
   iframes. This works on a site it has never seen.
2. **Site facts** — per-host notes written automatically from run logs: which upload method
   works here, what gates the flow, which widget families appear.
3. **Compiled steps** — once a host has been seen enough times, the learner drafts a replay
   file. Subsequent visits execute it deterministically, falling back to the model only when
   a step fails.

The effect compounds: over time, fewer fields ever reach the model at all.

## The part I'd defend in an interview

An **audit gate**. The agent refuses to advance past a page while any required field is
still empty.

That sounds obvious. It isn't how most agents behave — they optimistically click Next and
discover the failure later, if at all. Making incompleteness a hard stop rather than a
recoverable error is the difference between an agent that mostly works and one you can leave
alone.

The same instinct shows up in error classification: failures are typed as *usage*,
*environment*, *engine* or *page* problems, so that a bug in my code never gets filed away as
knowledge about a website.

## Why it belongs in an analytics portfolio

Because the interesting decisions in it are analytical, not just engineering ones: what to
compute deterministically versus what to hand to an expensive, non-deterministic model; how
to validate a learned answer before trusting it; when to quarantine knowledge that has
failed twice. That's the same judgement a production ML system needs.
