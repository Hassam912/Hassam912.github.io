---
title: 'Pricing the cost of variety in hospital meal planning'
tagline: 'A mixed-integer program that feeds patients within clinical limits, on budget — and tells the manager exactly what menu variety costs.'
summary: 'Hospital food managers face a trilemma: cut ingredient cost, satisfy strict clinical nutrition bounds, and keep menus varied enough that patients keep eating. I built a MILP that solves all three at once, then used shadow prices to show which clinical rule drives the most cost.'
category: 'Optimization'
context: 'MMA 861 — Queen’s University'
role: 'Model formulation, constraint design and sensitivity analysis'
timeline: '2026'
stack: ['Mixed-Integer Programming', 'Excel Solver', 'Python', 'Shadow Price Analysis', 'USDA / Health Canada data']
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

- **Scoped to a nine-meal block** to stay inside Excel Solver's variable and constraint
  limits. A production version needs a proper solver (Gurobi, CBC) to plan a full week
  across multiple patient types simultaneously.
- **One patient profile at a time.** A real hospital runs many diet types concurrently and
  shares a kitchen — the interesting version is a shared-ingredient, multi-profile model.
- **Deterministic costs.** Food prices move seasonally; the plan is optimal for the prices
  you fed it.
