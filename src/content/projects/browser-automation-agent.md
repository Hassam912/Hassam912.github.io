---
title: 'Measured my browser agent over 119 sessions, then rebuilt it'
tagline: 'A Chrome DevTools agent rebuilt deterministic-first: one-command adapters, then page reading, then a form kit with an audit gate.'
tldr: 'My browser agent was built to learn each site and get cheaper on repeat visits. Across 119 logged sessions it never did: 68% weren’t forms and replays worked 0 of 2 times. I rebuilt it deterministic-first.'
summary: 'A Chrome DevTools browser agent, measured and rebuilt: its learning loop retired for one-command adapters, agent-browser and a form kit with an audit gate.'
category: 'Agentic AI'
context: 'Personal engineering project'
team: 'Solo'
role: 'Designed the architecture, ran the measurement, made the call to retire the learning loop, and rebuilt the agent with Claude Code'
timeline: '2026 (rebuilt Sep 2026)'
stack: ['Node.js', 'Chrome DevTools Protocol', 'agent-browser', 'Claude API', 'Agentic workflows']
headline:
  value: '68%'
  label: 'of 119 logged sessions weren’t forms, so the form-centred learning loop was retired'
result: 'Across 119 logged sessions the learning design never made repeat sites cheaper: 68% of sessions weren’t forms, 53% of commands were hand-written JavaScript and auto-drafted replays worked 0 of 2 times. Repeat tasks now run as one deterministic command.'
impact: 'The model is called only for what code cannot settle, so routine web tasks no longer pay for page reasoning each time.'
metrics:
  - value: '68%'
    label: 'of 119 logged sessions weren’t forms'
  - value: '53%'
    label: 'of all commands were hand-written JavaScript'
  - value: '0 of 2'
    label: 'auto-drafted replay files that worked'
links: []
featured: false
order: 9
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Each task starts at the cheapest layer and falls through only on failure</figcaption>

<svg viewBox="0 0 400 352" role="img" aria-labelledby="brA-title brA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-sans, sans-serif);">
<title id="brA-title">Schematic of the rebuilt browser agent's layers</title>
<desc id="brA-desc">Five layers from top to bottom, cheapest first. One: adapters, one command per repeated task. Two: agent-browser, which reads the page as a snapshot and page text. Three: the form kit, a deterministic matcher plus an audit gate, where only unresolved fields reach the model. Four: screenshots, as a last resort. Five: stop and report to a human. An arrow on the left shows cost per step rising downward.</desc>
<line x1="22" y1="34" x2="22" y2="318" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 17.5 316 L 22 324 L 26.5 316 Z" fill="var(--ink-3)" />
<text x="14" y="176" text-anchor="middle" font-size="10" fill="var(--ink-3)" transform="rotate(-90 14 176)" style="font-family:var(--font-mono, monospace);letter-spacing:0.06em;">COST PER STEP RISES</text>
<rect x="40" y="26" width="350" height="50" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="56" y="47" font-size="13" font-weight="700" fill="var(--accent-ink)">1 · Adapters</text>
<text x="56" y="65" font-size="10.5" fill="var(--accent-ink)">one command per repeated task, one line of JSON back</text>
<rect x="40" y="86" width="350" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="56" y="107" font-size="13" font-weight="600" fill="var(--ink-2)">2 · agent-browser</text>
<text x="56" y="125" font-size="10.5" fill="var(--ink-3)">page snapshot, element refs and text instead of pixels</text>
<rect x="40" y="146" width="350" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="56" y="167" font-size="13" font-weight="600" fill="var(--ink-2)">3 · Form kit + audit gate</text>
<text x="56" y="185" font-size="10.5" fill="var(--ink-3)">matcher fills from a profile; model sees only leftovers</text>
<rect x="40" y="206" width="350" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="56" y="227" font-size="13" font-weight="600" fill="var(--ink-2)">4 · Screenshot</text>
<text x="56" y="245" font-size="10.5" fill="var(--ink-3)">last resort, for canvas or elements missing from the snapshot</text>
<rect x="40" y="266" width="350" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="56" y="287" font-size="13" font-weight="600" fill="var(--ink-2)">5 · Stop and report</text>
<text x="56" y="305" font-size="10.5" fill="var(--ink-3)">login wall, CAPTCHA, or the same failure twice</text>
<text x="215" y="340" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">a broken adapter hands the next layer a written fallback plan</text>
</svg>

<figcaption class="chart-caption">Schematic, not a chart. The learning loop that used to sit across these layers was removed in September 2026.</figcaption>
</figure>

## The first design bet that the agent would learn each site

Most LLM browser agents screenshot the page, ask the model what it sees and act on the answer. Every
step pays for the most expensive channel there is, and the hundredth visit to a site costs the same
as the first. My first design tried to fix that with a learning loop: per-site facts written from
run logs, and replay files drafted automatically once a site had been seen enough times. The bet was
that repeat visits would get cheaper.

## 119 session logs said the bet was wrong

The agent logged every session to a journal, so I could check the bet against real use. Across
119 sessions, three findings came out of it:

- **68% of sessions weren’t forms at all,** so a form-centred design was built for the minority case.
- **53% of all commands were hand-written JavaScript**, a sign the engine’s own tools didn’t
  cover the task.
- **Auto-drafted replays worked 0 of 2 times, and repeat sites never got cheaper.**

So in September 2026 I retired the learning loop, archived its parts so they can be restored, and
rebuilt the agent.

## How I rebuilt it

### Repeated tasks became one-command adapters

An adapter does one job on one site and prints one line of JSON, so the caller never reads the page.
Exit codes separate done, site changed, needs a human and Chrome down. When a site changes, the
adapter prints a fallback plan for the next layer. When a task is done by hand a second time, the
agent builds an adapter for it, tests it in preview and reports it. That replaced automatic replay
with a reviewed script.

### Page reading moved to agent-browser

For everything without an adapter, the agent uses agent-browser on the same Chrome: snapshots,
element references and page text, with output capped. The rule now is to use these commands instead
of hand-written scraping JavaScript, and to keep screenshots for the rare canvas page.

### The form kit kept the audit gate

For long forms, a deterministic matcher fills fields from a plain-text profile and an answer bank.
Only fields it can’t place reach the model. The **audit gate** refuses to advance while any required
field is empty, and fills can be logged with a read-back of each field. It is the part of the
original design I kept.

## Repeat tasks now cost one command

A task with an adapter now runs without the model reading the page. Site knowledge lives in plain
notes, one per site, instead of machine files no one reviewed.

## What I’d tell the next team

Measure what your agent actually does before building memory for it. Mine was designed for forms and
spent most of its time elsewhere. Put deterministic code first, the model second, and screenshots
last, and make incompleteness a hard stop.

## Limitations and what I’d do next

- **No published before-and-after cost.** I haven’t yet reported tokens or time per task under each
  design.
- **Adapters break when sites change.** The fallback plan limits the damage, but each one still
  needs maintenance.
- **It runs one task at a time on one Chrome profile,** by design, so it doesn’t scale out.
- **Not open source.** A public repo or demo video would let a reviewer check the claims.

<details class="appendix">
<summary>Technical appendix</summary>

**Layers**

<div class="table-scroll">

| Layer | What it is | Used when |
|---|---|---|
| Adapters | One Node.js script per site and task, run through a single launcher | The task has been done before |
| agent-browser | Snapshot, refs, page text and network reads on the agent Chrome | No adapter fits, or an adapter reports the site changed |
| Form kit | Page scan, deterministic matcher, widget handlers, audit gate, upload and sign-in helpers | Long forms with many fields |
| Screenshot | Annotated screenshot, act by label | Elements missing from the snapshot |

</div>

**Adapter exit codes.** 0 done · 2 bad arguments · 3 site changed (prints a fallback plan) · 4 needs
a human · 5 Chrome not reachable · 6 another job holds the site lock.

**Safety rules.** Anything that changes an account (post, reply, send, delete) runs as a preview by
default and acts only with an explicit flag. Each job works in its own tab and takes a per-site lock.

**Testing.** After any change to the scanner, matcher or profile, a regression suite replays 41
recorded form scans.

**Retired in v6.** The learner, auto-drafted replay files, page signatures and machine-written site
facts, archived on 2026-09-23.

</details>
