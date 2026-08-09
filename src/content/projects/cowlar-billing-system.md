---
title: 'A fractional billing system running six figures a month'
tagline: 'Analytics-ready SQL datasets and Power BI reporting behind a live production billing pipeline.'
summary: 'At a Y Combinator–backed studio I owned the data layer behind fractional billing — the SQL datasets, the QA process that kept them trustworthy, and the Power BI reporting that turned project financials into something clients and leadership could act on.'
category: 'Analytics & BI'
context: 'Cowlar Design Studio (Y Combinator–backed)'
role: 'Billing & Compliance Analyst'
timeline: '2024 – 2025'
stack: ['SQL', 'Power BI', 'Google Apps Script', 'Data QA / UAT', 'Process design']
metrics:
  - value: '$100K+'
    label: 'billed monthly through the system'
glance:
  problem: 'Fractional billing across many concurrent projects means revenue depends on data that is fiddly, high-volume and unforgiving of error.'
  approach: 'Owned end-to-end delivery of the analytics-ready SQL datasets, established QA/UAT workflows and SOPs, and built Power BI reporting on top.'
  result: 'A live production billing system with reporting used for client invoicing and internal decision-making.'
featured: true
order: 6
draft: false
---

## Why fractional billing is a data problem

A studio billing fractionally across many concurrent projects doesn't have one invoice to
get right — it has a matrix of them. Hours and expenses land against projects continuously,
each client's share is a fraction of a shared cost base, and revenue depends entirely on
whether that underlying data is correct.

That makes it unforgiving in a specific way: the volume is high enough that manual checking
doesn't scale, and the stakes are high enough that a quiet error becomes a wrong invoice to
a paying client.

## What I owned

The data layer underneath it — end to end:

- **Analytics-ready SQL datasets.** The modelled tables the billing and reporting ran on.
- **A QA / UAT process.** The part that made the datasets trustworthy rather than merely
  present, formalised into workflows and SOPs so it didn't depend on me remembering.
- **Power BI reporting on top.** Turning project financials into something clients and
  leadership could actually act on.

Google Apps Script handled the automation around the edges of that pipeline.

## The shape of it

Project time and expense data flowed into the SQL datasets, through the QA/UAT gate, and
out into Power BI — which fed both client invoicing and internal decision-making. The gate
in the middle is the piece I'd point at: it's the difference between a pipeline that moves
data and one whose output you can put in front of a client.

## Scale

**$100K+ billed monthly** ran through the system while I owned it.

---

> **A fuller architecture walkthrough is still to come** — the specific roadblocks, how the
> QA process evolved, and the design trade-offs I'd argue for differently now. I'd rather
> add that properly than pad this out. The billing figures themselves belong to a former
> employer, so the diagram above is a schematic of the pipeline rather than a chart of their
> numbers.
