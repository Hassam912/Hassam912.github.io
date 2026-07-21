# hassamasghar.com — build plan

## Design direction (from research)

**The governing principle: restraint reads as expensive.** Premium portfolios
are not the ones with the most effects — they are the ones where every element
is intentional and the work is given room to breathe.

| Principle | How it shows up here |
|---|---|
| Restraint | Monochrome ink-on-paper palette, exactly one accent colour (deep teal). No gradients, no stock imagery. |
| Bold typography | Large hero statement sets hierarchy instantly. Serif for prose (signals "this person writes"), sans for UI, mono for numbers. |
| Generous whitespace | Wide margins, tall section rhythm. Content max-width ~68rem so lines stay readable. |
| Bento-grid scannability | Skills, metrics and secondary work sit in calm tiles rather than walls of text. |
| Purposeful microinteraction | Hover states, one scroll-reveal, smooth theme transition. Nothing decorative. |
| Dark + light | Both first-class, theme toggle persisted, no flash on load. |
| Performance | Astro ships zero JS by default. Target < 3s on mobile, self-hosted fonts. |
| Accessibility | Skip link, keyboard focus states, AA contrast, alt text, semantic headings. |

## Content strategy (from research)

- **3–5 featured projects, not fifteen.** Overloading actively hurts. Everything
  else goes in a compact secondary index.
- **Every case study is STAR:** business question → data → method *and trade-offs*
  → result → recommendation. Never a bare dashboard screenshot.
- **Business impact is the differentiator.** The most common failure is presenting
  projects as technical exercises with no stated business problem.
- **Recruiters skim in ~30 seconds.** Headline claims must land above the fold.
- **Credibility killers to avoid:** dead links, permission-gated Drive files,
  giant raw data files, half-finished projects.
- **CTA discipline:** résumé download and contact must be reachable from anywhere.

## Positioning

> I build the model that decides what to do — and the system that runs it.

Three things almost never appear together in a junior analytics candidate:
graduate-level rigour, a real P&L the candidate personally owns, and production
automation they engineered themselves. Lead with that combination.

---

## Task breakdown

### Phase 0 — Research & direction ✅
- [x] Audit every project artifact on the machine
- [x] Pull LinkedIn for narrative and existing framing
- [x] Research recruiter expectations for analytics portfolios
- [x] Research visual-design best practice for premium portfolios
- [x] Research presentation of dashboards / notebooks
- [x] Research accessibility, SEO, performance, CTA checklist
- [x] Settle positioning statement

### Phase 1 — Foundation
- [x] Astro + Tailwind scaffold, Node 26
- [x] Design tokens: colour, type scale, spacing, dark mode
- [x] Base layout, SEO meta, no-flash theme script
- [x] Nav with theme toggle
- [ ] Footer with contact CTA
- [x] Content collection schema for projects
- [ ] Shared components: metric strip, project card, section header, glance grid, chip row

### Phase 2 — Content: the four featured case studies
- [ ] **Hopefield inventory kitting LP** — my own business, prescriptive
- [ ] **Soccer transfer-value model** — MMA 860, technical depth
- [ ] **Hospital meal-planning MILP** — optimization under competing objectives
- [ ] **Cowlar fractional billing system** — professional, production *(awaiting your walkthrough of architecture + roadblocks)*
- [ ] Secondary index entries: Kaggle House Prices, car-insurance XGBoost predictor,
      browser automation agent, HR automation agent, Medtech case

### Phase 3 — Homepage
- [ ] Hero: positioning statement, status, primary CTAs
- [ ] Proof strip: four traceable numbers
- [ ] Featured work: four large cards, problem → result
- [ ] Toolkit bento grid
- [ ] Short human bio + contact CTA

### Phase 4 — Work index & case-study template
- [ ] `/projects` with category filter
- [ ] `/projects/[id]` case template: header, at-a-glance, STAR body, metrics, links
- [ ] Prev/next navigation between cases

### Phase 5 — About
- [ ] Narrative bio, education, experience timeline
- [ ] Placeholder section for professor feedback *(you're pulling this later)*

### Phase 6 — Assets
- [ ] Favicon + OG social preview image
- [ ] Résumé PDF placed at a stable URL
- [ ] Charts / visuals for each case study (built from the real data, not stock)

### Phase 7 — GitHub backing
- [ ] **Fix the soccer notebook's log back-transform bug** (currently predicts €1.55e29)
- [ ] Clean public repo per featured project with a real README
- [ ] Link each case study to its repo

### Phase 8 — Quality pass
- [ ] Accessibility audit (contrast, keyboard, headings, alt text)
- [ ] Lighthouse performance + SEO
- [ ] Mobile pass at 375px
- [ ] Every link resolves, nothing permission-gated

### Phase 9 — Deploy
- [ ] Push to `github.com/Hassam912`
- [ ] Deploy (Vercel or GitHub Pages)
- [ ] Point `hassamasghar.com` DNS, verify HTTPS

### Phase 10 — After launch
- [ ] Add professor feedback / testimonials
- [ ] Write the Cowlar case study from your walkthrough
- [ ] Tableau Public profile for dashboard work
- [ ] Add portfolio URL to LinkedIn, résumé, and the job-application profile
