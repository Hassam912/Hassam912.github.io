---
title: 'An HR agent that writes its own paperwork'
tagline: 'Text-prompt automation for letters, onboarding checklists and worklogs — built on Sheets, Apps Script and an LLM.'
summary: 'Before “AI agent” was a product category, I built one for HR operations: generate employment and experience letters, produce onboarding checklists, maintain worklogs that feed billing, and read and write the company database — all from plain-language prompts.'
category: 'AI & Automation'
context: 'Cowlar Design Studio'
role: 'Designer and builder'
timeline: '2024 – 2025'
stack: ['Google Apps Script', 'LLM APIs', 'Google Sheets', 'Slack API', 'Workflow automation']
metrics: []
glance:
  problem: 'HR document work is high-volume, highly templated and low-judgement — exactly the shape of task that consumes disproportionate human time.'
  approach: 'A prompt-driven agent over Sheets-as-database with Apps Script for document generation, storage and retrieval, plus Slack integrations for compliance workflows.'
  result: 'Letters, checklists and worklogs generated on request; worklog output fed directly into the billing pipeline.'
featured: false
order: 12
---

## Why Sheets instead of a CRM

The unglamorous but correct answer: because it was faster to change.

The processes were not stable. A conventional HR system forces you to model your process
before you understand it, then charges you for the parts you don't use. Sheets plus Apps
Script let the data model move as the process moved, and gave me a scripting surface with
native access to documents, storage and email.

The trade-off is real and I'd state it plainly in an interview — this approach doesn't scale
past a certain headcount, and it has weaker access control than a proper system. It was the
right choice for the size and the speed of change, and it would be the wrong choice at
several hundred employees.

## What it did

- Generated experience, employment and warning letters from a prompt
- Produced onboarding checklists per role
- Maintained employee worklogs — which mattered beyond HR, because they fed the billing
  system's project-hours data
- Managed document storage and directory structure automatically
- Read from and wrote back to the company database

## The connection to billing

The worklogs are the interesting seam. HR paperwork and revenue look unrelated until you
notice that in a services business, *the record of who worked on what* is simultaneously an
HR artifact and a billing input. Automating it once, cleanly, served both — and removed a
manual re-entry step that was a standing source of billing errors.

That's the pattern I keep returning to: the highest-value automation usually sits where two
departments are maintaining the same fact separately.
