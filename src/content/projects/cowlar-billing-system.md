---
title: 'Cut billing reconciliation time 40% on a ~$1M/month billing system'
tagline: 'SQL datasets, a QA/UAT gate and Power BI behind a studio’s live fractional-billing pipeline.'
tldr: 'At Cowlar Design Studio, a ~175-person product studio, I owned the 15+ SQL datasets and QA gate behind close to $1M a month of fractional billing; my Power BI reporting cut reconciliation time 40%.'
summary: 'Owned the data behind ~$1M/month of fractional billing at a ~175-person product studio: SQL datasets, a QA/UAT gate, n8n and Power BI. Reconciliation time fell 40%.'
category: 'Analytics & BI'
context: 'Cowlar Design Studio, product studio of YC-backed Cowlar'
team: 'Data owner · ~175-person studio'
role: 'Billing & Compliance Analyst: owned the SQL datasets, the QA/UAT process and SOPs, and the Power BI reporting; built the n8n and Apps Script data capture'
timeline: 'May 2024 – Jun 2025'
stack: ['SQL', 'Power BI', 'n8n', 'Google Apps Script', 'Data QA / UAT', 'Process design']
headline:
  value: '−40%'
  label: 'financial reconciliation time, after Power BI replaced manual spreadsheet consolidation'
result: 'Reconciliation time down 40% and billing accuracy up about 25%, against a before-state of inconsistent hour logs and spreadsheets a week to a month out of date.'
impact: 'Reporting moved from weekly look-backs to real time, and project-profitability views improved resource allocation by 15% on a system billing close to $1M a month.'
metrics:
  - value: '−40%'
    label: 'time spent on financial reconciliation'
  - value: '~25%'
    label: 'better billing accuracy after automated data capture'
  - value: '+15%'
    label: 'resource allocation, from project-profitability visibility'
links: []
featured: true
order: 1
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Every billing figure passed a QA gate before it reached Power BI</figcaption>

<svg viewBox="0 0 400 384" role="img" aria-labelledby="cowA-title cowA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-sans, sans-serif);">
<title id="cowA-title">Schematic of the billing data pipeline</title>
<desc id="cowA-desc">Five stages from top to bottom. Project time and expense data is captured by n8n and Apps Script workflows, lands in 15 or more SQL datasets, passes a QA and UAT gate, feeds Power BI reporting, and ends in client invoicing and leadership decisions. The QA and UAT gate is highlighted.</desc>
<rect x="40" y="28" width="320" height="48" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="49" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Project time &amp; expense</text>
<text x="200" y="66" text-anchor="middle" font-size="11" fill="var(--ink-3)">captured by n8n + Apps Script workflows</text>
<line x1="200" y1="78" x2="200" y2="92" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 91 L 200 98 L 204.5 91 Z" fill="var(--ink-3)" />
<rect x="40" y="100" width="320" height="48" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="121" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">15+ SQL datasets</text>
<text x="200" y="138" text-anchor="middle" font-size="11" fill="var(--ink-3)">single source of truth for operations</text>
<line x1="200" y1="150" x2="200" y2="164" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 163 L 200 170 L 204.5 163 Z" fill="var(--ink-3)" />
<rect x="40" y="172" width="320" height="48" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="200" y="193" text-anchor="middle" font-size="13" font-weight="700" fill="var(--accent-ink)">QA / UAT gate</text>
<text x="200" y="210" text-anchor="middle" font-size="11" fill="var(--accent-ink)">written checks and SOPs on billing data</text>
<line x1="200" y1="222" x2="200" y2="236" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 235 L 200 242 L 204.5 235 Z" fill="var(--ink-3)" />
<rect x="40" y="244" width="320" height="48" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="265" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Power BI reporting</text>
<text x="200" y="282" text-anchor="middle" font-size="11" fill="var(--ink-3)">project financials and profitability</text>
<line x1="200" y1="294" x2="200" y2="308" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 307 L 200 314 L 204.5 307 Z" fill="var(--ink-3)" />
<rect x="40" y="316" width="320" height="48" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="337" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Client invoicing · leadership decisions</text>
<text x="200" y="354" text-anchor="middle" font-size="11" fill="var(--ink-3)">close to $1M billed a month</text>
<text x="200" y="16" text-anchor="middle" font-size="10" fill="var(--ink-3)" style="font-family:var(--font-mono, monospace);letter-spacing:0.08em;">THE DATA LAYER I OWNED</text>
</svg>

<figcaption class="chart-caption">Schematic, not a chart: the billing figures belong to a former employer. The highlighted gate is the step that turned a pipeline that moves data into one whose output could go in front of a client.</figcaption>
</figure>

## A ~175-person studio needed invoices it could trust

Cowlar Design Studio is a product-development and consulting studio of about 175 people, the
services arm of Cowlar (Y Combinator W17), working across IoT, AI/ML, SaaS and AgTech. It bills fractionally: each client pays for
its share of the engineering time and expenses spent across many projects running at once. Close to
$1M a month went out through that system.

Leadership needed two things from the data: invoices it could put in front of a paying client, and
a view of which projects made money. Both depended on hours and expenses being recorded correctly. A
quiet error became a wrong invoice, or billable work that never reached an invoice at all.

## Before: inconsistent logs and spreadsheets weeks out of date

When I joined as Billing & Compliance Analyst in May 2024, the data had four problems:

- **Revenue leakage.** Engineers logged hours inconsistently, and specialised work went unbilled.
- **Manual reporting.** Financial health came from consolidated spreadsheets that were often a week
  to a month out of date.
- **Data friction.** Collecting data by hand interrupted engineers, and data hygiene suffered.
- **No profitability view.** Resource allocation ran on intuition. Nobody could see which projects
  consumed the most unbilled time.

The volume was too high to check by hand and the stakes too high to leave unchecked.

## How I rebuilt the data layer

### One set of SQL datasets replaced per-team spreadsheets

I designed and maintained more than 15 custom SQL datasets between engineering output and finance.
Billing, invoicing and reporting all read from them. The alternative was the existing habit: each
team consolidating its own spreadsheet and reconciling the differences afterwards. With one set of
modelled tables, a disagreement had one place to be settled.

### Automated capture worked better than asking engineers to log more carefully

The obvious fix for poor logging was stricter rules for engineers. I rejected it, because the
interruption was the cause of the bad data. n8n and Google Apps Script workflows collected time and
expense data in the background, so engineers no longer had to stop and enter it. Data quality
improved once collection stopped depending on busy people remembering to do it.

### A QA/UAT gate caught errors before a client saw them

Between the datasets and the reporting I put a QA/UAT stage: written workflows and SOPs that checked
billing data for accuracy and completeness. Correcting an invoice after a client has seen it costs
trust and delays payment; catching the error before costs one check. The SOPs also kept the process
from depending on my memory, and they left audit-ready records behind.

### Power BI replaced the weekly look-back

On top of the checked datasets I built Power BI dashboards for project financials and profitability.
They replaced manual spreadsheet consolidation and moved reporting from weekly look-backs to real
time, so leadership could see where engineering hours were going while there was still time to act.

## Reconciliation time fell 40% and billing accuracy rose about 25%

- **Financial reconciliation took 40% less time** once the Power BI dashboards replaced manual
  consolidation.
- **Billing accuracy improved by about 25%** after the automated capture went live.
- **Resource allocation improved by 15%** once leadership could see profitability by project.
- **Close to $1M a month** ran through the system while I owned its data.

These are the figures I reported at the time. The before-and-after measurements live in a former
employer’s systems, so I can’t show the underlying counts here.

## What I’d tell the next team

Fix the collection step before the reports. Most billing errors here started when an hour was
logged, long before anyone opened a dashboard. Automate capture so the people doing the work are not
also keeping the record, put a written check between the data and the invoice, and then invest in
reporting. A dashboard built on unchecked data only shows the errors faster.

## Limitations and what I’d do next

- **The gains are reported figures, without a published method.** Next time I would record the
  measurement alongside the result: hours per reconciliation cycle before and after, and what counted
  as a billing error.
- **The data layer leaned on one analyst.** The SOPs reduced that risk; a second trained owner would
  have removed it.
- **Apps Script and spreadsheet tooling have ceilings.** They suited a process that changed often at
  this size. At higher volume I would move capture into a monitored pipeline with alerting on failed
  runs.
- **Rule-based QA only catches errors someone wrote a rule for.** A periodic sample of invoices traced
  back to the raw logs would catch what the rules miss.

## Team and credits

I was the main contact for billing and compliance questions across finance, HR and project teams.
**I owned the SQL datasets, the QA/UAT process and SOPs, the Power BI reporting, and the n8n and Apps
Script automation.** Engineering, finance and leadership supplied the source data and used the
outputs. The [HR agent](/projects/hr-automation-agent/) I built at the same studio fed worklogs into
this pipeline.

> The billing figures belong to a former employer, and no client names or client data appear here.
> This page describes the pipeline instead of charting their numbers.

<details class="appendix">
<summary>Technical appendix</summary>

**Pipeline stages**

<div class="table-scroll">

| Stage | Tools | What it did |
|---|---|---|
| Capture | n8n, Google Apps Script | Collected project time and expense data without manual entry by engineers |
| Store | SQL (15+ custom datasets) | Analytics-ready tables shared by billing, invoicing and reporting |
| Check | QA/UAT workflows, SOPs | Accuracy and completeness checks on billing data; audit-ready records |
| Report | Power BI | Project financials and profitability, refreshed in real time |
| Use | Invoicing, leadership reviews | Client invoices; decisions on where engineering hours went |

</div>

**Wider automation.** Alongside the billing pipeline I automated HR, accounts and billing workflows
with Python, JavaScript and Google Apps Script, Slack, Odoo and Google Workspace, which cut manual
data entry across departments.

**What is left out, and why.** Table schemas, query logic, dashboard screenshots and any invoice-level
data stay with the former employer.

</details>
