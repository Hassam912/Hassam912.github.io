---
title: 'Automated HR letters and the worklogs behind ~$1M/month billing'
tagline: 'An LLM agent on Google Sheets and Apps Script that drafts HR paperwork and keeps billing’s worklogs.'
tldr: 'At Cowlar I built an LLM agent on Google Sheets and Apps Script that drafts HR letters and onboarding checklists and keeps the worklogs that feed a ~$1M-a-month billing system.'
summary: 'An LLM HR agent at a ~175-person studio: letters, checklists and worklogs from plain-language prompts, with worklogs feeding a ~$1M/month billing pipeline.'
category: 'Agentic AI'
context: 'Cowlar Design Studio (Y Combinator–backed)'
team: 'Solo build, ~175-person studio'
role: 'Designed and built the agent, the Sheets data model and the Apps Script document flow; connected its worklogs to the billing datasets I owned'
timeline: 'May 2024 – Jun 2025'
stack: ['Google Apps Script', 'LLM APIs', 'Google Sheets', 'Slack API', 'Workflow automation']
headline:
  value: '3'
  label: 'HR workflows on one agent: letters, onboarding checklists, and worklogs that fed billing'
result: 'Letters, onboarding checklists and worklogs generated from plain-language prompts instead of written by hand; worklogs reached the billing datasets without being typed in twice.'
impact: 'Removed a manual re-entry step between HR records and billing, a standing source of billing errors in a pipeline processing close to $1M a month. Usage volumes were not tracked.'
metrics: []
links: []
featured: false
order: 10
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">One worklog served HR and billing</figcaption>

<svg viewBox="0 0 400 316" role="img" aria-labelledby="hrA-title hrA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-sans, sans-serif);">
<title id="hrA-title">Schematic of the HR agent</title>
<desc id="hrA-desc">A plain-language prompt goes to the agent, an LLM plus Apps Script that reads and writes a Google Sheets database. The agent produces three outputs: letters, onboarding checklists and worklogs. Letters and checklists are filed in Drive. Worklogs, highlighted, flow into the billing SQL datasets behind close to $1M a month of billing.</desc>
<rect x="80" y="20" width="240" height="44" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="47" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Plain-language prompt</text>
<line x1="200" y1="66" x2="200" y2="80" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 79 L 200 86 L 204.5 79 Z" fill="var(--ink-3)" />
<rect x="60" y="88" width="280" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="109" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Agent: LLM + Apps Script</text>
<text x="200" y="127" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">reads and writes the Sheets database</text>
<line x1="70" y1="140" x2="70" y2="160" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 65.5 159 L 70 166 L 74.5 159 Z" fill="var(--ink-3)" />
<line x1="200" y1="140" x2="200" y2="160" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 195.5 159 L 200 166 L 204.5 159 Z" fill="var(--ink-3)" />
<line x1="330" y1="140" x2="330" y2="160" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 325.5 159 L 330 166 L 334.5 159 Z" fill="var(--ink-3)" />
<rect x="8" y="168" width="124" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="70" y="189" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Letters</text>
<text x="70" y="206" text-anchor="middle" font-size="10" fill="var(--ink-3)">employment, experience</text>
<rect x="138" y="168" width="124" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="200" y="189" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Onboarding</text>
<text x="200" y="206" text-anchor="middle" font-size="10" fill="var(--ink-3)">checklists per role</text>
<rect x="268" y="168" width="124" height="50" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="330" y="189" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent-ink)">Worklogs</text>
<text x="330" y="206" text-anchor="middle" font-size="10" fill="var(--accent-ink)">who worked on what</text>
<line x1="135" y1="220" x2="135" y2="240" stroke="var(--rule)" stroke-width="1.5" />
<path d="M 130.5 239 L 135 246 L 139.5 239 Z" fill="var(--ink-3)" />
<line x1="330" y1="220" x2="330" y2="240" stroke="var(--accent)" stroke-width="1.6" />
<path d="M 325.5 239 L 330 246 L 334.5 239 Z" fill="var(--accent)" />
<rect x="8" y="248" width="254" height="50" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="135" y="269" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Drive storage</text>
<text x="135" y="286" text-anchor="middle" font-size="10" fill="var(--ink-3)">filed into folders automatically</text>
<rect x="268" y="248" width="124" height="50" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="330" y="269" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent-ink)">Billing datasets</text>
<text x="330" y="286" text-anchor="middle" font-size="10" fill="var(--accent-ink)">~$1M/month pipeline</text>
</svg>

<figcaption class="chart-caption">Schematic, not a chart. The highlighted path is the reason the agent mattered beyond HR: the record of who worked on what was also a billing input.</figcaption>
</figure>

## HR paperwork and billing were maintaining the same fact twice

Cowlar Design Studio has about 175 people, and its HR work was high-volume, templated and low in
judgement: employment and experience letters, onboarding checklists, and worklogs of who worked on
what. In a services business that last record is two things at once. It is an HR artifact, and it is
the hours data that billing charges clients for. Keeping it separately in two places meant typing it
twice, and every retyped hour was a chance for a billing error in a pipeline processing close to $1M
a month.

## How I built it

### Sheets beat a CRM because the process kept changing

The HR processes were not stable. A packaged HR system makes you model the process before you
understand it. Google Sheets as the database, with Apps Script on top, let the data model change as
the process changed, and gave me native access to documents, Drive storage and email. I chose speed
of change over the stronger access control a packaged system would have given.

### The LLM drafts, and scripts do the filing

A plain-language prompt goes to the agent. The LLM turns it into a draft letter or checklist; Apps
Script handles everything that must be exact: reading and writing the Sheets database, generating
the document, naming it and filing it in the right Drive folder. Slack integrations handled
compliance follow-ups. Keeping storage and records in code meant the model never decided where a
document lived.

### Worklogs went straight into billing

The agent maintained employee worklogs and wrote them where the billing datasets could read them, so
hours reached billing without being re-entered. That billing pipeline is the one in my
[billing case study](/projects/cowlar-billing-system/), where automated capture improved billing
accuracy by about 25%. The agent was one part of that pipeline, and I don’t claim that figure for it
alone.

## Letters and worklogs on request, with no re-entry into billing

Letters, onboarding checklists and worklogs came from a prompt instead of being written by hand, and
the manual re-entry step between HR and billing went away. I did not track how many documents it
produced or how much time each one saved, so this page gives no usage numbers.

## What I’d tell the next team

Look for the fact two departments both maintain, and automate it once. Here it was the worklog. Let
the model draft text, and keep every step that must be exact (records, file names, storage) in code
you can test.

## Limitations and what I’d do next

- **No usage data.** I didn’t log volumes or time per document. The next version should count both
  from day one.
- **Personal data reached the LLM provider.** Letters need employee details. A production version
  needs a written data-handling policy, a provider agreement that excludes training on the data, and
  redaction of anything the draft doesn’t need.
- **Access control was spreadsheet-level.** Sheets permissions are coarse. Role-based access and an
  audit log of who generated what would be the first upgrade.
- **It has a scale ceiling.** Sheets plus Apps Script suited a ~175-person studio with changing
  processes; at several hundred people I would move to a proper HR system and keep the agent as a
  front end.
- **Human sign-off should be on record.** Each letter should carry a logged approval before it goes
  out, so a wrong draft can be traced to who released it.

<details class="appendix">
<summary>Technical appendix</summary>

**Components**

<div class="table-scroll">

| Part | Tool | Job |
|---|---|---|
| Interface | Plain-language prompt | Request a letter, checklist or worklog update |
| Drafting | LLM API | Turn the request and the employee record into a draft |
| Database | Google Sheets | Employee and worklog records, read and written by the agent |
| Documents | Google Apps Script, Drive | Generate, name and file each document; keep the folder structure |
| Notifications | Slack API | Compliance follow-ups |
| Billing link | Worklog sheet → billing SQL datasets | Hours reach billing without re-entry |

</div>

**Outputs.** Employment, experience and warning letters; onboarding checklists per role; employee
worklogs.

</details>
