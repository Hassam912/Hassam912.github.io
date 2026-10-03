---
title: 'Brought stranded towel inventory to zero with a 28-variable LP'
tagline: 'An integer linear program that packs loose towels into sellable sets, leaves nothing over and protects the hero SKU.'
tldr: 'Towels arrive as loose bath, hand and washcloth pieces but sell as fixed sets. I built a 28-variable linear program that brought stranded inventory to zero, protects the hero SKU and solves in seconds.'
summary: 'An integer linear program that packs loose towels into sellable sets: stranded inventory to zero, hero-SKU minimum run protected, solved in seconds.'
category: 'Optimization'
context: 'Hopefield Home, the home-textiles brand I co-founded'
team: 'Solo'
role: 'Co-Founder & Operator: framed the packing decision, formulated and built the model in Excel Solver and Python, and ran the plan'
timeline: '2026'
stack: ['Linear Programming', 'Integer Programming', 'Excel Solver', 'Python', 'Inventory Planning']
headline:
  value: '0'
  label: 'pieces left stranded after the LP plan, against odd lots left over by manual packing'
result: 'Stranded inventory brought to zero while the hero SKU kept its minimum production run. Manual packing took an evening and still left unsellable odd lots.'
impact: 'A packing plan in seconds instead of an evening of arithmetic, every piece converted into a sellable set, and a clear signal for which piece type to reorder first.'
metrics:
  - value: '0'
    label: 'stranded pieces after the plan (manual packing left odd lots)'
  - value: 'Seconds'
    label: 'to solve, against an evening of manual arithmetic'
links: []
featured: true
order: 3
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Every loose piece lands in a sellable set</figcaption>

<svg viewBox="0 0 400 318" role="img" aria-labelledby="hfA-title hfA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-sans, sans-serif);">
<title id="hfA-title">Schematic of the kitting decision</title>
<desc id="hfA-desc">Three pools of loose pieces on the left (bath, hand and washcloth) feed four fixed set types on the right. The Set of 6 combo takes 2 bath, 2 hand and 2 washcloths; the Set of 6 hand towels takes 6 hand; the Set of 4 bath towels takes 4 bath; the Set of 12 washcloths takes 12 washcloths. Below, the plan leaves 0 pieces over while keeping the hero Set of 6 at or above its minimum run.</desc>
<text x="71" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)" style="font-family:var(--font-mono, monospace);letter-spacing:0.08em;">LOOSE PIECES</text>
<text x="307" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)" style="font-family:var(--font-mono, monospace);letter-spacing:0.08em;">SELLABLE SETS</text>
<line x1="126" y1="62" x2="230" y2="50" stroke="var(--accent)" stroke-width="1.6" />
<line x1="126" y1="62" x2="230" y2="154" stroke="var(--rule)" stroke-width="1.5" />
<line x1="126" y1="132" x2="230" y2="50" stroke="var(--accent)" stroke-width="1.6" />
<line x1="126" y1="132" x2="230" y2="102" stroke="var(--rule)" stroke-width="1.5" />
<line x1="126" y1="202" x2="230" y2="50" stroke="var(--accent)" stroke-width="1.6" />
<line x1="126" y1="202" x2="230" y2="206" stroke="var(--rule)" stroke-width="1.5" />
<rect x="16" y="40" width="110" height="44" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="71" y="67" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Bath</text>
<rect x="16" y="110" width="110" height="44" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="71" y="137" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Hand</text>
<rect x="16" y="180" width="110" height="44" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="71" y="207" text-anchor="middle" font-size="13" font-weight="600" fill="var(--ink-2)">Washcloth</text>
<rect x="230" y="30" width="154" height="40" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="307" y="47" text-anchor="middle" font-size="12.5" font-weight="700" fill="var(--accent-ink)">Set of 6 combo (hero)</text>
<text x="307" y="62" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)">2 bath · 2 hand · 2 wash</text>
<rect x="230" y="82" width="154" height="40" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="307" y="99" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Set of 6 hand</text>
<text x="307" y="114" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">6 hand</text>
<rect x="230" y="134" width="154" height="40" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="307" y="151" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Set of 4 bath</text>
<text x="307" y="166" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">4 bath</text>
<rect x="230" y="186" width="154" height="40" rx="9" fill="var(--paper-3)" stroke="var(--rule)" stroke-width="1" />
<text x="307" y="203" text-anchor="middle" font-size="12.5" font-weight="600" fill="var(--ink-2)">Set of 12 wash</text>
<text x="307" y="218" text-anchor="middle" font-size="10.5" fill="var(--ink-3)">12 washcloths</text>
<rect x="60" y="254" width="280" height="50" rx="9" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="1.6" />
<text x="200" y="276" text-anchor="middle" font-size="13.5" font-weight="700" fill="var(--accent-ink)">Left over after the plan: 0 pieces</text>
<text x="200" y="294" text-anchor="middle" font-size="10.5" fill="var(--accent-ink)">hero set kept at or above its minimum run</text>
</svg>

<figcaption class="chart-caption">Schematic of one line-colour family. The three piece pools compete: every combo set uses two washcloths that a 12-pack can no longer use. The model solves this for 7 families at once.</figcaption>
</figure>

## Packing by feel left capital locked in odd lots

Hopefield is a home-textiles brand I co-founded and run on Amazon FBA and Shopify. The catalogue
looks simple from outside: two fabric lines and seven colours. Underneath, every sale depends on a
packing decision.

Towels arrive from the mill as **loose pieces** in three types: bath, hand and washcloth. Customers
buy **sets** with a fixed composition. Each packing decision draws on a shared, finite pool, and the
pools are coupled. Get the mix wrong and the warehouse holds hand towels in one colour with no bath
towels left to pair them with. Those towels are capital locked in a shape nobody buys.

The decision I needed to make was simple to state: how many of each set to pack, per line and
colour, so that every piece becomes something sellable. Success meant zero pieces left over, without
starving the listing that drives the business.

## Before: an evening of arithmetic that still left dead stock

I used to plan this by hand. It took an evening of arithmetic and still left odd lots
behind, because a person balancing three piece types across seven families cannot see how one
choice ripples into the others. The inputs were the piece counts on hand for each line, colour and
towel type, and the four fixed set compositions:

<div class="table-scroll">

| Set configuration | Bath | Hand | Washcloth |
|---|---|---|---|
| Set of 6 (combo) | 2 | 2 | 2 |
| Set of 6 hand towels | 0 | 6 | 0 |
| Set of 4 bath towels | 4 | 0 | 0 |
| Set of 12 washcloths | 0 | 0 | 12 |

</div>

The seven line-colour families are Zero Twist in Sage Green, White, Oatmeal Beige and Charcoal, and
Duvet Half Zero in Sage Green, Navy Blue and Terra Cotta.

## How I built the model

### A precise objective turned a judgement call into a solvable problem

The problem has a decision (how many of each set to pack), constraints (no more pieces than are on
hand, per type) and an objective. The objective is the part people skip. An instruction to pack the
towels is a task. **Minimise the number of pieces left unallocated** is an objective, and once it was written that way
a solver could settle the question exactly. I rejected continuing with spreadsheet arithmetic because
it can check a plan but cannot search for the best one.

### Whole sets need integer variables

There are 28 decision variables: 7 line-colour families × 4 set types, each the number of sets to
pack. A plain linear program can return a fractional number of sets, and rounding afterwards can
break the piece limits or reopen leftovers. I declared the variables as integers so every answer is a
packable plan.

### The hero-SKU floor sits inside the model as a constraint

A model that only minimises waste will starve the best-selling listing to save a handful of
washcloths. The Set of 6 combo drives the business, so it carries a minimum production run inside
the model. The alternative was to optimise first and then bump the combo count by hand, which breaks
the piece balance the solver just found. Encoding the floor as a constraint lets business judgement
shape the answer while the solver still optimises everything around it.

### The binding piece type shows what to reorder

Because the solver reports which piece type runs out first in each colour, the next purchase order
can buy the specific piece that unlocks the most sets, instead of reordering everything in
proportion. The alternative, topping every piece type up by the same share, buys stock that the set
compositions cannot use and recreates the odd lots the model just removed. Reading the binding
constraint turns the packing model into a purchasing tool at no extra cost.

## Stranded inventory fell to zero, with the hero run protected

The solver returns a complete packing plan, per line and colour, in seconds. In that plan **zero
pieces are left stranded**, and the Set of 6 combo stays at or above its minimum run. The piece
constraints guarantee the plan never uses more than is on hand; zero unallocated means every piece
of every type in every family is used.

Reading the plan is simple: one row per line-colour family, one column per set type, and a count in
each cell that can go straight onto the packing list.

One result I didn’t expect: washcloths are consumed twelve at a time in one set and two at a time in
another, which gives the model room to absorb an awkward remainder that I would have written off by
hand.

## Recommendation: re-solve before every packing run

Run the model each time stock arrives or the set mix changes, and treat the binding piece type as
the first line of the next purchase order. The plan takes seconds, so there is no reason to pack
from memory again.

## Limitations and what I’d do next

- **Demand is not in the objective.** Minimising leftovers assumes every set sells equally well. The
  next version should weight sets by sales velocity, turning waste minimisation into profit
  maximisation.
- **It plans one snapshot.** A multi-period model with incoming purchase orders could decide when to
  hold pieces back, as well as what to pack.
- **No uncertainty.** Demand is stochastic. A scenario analysis over demand ranges would show how
  fragile the plan is.
- **Plan-versus-actual is not measured yet.** The next check is whether the packed sets sold through
  as expected.

<details class="appendix">
<summary>Technical appendix</summary>

**Formulation**

Indices: family *f* ∈ 7 line-colour families; set type *s* ∈ {combo, hand 6, bath 4, wash 12};
piece type *p* ∈ {bath, hand, washcloth}.

- **Decision variables.** *x<sub>f,s</sub>* = number of sets of type *s* packed for family *f*;
  integers, 7 × 4 = 28 variables.
- **Objective.** Minimise total unallocated pieces:
  Σ<sub>f,p</sub> ( on-hand<sub>f,p</sub> − Σ<sub>s</sub> a<sub>s,p</sub> · x<sub>f,s</sub> ),
  where *a<sub>s,p</sub>* is the number of pieces of type *p* in set *s* (table above).

**Constraints**

1. **Piece availability.** For each family and piece type, Σ<sub>s</sub> a<sub>s,p</sub> ·
   x<sub>f,s</sub> ≤ on-hand<sub>f,p</sub>. This is the binding constraint, and the reason the answer
   is not obvious: the three piece types compete for the same packing decisions.
2. **Non-negativity and integrality.** x<sub>f,s</sub> ≥ 0 and integer. Without non-negativity the
   model returns negative production runs.
3. **Minimum run on the hero SKU.** x<sub>f,combo</sub> ≥ the floor set for the Set of 6 combo,
   regardless of what pure piece-efficiency would prefer.

**Tools.** Built and solved with Excel Solver and Python.

</details>
