---
title: 'Pricing the cost of variety in hospital meal planning'
tagline: 'A mixed-integer program that feeds patients within clinical limits, on budget — and tells the manager exactly what menu variety costs.'
short: 'Pricing what menu variety actually costs'
summary: 'Hospital food managers face a trilemma: cut ingredient cost, satisfy strict clinical nutrition bounds, and keep menus varied enough that patients keep eating. I built a MILP that solves all three at once, then used shadow prices to show which clinical rule drives the most cost.'
category: 'Optimization'
context: 'MMA 861 — Queen’s University'
role: 'Model formulation, constraint design and sensitivity analysis'
timeline: '2026'
stack: ['Mixed-Integer Programming', 'Python', 'SciPy (HiGHS solver)', 'Plotly', 'Shadow Price Analysis']
metrics:
  - value: '11'
    label: 'constraint families encoded'
  - value: '9'
    label: 'meals per optimization block'
  - value: '400'
    label: 'patient baseline modelled'
glance:
  problem: 'Manual meal planning fails on at least one of cost, clinical compliance or variety — and managers have no way to quantify what fixing one costs them on the others.'
  approach: 'A mixed-integer linear program over three-day, nine-meal blocks: binary ingredient selection plus continuous portion sizing, under clinical, culinary and rotation constraints.'
  result: 'Least-cost compliant menus, plus a quantified “cost of variety” and shadow prices identifying which nutritional requirement is most expensive to satisfy.'
links:
  - label: 'Notebook & data on GitHub'
    href: 'https://github.com/Hassam912/hospital-meal-planning-milp'
featured: true
order: 3
---

## The trilemma

A hospital food service manager is asked to do three incompatible things every day:

1. **Minimise ingredient cost** — the budget is fixed and food is a large line item.
2. **Meet strict clinical nutritional profiles** — a diabetic patient needs 90–132g of
   protein daily and carbohydrate control *within each meal*, not just across the day.
3. **Keep patients eating** — repetitive menus cause food fatigue, and a patient who stops
   eating is a clinical problem, not a catering one.

Manual planning routinely fails on at least one. You either blow the budget, miss the
clinical target, or serve chicken and rice for the fourth time this week. And critically,
**a manager who trades one off against another has no number telling them what the trade
cost.**

That's what makes this an optimization problem rather than a scheduling chore. The goal
isn't only to produce a menu — it's to produce a menu *and* a price tag on each rule that
constrained it.

## Why mixed-integer, not linear

The model needs two fundamentally different kinds of decision at once:

- **`x` — binary:** is ingredient *i* on the plate for meal *j*? Yes or no.
- **`q` — continuous:** if it is, how many grams?

You cannot express "exactly one fruit per meal" or "oatmeal and beef never share a plate"
in a purely continuous model. Those are logical rules and they need integer variables. But
portion sizing is genuinely continuous — 142g of chicken is a legitimate answer.

The two are linked by a constraint that does a lot of quiet work:

```
qMin(i,j) · x(i,j)  ≤  q(i,j)  ≤  qMax(i,j) · x(i,j)
```

If the ingredient isn't selected, `x = 0` forces the portion to exactly zero. If it is
selected, the portion is bounded into a range that's realistic for that meal. Without it,
the solver cheerfully serves 5g of chicken or 500g of rice to hit a nutrient target.

**Objective:** minimise total ingredient cost — the sum of unit cost × quantity across all
ingredients and meals.

## The constraints are the actual work

Eleven constraint families, and each one exists because the solver did something stupid
without it. That's the honest story of building a MILP: you are not writing rules, you are
closing loopholes.

| | Constraint | The loophole it closes |
|---|---|---|
| **C1** | Daily nutrient bounds — protein, fat, carbs, fibre, vitamins, minerals within clinical range | Without it, "cheapest" means nutritionally void |
| **C2** | Per-meal calorie split — breakfast 35%, lunch 40%, dinner 25% | The solver dumps all calories into one giant meal and starves the other two |
| **C3** | Diabetic per-meal carbs, 45–60g | Daily carb bounds alone let it concentrate carbs into one spike |
| **C4** | Exactly one fruit per meal; 1–4 non-fruit items | Otherwise it optimises to a plate of one cheap ingredient |
| **C5** | Culinary incompatibilities — no oatmeal with beef, no granola with salmon | A solver has no palate. It will pair anything if it's cheap |
| **C6** | Breakfast: ≥1 protein, exactly 1 grain, exactly 1 fat | Nutritionally valid ≠ recognisable as breakfast |
| **C7** | Lunch/dinner: ≥1 protein, ≥1 vegetable, 1–2 grains | Plate-ratio structure per nutritional guidance |
| **C8** | Portion bounds, meal-specific | Prevents absurd serving sizes; links `q` to `x` |
| **C9** | Day-occurrence tracking | Bookkeeping that makes rotation rules expressible |
| **C10** | An ingredient appears at most once per day | No chicken at both lunch and dinner |
| **C11** | Each ingredient on at most *MaxDays* of 3 days | Forces rotation instead of reusing the cheapest items daily |

C5 is my favourite illustration of why domain knowledge can't be skipped. The solver has no
concept of a meal being *edible together*. It sees nutrients and prices. Every culinary
rule a human applies unconsciously has to be written down as an explicit inequality, or the
"optimal" answer is granola with salmon.

## The managerial output: what does variety cost?

This is the part that makes it a business tool rather than a homework problem.

Variety is enforced by the rotation constraints (C10, C11). Relax them and cost falls — the
solver reuses the cheapest compliant ingredients every day. Tighten them and cost rises.
**The difference between those two solutions is the price of patient satisfaction, in
dollars.**

That single number reframes the conversation. A manager arguing for menu variety is no
longer making a soft appeal; they're saying "rotation costs us *X* per patient per week,
and here's the food-waste and clinical cost of not paying it."

Run across all five clinical profiles, the number is consistent: guaranteeing no ingredient
repeats more than once every two days raises 3-day food cost by **37% on average** —
from $6.81 to $9.34 per patient — over the cost-only optimum. It also roughly doubles
distinct-ingredient count, from the high teens to the mid-twenties per 3-day block.

<figure class="chart-figure">
<figcaption class="chart-title">3-day food cost, by clinical profile and rotation rule</figcaption>

<svg viewBox="0 0 660 340" role="img" aria-labelledby="chart1-title chart1-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chart1-title">3-day food cost by clinical profile, across rotation strictness</title>
<desc id="chart1-desc">Grouped bar chart. Five clinical profiles on the x-axis. Three bars per profile: Cost Only, Hard Constraint 3-day max, Hard Constraint 2-day max. Cost rises roughly 25-40 percent as rotation rules tighten.</desc>
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
<rect x="47.0" y="141.2" width="35.9" height="152.8" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Normal Male — Cost Only: $7.05</title></rect>
<rect x="85.9" y="78.8" width="35.9" height="215.2" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Normal Male — Hard Constraint (3-day max): $9.93</title></rect>
<rect x="124.7" y="81.4" width="35.9" height="212.6" rx="3" fill="var(--accent)"><title>Normal Male — Hard Constraint (2-day max): $9.81</title></rect>
<text x="93.8" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Normal</text>
<text x="93.8" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Male</text>
<rect x="168.6" y="135.6" width="35.9" height="158.4" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Normal Female — Cost Only: $7.31</title></rect>
<rect x="207.5" y="62.8" width="35.9" height="231.2" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Normal Female — Hard Constraint (3-day max): $10.67</title></rect>
<rect x="246.3" y="62.8" width="35.9" height="231.2" rx="3" fill="var(--accent)"><title>Normal Female — Hard Constraint (2-day max): $10.67</title></rect>
<text x="215.4" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Normal</text>
<text x="215.4" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Female</text>
<rect x="290.2" y="123.3" width="35.9" height="170.7" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>Diabetic — Cost Only: $7.88</title></rect>
<rect x="329.1" y="86.7" width="35.9" height="207.3" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>Diabetic — Hard Constraint (3-day max): $9.57</title></rect>
<rect x="367.9" y="92.5" width="35.9" height="201.5" rx="3" fill="var(--accent)"><title>Diabetic — Hard Constraint (2-day max): $9.30</title></rect>
<text x="337.0" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Diabetic</text>
<rect x="411.8" y="169.4" width="35.9" height="124.6" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>High Cholesterol — Cost Only: $5.75</title></rect>
<rect x="450.7" y="114.6" width="35.9" height="179.4" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>High Cholesterol — Hard Constraint (3-day max): $8.28</title></rect>
<rect x="489.5" y="114.6" width="35.9" height="179.4" rx="3" fill="var(--accent)"><title>High Cholesterol — Hard Constraint (2-day max): $8.28</title></rect>
<text x="458.6" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">High</text>
<text x="458.6" y="322" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">Cholesterol</text>
<rect x="533.4" y="162.7" width="35.9" height="131.3" rx="3" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))"><title>DASH — Cost Only: $6.06</title></rect>
<rect x="572.3" y="107.0" width="35.9" height="187.0" rx="3" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))"><title>DASH — Hard Constraint (3-day max): $8.63</title></rect>
<rect x="611.1" y="107.0" width="35.9" height="187.0" rx="3" fill="var(--accent)"><title>DASH — Hard Constraint (2-day max): $8.63</title></rect>
<text x="580.2" y="310" text-anchor="middle" font-size="10.5" fill="var(--ink-2)">DASH</text>
<rect x="40" y="6" width="10" height="10" rx="2" fill="color-mix(in oklab, var(--accent) 32%, var(--paper-3))" />
<text x="55" y="14" font-size="10.5" fill="var(--ink-2)">Cost Only</text>
<rect x="230" y="6" width="10" height="10" rx="2" fill="color-mix(in oklab, var(--accent) 62%, var(--paper-3))" />
<text x="245" y="14" font-size="10.5" fill="var(--ink-2)">Hard Constraint (3-day max)</text>
<rect x="420" y="6" width="10" height="10" rx="2" fill="var(--accent)" />
<text x="435" y="14" font-size="10.5" fill="var(--ink-2)">Hard Constraint (2-day max)</text>
</svg>

<figcaption class="chart-caption">Output of the notebook's solver-comparison pass — three MILP runs per clinical profile, identical constraints except rotation strictness. Every profile gets more expensive as ingredient repeats are restricted, which is exactly the trade the model exists to price.</figcaption>
</figure>

## Sensitivity: which clinical rule is expensive?

To go further, I fixed the optimal binary selections from the MILP and ran an **LP
relaxation on the continuous portion variables.** Integer programs don't yield meaningful
shadow prices — duality doesn't hold cleanly with integrality constraints — so this
two-stage approach recovers usable dual values on the nutritional constraints while
respecting the discrete menu the MILP chose.

The shadow prices answer a question the menu itself can't: **which clinical requirement is
disproportionately driving total cost?** If the protein floor carries a large dual value,
that's a direct signal to renegotiate protein sourcing — the highest-leverage procurement
action available, identified analytically rather than by intuition.

The compliance chart below is the check that has to pass before any of that matters: does
the menu actually land inside its clinical bounds, or does it hug the edges in a way that's
technically feasible but clinically fragile?

<figure class="chart-figure">
<figcaption class="chart-title">Nutrient compliance — diabetic profile, 2-day rotation solver</figcaption>

<svg viewBox="0 0 640 334" role="img" aria-labelledby="chart2-title chart2-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chart2-title">Nutrient compliance, Diabetic profile, 2-day rotation solver</title>
<desc id="chart2-desc">Ten nutrients shown as a bar from the clinical minimum to the actual 3-day average, positioned within the allowed min-max range. Potassium and fibre sit near the top of their range; sodium and protein sit comfortably low.</desc>
<rect x="92.0" y="10" width="420.0" height="300" fill="var(--accent-soft)" opacity="0.5" />
<text x="82" y="28.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Protein</text>
<line x1="92.0" y1="25.0" x2="512.0" y2="25.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="22.0" width="44.0" height="6" rx="3" fill="var(--accent)"><title>Protein: 94.4g (range 90-132g) — 10% of allowed range</title></rect>
<text x="522.0" y="28.5" font-size="10" fill="var(--ink-3)">94.4g  [90–132]</text>
<text x="82" y="58.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Carbs</text>
<line x1="92.0" y1="55.0" x2="512.0" y2="55.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="52.0" width="176.4" height="6" rx="3" fill="var(--accent)"><title>Carbs: 176.2g (range 130-240g) — 42% of allowed range</title></rect>
<text x="522.0" y="58.5" font-size="10" fill="var(--ink-3)">176.2g  [130–240]</text>
<text x="82" y="88.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Fat</text>
<line x1="92.0" y1="85.0" x2="512.0" y2="85.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="82.0" width="33.6" height="6" rx="3" fill="var(--accent)"><title>Fat: 62.4g (range 60-90g) — 8% of allowed range</title></rect>
<text x="522.0" y="88.5" font-size="10" fill="var(--ink-3)">62.4g  [60–90]</text>
<text x="82" y="118.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Sat. Fat</text>
<line x1="92.0" y1="115.0" x2="512.0" y2="115.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="112.0" width="287.0" height="6" rx="3" fill="var(--accent)"><title>Sat. Fat: 12.3g (range 0-18g) — 68% of allowed range</title></rect>
<text x="522.0" y="118.5" font-size="10" fill="var(--ink-3)">12.3g  [0–18]</text>
<text x="82" y="148.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Fibre</text>
<line x1="92.0" y1="145.0" x2="512.0" y2="145.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="142.0" width="7.0" height="6" rx="3" fill="var(--accent)"><title>Fibre: 30.2g (range 30-42g) — 2% of allowed range</title></rect>
<text x="522.0" y="148.5" font-size="10" fill="var(--ink-3)">30.2g  [30–42]</text>
<text x="82" y="178.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Calcium</text>
<line x1="92.0" y1="175.0" x2="512.0" y2="175.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="172.0" width="128.1" height="6" rx="3" fill="var(--accent)"><title>Calcium: 861mg (range 800-1000mg) — 30% of allowed range</title></rect>
<text x="522.0" y="178.5" font-size="10" fill="var(--ink-3)">861mg  [800–1000]</text>
<text x="82" y="208.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Sodium</text>
<line x1="92.0" y1="205.0" x2="512.0" y2="205.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="202.0" width="113.8" height="6" rx="3" fill="var(--accent)"><title>Sodium: 623mg (range 0-2300mg) — 27% of allowed range</title></rect>
<text x="522.0" y="208.5" font-size="10" fill="var(--ink-3)">623mg  [0–2300]</text>
<text x="82" y="238.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Potassium</text>
<line x1="92.0" y1="235.0" x2="512.0" y2="235.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="232.0" width="418.4" height="6" rx="3" fill="var(--accent)"><title>Potassium: 3116mg (range 2080-3120mg) — 100% of allowed range</title></rect>
<text x="522.0" y="238.5" font-size="10" fill="var(--ink-3)">3116mg  [2080–3120]</text>
<text x="82" y="268.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Iron</text>
<line x1="92.0" y1="265.0" x2="512.0" y2="265.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="262.0" width="31.8" height="6" rx="3" fill="var(--accent)"><title>Iron: 10.8mg (range 8-45mg) — 8% of allowed range</title></rect>
<text x="522.0" y="268.5" font-size="10" fill="var(--ink-3)">10.8mg  [8–45]</text>
<text x="82" y="298.5" text-anchor="end" font-size="11" fill="var(--ink-2)">Vit. D</text>
<line x1="92.0" y1="295.0" x2="512.0" y2="295.0" stroke="var(--rule)" stroke-width="6" stroke-linecap="round" />
<rect x="92.0" y="292.0" width="49.5" height="6" rx="3" fill="var(--accent)"><title>Vit. D: 8.3mcg (range 5-33mcg) — 12% of allowed range</title></rect>
<text x="522.0" y="298.5" font-size="10" fill="var(--ink-3)">8.3mcg  [5–33]</text>
<line x1="92.0" y1="10" x2="92.0" y2="314" stroke="var(--rule)" stroke-width="1" />
<text x="92.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">Min</text>
<text x="302.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">50%</text>
<text x="512.0" y="324.0" text-anchor="middle" font-size="10" fill="var(--ink-3)">Max</text>
</svg>

<figcaption class="chart-caption">Each bar is the 3-day average, positioned between the clinical min and max. Potassium sits at the ceiling — the binding constraint for this profile — while sodium and protein have slack. That's the shadow-price story in one chart: potassium is where sourcing has the least room to move.</figcaption>
</figure>

## Data

| Input | Source |
|---|---|
| Nutritional profiles per gram | USDA food databases |
| Clinical daily min/max intake | Health Canada guidelines, scaled to a 400-patient baseline |
| Ingredient unit costs | Wholesale market averages (synthetic — no supplier data required) |

Using synthetic costs was deliberate. The model's validity rests on its *structure*, and
synthetic-but-realistic pricing lets it be tested and demonstrated without a procurement
NDA.

## Limitations

- **Scoped to a nine-meal block.** The proposal was written around Excel Solver's variable
  limits; the build outgrew that and runs on SciPy's HiGHS MILP backend instead, but the
  nine-meal window stayed — a production version needs it extended to a full week.
- **Profiles solved independently, not jointly.** Each of the five clinical profiles gets
  its own MILP run. A real hospital runs many diet types out of one kitchen sharing a
  single ingredient pool — the harder and more interesting version is a shared-ingredient,
  multi-profile model solved simultaneously.
- **Deterministic costs.** Food prices move seasonally; the plan is optimal for the prices
  you fed it.
