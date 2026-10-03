---
title: 'Priced hospital menu variety at +37% food cost with a MILP'
tagline: 'A mixed-integer menu planner for five clinical diets that puts a dollar figure on menu variety.'
tldr: 'Hospital menus must be cheap, clinically safe and varied. I built a MILP for five clinical diets; limiting ingredient repeats raised 3-day food cost 37% ($6.81 to $9.34), giving managers a price for variety.'
summary: 'A mixed-integer program for hospital menus across five clinical diets: limiting ingredient repeats raises 3-day food cost 37%, from $6.81 to $9.34 per patient.'
category: 'Optimization'
context: 'MMA 861 · Smith School of Business, Queen’s University'
team: 'Solo'
role: 'Formulated the MILP, built it in Python and SciPy, wrote the 11 constraint families and ran the sensitivity analysis'
timeline: '2026'
stack: ['Python', 'Mixed-Integer Programming', 'SciPy (HiGHS)', 'Linear Programming', 'Sensitivity Analysis', 'Plotly']
headline:
  value: '+37%'
  label: 'food cost of menu variety vs the cheapest compliant menu ($6.81 → $9.34 per patient, 3 days)'
result: 'With no ingredient repeated within a day or on more than 2 of 3 days, average 3-day food cost rose from $6.81 to $9.34 per patient (+37%) across five clinical diets, with every nutrient bound met.'
impact: 'Estimated $0.84 per patient-day, about $123,000 a year for a 400-patient hospital, assuming an even mix of the five diets and the synthetic wholesale prices in the model.'
metrics:
  - value: '+18% to +46%'
    label: 'cost of variety by diet, against each diet’s cost-only menu'
  - value: '17 → 24'
    label: 'average distinct ingredients per 3-day menu, out of 41'
  - value: '$0.29–$0.41'
    label: 'shadow price of each “one fruit per meal” rule, the costliest constraint in every diet'
links:
  - label: 'Notebook & data on GitHub'
    href: 'https://github.com/Hassam912/hospital-meal-planning-milp'
featured: true
order: 4
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Every diet costs more once ingredient repeats are limited</figcaption>

<svg viewBox="0 0 660 340" role="img" aria-labelledby="chart1-title chart1-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chart1-title">3-day food cost per patient by clinical diet and repeat rule</title>
<desc id="chart1-desc">Grouped bar chart. Five clinical diets, three bars each: the cost-only menu, a menu with no same-day repeats, and a menu that also caps each ingredient at 2 of 3 days. Every diet costs 18 to 46 percent more under the repeat rules. Asterisks mark the 8 of 15 runs that stopped at the 180-second time limit without a proof of optimality.</desc>
<line x1="40" y1="294.0" x2="648" y2="294.0" stroke="var(--rule)" stroke-width="1" />
<text x="32" y="297.0" text-anchor="end" font-size="10" fill="var(--ink-3)">$0</text>
<line x1="40" y1="229.0" x2="648" y2="229.0" stroke="var(--rule)" stroke-width="1" />
<text x="32" y="232.0" text-anchor="end" font-size="10" fill="var(--ink-3)">$3</text>
<line x1="40" y1="164.0" x2="648" y2="164.0" stroke="var(--rule)" stroke-width="1" />
<text x="32" y="167.0" text-anchor="end" font-size="10" fill="var(--ink-3)">$6</text>
<line x1="40" y1="99.0" x2="648" y2="99.0" stroke="var(--rule)" stroke-width="1" />
<text x="32" y="102.0" text-anchor="end" font-size="10" fill="var(--ink-3)">$9</text>
<line x1="40" y1="34.0" x2="648" y2="34.0" stroke="var(--rule)" stroke-width="1" />
<text x="32" y="37.0" text-anchor="end" font-size="10" fill="var(--ink-3)">$12</text>
<rect x="47.0" y="141.2" width="35.9" height="152.8" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Normal Male, cost only: $7.05 (proven optimal)</title></rect>
<rect x="85.9" y="78.8" width="35.9" height="215.2" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Normal Male, no same-day repeats: $9.93 (stopped at time limit)</title></rect>
<rect x="124.7" y="81.4" width="35.9" height="212.6" rx="3" fill="var(--accent)"><title>Normal Male, + max 2 of 3 days: $9.81 (stopped at time limit)</title></rect>
<text x="103.9" y="74.8" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="142.7" y="77.4" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="93.8" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Normal</text>
<text x="93.8" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Male</text>
<rect x="168.6" y="135.6" width="35.9" height="158.4" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Normal Female, cost only: $7.31 (stopped at time limit)</title></rect>
<rect x="207.5" y="62.8" width="35.9" height="231.2" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Normal Female, no same-day repeats: $10.67 (stopped at time limit)</title></rect>
<rect x="246.3" y="62.8" width="35.9" height="231.2" rx="3" fill="var(--accent)"><title>Normal Female, + max 2 of 3 days: $10.67 (stopped at time limit)</title></rect>
<text x="186.6" y="131.6" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="225.5" y="58.8" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="264.3" y="58.8" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="215.4" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Normal</text>
<text x="215.4" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Female</text>
<rect x="290.2" y="123.3" width="35.9" height="170.7" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Diabetic, cost only: $7.88 (stopped at time limit)</title></rect>
<rect x="329.1" y="86.7" width="35.9" height="207.3" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Diabetic, no same-day repeats: $9.57 (stopped at time limit)</title></rect>
<rect x="367.9" y="92.5" width="35.9" height="201.5" rx="3" fill="var(--accent)"><title>Diabetic, + max 2 of 3 days: $9.30 (stopped at time limit)</title></rect>
<text x="308.2" y="119.3" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="347.1" y="82.7" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="385.9" y="88.5" text-anchor="middle" font-size="11" fill="var(--ink-3)">*</text>
<text x="337.0" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Diabetic</text>
<rect x="411.8" y="169.4" width="35.9" height="124.6" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>High Cholesterol, cost only: $5.75 (proven optimal)</title></rect>
<rect x="450.7" y="114.6" width="35.9" height="179.4" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>High Cholesterol, no same-day repeats: $8.28 (proven optimal)</title></rect>
<rect x="489.5" y="114.6" width="35.9" height="179.4" rx="3" fill="var(--accent)"><title>High Cholesterol, + max 2 of 3 days: $8.28 (proven optimal)</title></rect>
<text x="458.6" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">High</text>
<text x="458.6" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Cholesterol</text>
<rect x="533.4" y="162.7" width="35.9" height="131.3" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>DASH, cost only: $6.06 (proven optimal)</title></rect>
<rect x="572.3" y="107.0" width="35.9" height="187.0" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>DASH, no same-day repeats: $8.63 (proven optimal)</title></rect>
<rect x="611.1" y="107.0" width="35.9" height="187.0" rx="3" fill="var(--accent)"><title>DASH, + max 2 of 3 days: $8.63 (proven optimal)</title></rect>
<text x="580.2" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">DASH</text>
<rect x="40" y="6" width="10" height="10" rx="2" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))" />
<text x="55" y="14" font-size="10.5" fill="var(--ink-2)">Cost only</text>
<rect x="230" y="6" width="10" height="10" rx="2" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))" />
<text x="245" y="14" font-size="10.5" fill="var(--ink-2)">No same-day repeats</text>
<rect x="420" y="6" width="10" height="10" rx="2" fill="var(--accent)" />
<text x="435" y="14" font-size="10.5" fill="var(--ink-2)">+ max 2 of 3 days</text>
<text x="40" y="337" font-size="9.5" fill="var(--ink-3)">* run stopped at the 180 s limit: best menu found, not proven optimal</text>
</svg>

<figcaption class="chart-caption">3-day food cost per patient, three MILP runs per diet with identical constraints except the repeat rules. The repeat rules add 18% to 46% depending on the diet, and 37% on average with the 2-of-3-days cap.</figcaption>
</figure>

## Menu variety had no price, so it lost every budget argument

A hospital food-service manager has to keep ingredient cost down, keep every patient inside a
clinical nutrition range, and keep menus varied enough that patients eat. A patient who stops
eating is a clinical problem. Manual planning usually gives up one of the three, and the manager
has no number for what the trade costs. Variety is the one that gets cut, because it sounds like
a preference while cost and nutrition sound like requirements. I set out to answer one question
for that manager: **what does a varied menu cost per patient, compared with the cheapest menu
that is still clinically compliant?** Success meant a dollar figure per diet, from menus that
pass every nutrient bound.

## The model runs on public nutrition data and synthetic prices

- **41 ingredients** in five food groups (10 fruit, 6 vegetable, 9 grain, 10 protein, 6 fat),
  each with 13 nutrients per gram from USDA food data.
- **5 clinical diets:** normal male, normal female, diabetic, high cholesterol and DASH (high
  blood pressure). Daily bounds follow Health Canada guidance, scaled to a 400-patient baseline.
  Per-meal calorie windows use a 35/40/25 breakfast/lunch/dinner split from Women’s College
  Hospital estimates, and the diabetic diet adds a 45–60 g carbohydrate window at every meal.
- **17 culinary rules** that block pairings such as oatmeal with beef or granola with salmon.
- **Prices are synthetic**, based on wholesale averages, so the model could be shared without a
  supplier agreement. Every dollar figure on this page depends on them.

One 3-day block has 9 meals, 261 eligible ingredient-meal pairs and 686 decision variables.

## Four modelling choices turned variety into a dollar figure

### Yes/no menu rules forced a mixed-integer model

The model makes two kinds of decision at once: whether ingredient *i* is on the plate at meal
*j* (binary), and how many grams (continuous). A linking constraint ties them together, so an
unselected ingredient gets exactly zero grams and a selected one lands in a realistic portion
range for that meal. A pure linear program cannot express “exactly one fruit per meal” or “no
oatmeal with beef”, so I rejected it. The original proposal planned Excel Solver, which I dropped
because the model outgrew its variable limits. I built it in Python on SciPy’s HiGHS MILP solver.

### Each of the 11 constraint families closes a loophole the solver found

Without per-meal calorie windows, the solver put almost all calories into one meal. Without a
diabetic carb window per meal, it stacked carbs into one spike while meeting the daily total.
Without composition rules, breakfast was nutritionally valid and unrecognisable. Without the
culinary rules, it served granola with salmon because the pairing was cheap. Each family in the
appendix table exists because a run produced something a dietitian would reject.

### I made variety a hard rule so the answer comes out in dollars

I could have added a variety penalty to the objective. That would need an exchange rate between
dollars and patient satisfaction, and any rate I chose would decide the answer. Hard rules avoid
that: I solved every diet three times with identical constraints except the repeat rules, and the
cost difference between runs is the price of variety. The three runs are: cost only (repeats
allowed), no ingredient twice in one day, and that plus no ingredient on more than 2 of the 3
days.

### The one-fruit-per-meal rule carries the highest shadow price in every diet

Integer programs do not produce usable dual values, so I solved the LP relaxation of the
strictest model, with every binary relaxed to the range 0 to 1, and read the shadow prices.
In all five diets, the nine “exactly one fruit per meal” constraints were the most expensive,
at $0.29 to $0.41 each at the margin. No nutrient bound made any diet’s top 10. The relaxed
costs ($6.08 to $6.83) sit below the integer menus, as a lower bound should. Among nutrients,
the binding pressure shows up in the compliance check below instead: in the diabetic menu, fibre
sits on its floor and potassium almost on its ceiling.

<figure class="chart-figure">
<figcaption class="chart-title">The diabetic menu sits on its fibre floor and near its potassium ceiling</figcaption>

<svg viewBox="0 0 640 334" role="img" aria-labelledby="chart2-title chart2-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chart2-title">Nutrient compliance, diabetic diet, strictest repeat rule</title>
<desc id="chart2-desc">Ten nutrients shown as a bar from the clinical minimum to the actual 3-day average, within the allowed range. Fibre sits just above its minimum, potassium just below its maximum, and sodium well below its limit.</desc>
<rect x="92.0" y="10" width="420.0" height="300" fill="var(--accent-soft)" opacity="0.5" />
<text x="82" y="28.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Protein</text>
<line x1="92.0" y1="25.0" x2="512.0" y2="25.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="22.0" width="44.0" height="6" rx="3" fill="var(--accent)"><title>Protein: 94.4g (range 90-132g), 10% of allowed range</title></rect>
<text x="522.0" y="28.5" font-size="10" fill="var(--ink-3)">94.4g  [90–132]</text>
<text x="82" y="58.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Carbs</text>
<line x1="92.0" y1="55.0" x2="512.0" y2="55.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="52.0" width="176.4" height="6" rx="3" fill="var(--accent)"><title>Carbs: 176.2g (range 130-240g), 42% of allowed range</title></rect>
<text x="522.0" y="58.5" font-size="10" fill="var(--ink-3)">176.2g  [130–240]</text>
<text x="82" y="88.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Fat</text>
<line x1="92.0" y1="85.0" x2="512.0" y2="85.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="82.0" width="33.6" height="6" rx="3" fill="var(--accent)"><title>Fat: 62.4g (range 60-90g), 8% of allowed range</title></rect>
<text x="522.0" y="88.5" font-size="10" fill="var(--ink-3)">62.4g  [60–90]</text>
<text x="82" y="118.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Sat. Fat</text>
<line x1="92.0" y1="115.0" x2="512.0" y2="115.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="112.0" width="287.0" height="6" rx="3" fill="var(--accent)"><title>Sat. Fat: 12.3g (range 0-18g), 68% of allowed range</title></rect>
<text x="522.0" y="118.5" font-size="10" fill="var(--ink-3)">12.3g  [0–18]</text>
<text x="82" y="148.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Fibre</text>
<line x1="92.0" y1="145.0" x2="512.0" y2="145.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="142.0" width="7.0" height="6" rx="3" fill="var(--accent)"><title>Fibre: 30.2g (range 30-42g), 2% of allowed range</title></rect>
<text x="522.0" y="148.5" font-size="10" fill="var(--ink-3)">30.2g  [30–42]</text>
<text x="82" y="178.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Calcium</text>
<line x1="92.0" y1="175.0" x2="512.0" y2="175.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="172.0" width="128.1" height="6" rx="3" fill="var(--accent)"><title>Calcium: 861mg (range 800-1000mg), 30% of allowed range</title></rect>
<text x="522.0" y="178.5" font-size="10" fill="var(--ink-3)">861mg  [800–1000]</text>
<text x="82" y="208.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Sodium</text>
<line x1="92.0" y1="205.0" x2="512.0" y2="205.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="202.0" width="113.8" height="6" rx="3" fill="var(--accent)"><title>Sodium: 623mg (range 0-2300mg), 27% of allowed range</title></rect>
<text x="522.0" y="208.5" font-size="10" fill="var(--ink-3)">623mg  [0–2300]</text>
<text x="82" y="238.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Potassium</text>
<line x1="92.0" y1="235.0" x2="512.0" y2="235.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="232.0" width="418.4" height="6" rx="3" fill="var(--accent)"><title>Potassium: 3116mg (range 2080-3120mg), 100% of allowed range</title></rect>
<text x="522.0" y="238.5" font-size="10" fill="var(--ink-3)">3116mg  [2080–3120]</text>
<text x="82" y="268.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Iron</text>
<line x1="92.0" y1="265.0" x2="512.0" y2="265.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="262.0" width="31.8" height="6" rx="3" fill="var(--accent)"><title>Iron: 10.8mg (range 8-45mg), 8% of allowed range</title></rect>
<text x="522.0" y="268.5" font-size="10" fill="var(--ink-3)">10.8mg  [8–45]</text>
<text x="82" y="298.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Vit. D</text>
<line x1="92.0" y1="295.0" x2="512.0" y2="295.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="292.0" width="49.5" height="6" rx="3" fill="var(--accent)"><title>Vit. D: 8.3mcg (range 5-33mcg), 12% of allowed range</title></rect>
<text x="522.0" y="298.5" font-size="10" fill="var(--ink-3)">8.3mcg  [5–33]</text>
<line x1="92.0" y1="10" x2="92.0" y2="314" stroke="var(--rule)" stroke-width="1" />
<text x="92.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">Min</text>
<text x="302.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">50%</text>
<text x="512.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">Max</text>
</svg>

<figcaption class="chart-caption">Diabetic diet, strictest repeat rule, 3-day averages from the saved results workbook. Each bar runs from the clinical minimum to the actual value. Fibre averages 30.2 g against a 30 g floor and potassium 3,116 mg against a 3,120 mg ceiling, so those two bounds leave the least room when ingredient prices change.</figcaption>
</figure>

## Limiting repeats raised food cost 37%, and every menu met its bounds

<div class="table-scroll">

| Diet | Cost only | No same-day repeats | + max 2 of 3 days | Change vs cost only |
|---|---|---|---|---|
| Normal male | $7.05 | $9.93* | $9.81* | +39% |
| Normal female | $7.31* | $10.67* | $10.67* | +46% |
| Diabetic | $7.88* | $9.57* | $9.30* | +18% |
| High cholesterol | $5.75 | $8.28 | $8.28 | +44% |
| DASH | $6.06 | $8.63 | $8.63 | +42% |
| **Average** | **$6.81** | **$9.42** | **$9.34** | **+37%** |

</div>

\* stopped at the 180-second time limit with a feasible menu that is not proven optimal.

- **Validation.** I checked every menu against every daily nutrient bound for all three days,
  with a 0.5-unit tolerance. No run violated a bound.
- **Optimality.** 7 of 15 runs were proven optimal; 8 stopped at the time limit. The result
  holds on the clean runs: high cholesterol (+44%) and DASH (+42%) were proven optimal under all
  three rules.
- **An anomaly I can explain.** For the normal male and diabetic diets, the stricter rule came
  out cheaper than the looser one ($9.81 vs $9.93, $9.30 vs $9.57). A stricter rule cannot lower
  the true optimum, so the looser runs stopped before finding their best menu. Their true cost
  of variety may be somewhat lower than shown.
- **Where the cost comes from.** In both diets where every run was proven optimal, the 2-of-3-days
  cap added $0. The whole increase came from banning same-day repeats.
- **Variety gained.** Distinct ingredients per 3-day menu rose from 17 to 24 on average, and
  same-day repeats fell from 9–13 per menu to zero.

## Recommendation: budget for no same-day repeats, then work on fruit cost

A food-service manager should treat “no ingredient twice in one day” as the default and budget
about $0.84 per patient-day for it (estimated, synthetic prices). The 2-of-3-days cap can be added
on top: in the cleanly solved diets it cost nothing. The cheapest saving is in fruit, which
carries the highest shadow price in every diet. Negotiating fruit prices or approving cheaper
fruits for the menu would cut cost more than relaxing any nutrient bound. After rollout, the
measure to watch is plate waste and intake by diet, because that is what variety is meant to buy.

## Limitations and what I’d do next

- **8 of 15 runs are not proven optimal**, and I did not record their optimality gaps. Next: rerun
  with a longer limit and report the gap for each run, starting with the normal male and diabetic
  3-day runs that produced the anomaly.
- **Prices are synthetic.** The 37% and the $123,000 estimate move with real supplier prices.
  Next: rerun on one hospital’s actual price list.
- **Diets are solved one at a time.** A real kitchen feeds every diet from one ingredient pool.
  Next: a joint model with shared purchasing across diets.
- **Shadow prices come from a fully relaxed LP**, which can pick fractional menus. Next: fix the
  chosen menu and re-solve the portions to get dual values for the menu actually served.
- **The block is 3 days.** A production planner needs a full week or a rotating cycle.

<details class="appendix">
<summary>Technical appendix</summary>

**Formulation.** Decision variables: `x[i,j]` binary (ingredient *i* at meal *j*), `q[i,j]`
continuous grams, `a[i,d]` binary (ingredient *i* used on day *d*) and `r[i]` binary (used on more
than one day). Objective: minimise Σ price per gram × `q[i,j]`. The linking constraint:

```
qMin(i,j) · x(i,j)  ≤  q(i,j)  ≤  qMax(i,j) · x(i,j)
```

**Constraint families.**

<div class="table-scroll">

| | Constraint | The loophole it closes |
|---|---|---|
| C1 | Daily nutrient bounds for 10 nutrients (vitamin A and sugar monitored only) | “Cheapest” would mean nutritionally void |
| C2 | Per-meal calorie windows, 35/40/25 split | All calories in one meal |
| C3 | Diabetic carbs 45–60 g per meal | One carb spike that still meets the daily total |
| C4 | Exactly one fruit per meal; 1–4 non-fruit items | A plate of one cheap ingredient |
| C5 | 17 culinary incompatibilities (13 all meals, 4 breakfast only) | Granola with salmon |
| C6 | Breakfast: ≥1 protein, exactly 1 grain, exactly 1 fat | Valid but unrecognisable breakfasts |
| C7 | Lunch and dinner: ≥1 protein, ≥1 vegetable, 1–2 grains, plate ratio | Plates with no structure |
| C8 | Meal-specific portion bounds | 5 g of chicken or 500 g of rice |
| C9 | Day-presence linking | Makes the rotation rules expressible |
| C10 | Each ingredient at most once per day | Same ingredient at lunch and dinner |
| C11 | Each ingredient on at most 2 (or 3) of 3 days | The same cheap items every day |

</div>

**Solver settings.** SciPy `milp` (HiGHS), 180-second time limit per run, 15 runs (5 diets × 3
rules). Run status, time and distinct ingredients:

<div class="table-scroll">

| Diet | Cost only | No same-day repeats | + max 2 of 3 days |
|---|---|---|---|
| Normal male | optimal, 96.7 s, 16 | time limit, 24 | time limit, 24 |
| Normal female | time limit, 17 | time limit, 26 | time limit, 26 |
| Diabetic | time limit, 21 | time limit, 24 | time limit, 24 |
| High cholesterol | optimal, 18.9 s, 16 | optimal, 64.1 s, 23 | optimal, 77.3 s, 23 |
| DASH | optimal, 23.8 s, 17 | optimal, 77.8 s, 23 | optimal, 89.2 s, 23 |

</div>

**LP relaxation (strictest rule).** Relaxed cost: normal male $6.83, normal female $6.77,
diabetic $6.80, high cholesterol $6.08, DASH $6.27. Largest shadow prices (dollars per unit of
the constraint): the nine one-fruit-per-meal rules in every diet, from −$0.29 to −$0.41. The tenth
is “≥1 protein at day-1 lunch” (−$0.31) for normal male and a banana once-per-day cap (−$0.22 to
−$0.26) for the other four diets.

**What didn’t work.** Excel Solver (variable limits). Reading duals straight from the MILP (not
defined with integer variables). Treating the compliance chart from one saved run as stable: a
second run of the same diabetic model put potassium at 2,974 mg, so only the fibre floor binds in
both runs.

</details>
