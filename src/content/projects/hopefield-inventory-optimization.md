---
title: 'Packed 6,000 loose towels into 1,000 sets with zero left over'
tagline: 'An integer program in Excel Solver that turns a towel order into sellable sets without stranding a single piece.'
tldr: 'Towels arrive as loose pieces but sell as fixed sets. My Excel Solver model packed a 6,000-piece order into 1,000 sets with zero left over, where packing the obvious way strands 42.'
summary: 'An integer program in Excel Solver for Hopefield Home: 6,000 loose towels packed into 1,000 sets with zero left over, every colour above its combo floor.'
category: 'Optimization'
context: 'Hopefield Home, the home-textiles brand I co-founded'
team: 'Solo'
role: 'Framed the packing decision, built the integer program in Excel Solver, and turned it into a reusable model for each purchase order'
timeline: '2026'
stack: ['Excel Solver', 'Integer Programming', 'Linear Programming', 'Inventory Planning', 'Python']
headline:
  value: '0 of 6,000'
  label: 'pieces stranded, against 42 when each colour’s minimum is packed first'
result: 'All 6,000 pieces packed into 1,000 sellable sets (730 combos, 270 single-type sets) with zero left over and every colour at or above its combo floor. Packing the floors first and splitting the rest strands 42 pieces.'
impact: 'Every towel becomes a sellable set, six of seven colours get all four listings, and the plan re-solves in seconds for each new order instead of an evening of arithmetic.'
metrics:
  - value: '0'
    label: 'pieces stranded of 6,000 (42 with the rule of thumb)'
  - value: '1,000'
    label: 'sellable sets: 730 combos and 270 single-type sets'
  - value: '6 of 7'
    label: 'colours with all four listings (the seventh is all combos by design)'
links: []
featured: true
order: 3
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">The rule of thumb strands 42 pieces; the LP strands none</figcaption>

<svg viewBox="0 0 640 282" role="img" aria-labelledby="hfA-title hfA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="hfA-title">Pieces left stranded per colour: rule of thumb versus the LP plan</title>
<desc id="hfA-desc">Bars show pieces stranded if each colour's minimum combo sets are packed first and the rest is split into single-type sets: Zero Twist Sage Green 0, White 6, Oatmeal Beige 6, Charcoal 6, Half Zero Sage Green 10, Navy Blue 8, Terra Cotta 6, total 42. Dots show the LP plan, which strands 0 in every colour.</desc>
<line x1="210.0" y1="26" x2="210.0" y2="276" stroke="var(--rule)" stroke-width="1" />
<text x="210.0" y="20" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0</text>
<line x1="303.3" y1="26" x2="303.3" y2="276" stroke="var(--rule)" stroke-width="1" />
<text x="303.3" y="20" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">4</text>
<line x1="396.7" y1="26" x2="396.7" y2="276" stroke="var(--rule)" stroke-width="1" />
<text x="396.7" y="20" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">8</text>
<line x1="490.0" y1="26" x2="490.0" y2="276" stroke="var(--rule)" stroke-width="1" />
<text x="490.0" y="20" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">12</text>
<text x="198" y="55.0" text-anchor="end" font-size="11" fill="var(--ink)">Zero Twist · Sage Green</text>
<text x="218.0" y="55.0" font-size="10.5" fill="var(--ink-3)">0</text>
<circle cx="210" cy="51.0" r="5" fill="var(--accent)"><title>Zero Twist · Sage Green: 0 stranded under the LP plan</title></circle>
<text x="198" y="89.0" text-anchor="end" font-size="11" fill="var(--ink)">Zero Twist · White</text>
<rect x="210" y="77.0" width="140.0" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Zero Twist · White: 6 pieces stranded by packing the floor first</title></rect>
<text x="358.0" y="89.0" font-size="10.5" fill="var(--ink-3)">6</text>
<circle cx="210" cy="85.0" r="5" fill="var(--accent)"><title>Zero Twist · White: 0 stranded under the LP plan</title></circle>
<text x="198" y="123.0" text-anchor="end" font-size="11" fill="var(--ink)">Zero Twist · Oatmeal Beige</text>
<rect x="210" y="111.0" width="140.0" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Zero Twist · Oatmeal Beige: 6 pieces stranded by packing the floor first</title></rect>
<text x="358.0" y="123.0" font-size="10.5" fill="var(--ink-3)">6</text>
<circle cx="210" cy="119.0" r="5" fill="var(--accent)"><title>Zero Twist · Oatmeal Beige: 0 stranded under the LP plan</title></circle>
<text x="198" y="157.0" text-anchor="end" font-size="11" fill="var(--ink)">Zero Twist · Charcoal</text>
<rect x="210" y="145.0" width="140.0" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Zero Twist · Charcoal: 6 pieces stranded by packing the floor first</title></rect>
<text x="358.0" y="157.0" font-size="10.5" fill="var(--ink-3)">6</text>
<circle cx="210" cy="153.0" r="5" fill="var(--accent)"><title>Zero Twist · Charcoal: 0 stranded under the LP plan</title></circle>
<text x="198" y="191.0" text-anchor="end" font-size="11" fill="var(--ink)">Half Zero · Sage Green</text>
<rect x="210" y="179.0" width="233.3" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Half Zero · Sage Green: 10 pieces stranded by packing the floor first</title></rect>
<text x="451.3" y="191.0" font-size="10.5" fill="var(--ink-3)">10</text>
<circle cx="210" cy="187.0" r="5" fill="var(--accent)"><title>Half Zero · Sage Green: 0 stranded under the LP plan</title></circle>
<text x="198" y="225.0" text-anchor="end" font-size="11" fill="var(--ink)">Half Zero · Navy Blue</text>
<rect x="210" y="213.0" width="186.7" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Half Zero · Navy Blue: 8 pieces stranded by packing the floor first</title></rect>
<text x="404.7" y="225.0" font-size="10.5" fill="var(--ink-3)">8</text>
<circle cx="210" cy="221.0" r="5" fill="var(--accent)"><title>Half Zero · Navy Blue: 0 stranded under the LP plan</title></circle>
<text x="198" y="259.0" text-anchor="end" font-size="11" fill="var(--ink)">Half Zero · Terra Cotta</text>
<rect x="210" y="247.0" width="140.0" height="16" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Half Zero · Terra Cotta: 6 pieces stranded by packing the floor first</title></rect>
<text x="358.0" y="259.0" font-size="10.5" fill="var(--ink-3)">6</text>
<circle cx="210" cy="255.0" r="5" fill="var(--accent)"><title>Half Zero · Terra Cotta: 0 stranded under the LP plan</title></circle>
<text x="520" y="55.0" font-size="10" fill="var(--accent-ink)" font-weight="600">● LP plan: 0</text>
<text x="520" y="89.0" font-size="10" fill="var(--ink-3)">▬ floor first: 42</text>
</svg>

<figcaption class="chart-caption">Bars: pieces left over if each colour’s minimum combo sets are packed first and the rest is split into single-type sets. Dots: the LP plan. Computed from the order quantities and floors in the model workbook.</figcaption>
</figure>

## A 6,000-piece order had to become sets without stranding any

Hopefield is a home-textiles brand I co-founded and run on Amazon FBA and Shopify. Our order
arrives as **loose towels**: bath towels, hand towels and washcloths in seven colours across two
fabric lines. Customers buy **sets**. Every packing choice draws on shared piece pools, so a bad mix
leaves, say, two hand towels in a colour with no bath towels to pair them with. Those pieces are
cash tied up in stock nobody can buy.

The decision was how many of each set to pack in each colour. Success meant two things: no piece
left over, and enough of the main listing, the Set of 6 combo, in every colour.

## The order came in equal pieces, but the sets need different multiples

The order was 1,000 combo-set equivalents: 2 bath, 2 hand and 2 washcloths per set, so 6,000 pieces.
Each colour had equal counts of the three towel types, from 100 of each (White, Terra Cotta) to 500
of each (Navy Blue). We sell four set types:

<div class="table-scroll">

| Set | Bath | Hand | Washcloth |
|---|---|---|---|
| Set of 6 combo | 2 | 2 | 2 |
| Set of 6 hand towels | 0 | 6 | 0 |
| Set of 4 bath towels | 4 | 0 | 0 |
| Set of 12 washcloths | 0 | 0 | 12 |

</div>

The difficulty is in the multiples. After the combos, the remaining bath towels must divide by 4,
the hand towels by 6 and the washcloths by 12. Because all three pools shrink together, the remainder
must be a multiple of 12, and the number of combos decides whether it is.

## How I built the model

### Leftover pieces became the objective, and combo floors became constraints

I wrote the decision as an optimisation problem: 28 decision variables (7 colours × 4 set types),
each the number of sets to pack. The objective is to **minimise the total pieces left over**. Two
constraints keep it honest: leftovers can never go negative, so the plan never uses towels we don’t
have, and each colour must pack at least a minimum number of combo sets, the floor I set for our main
listing. I rejected doing it in a spreadsheet by trial and error, because a spreadsheet can check a
plan but can’t search for the best one.

### Whole sets need integer variables

A plain linear program can return 26.4 sets, and rounding afterwards can reopen leftovers or use
pieces that don’t exist. I set every decision variable to integer and solved with Excel’s Simplex LP
engine, so every answer is a plan someone can pack.

### One input per colour makes it reusable for the next order

My first version hard-coded the piece counts. The final version takes one number per colour, the
order quantity, and calculates the pieces from it. Changing the order and pressing Solve produces a
new plan in seconds.

## Zero of 6,000 pieces stranded; packing the obvious way strands 42

The solver returned this plan, with **zero pieces left over** in every colour:

<div class="table-scroll">

| Line · colour | Pieces of each type | Combo floor | Combos | Hand 6 | Bath 4 | Wash 12 |
|---|---|---|---|---|---|---|
| Zero Twist · Sage Green | 400 | 200 | **200** | 0 | 0 | 0 |
| Zero Twist · White | 100 | 25 | **26** | 8 | 12 | 4 |
| Zero Twist · Oatmeal Beige | 250 | 100 | **101** | 8 | 12 | 4 |
| Zero Twist · Charcoal | 250 | 100 | **101** | 8 | 12 | 4 |
| Half Zero · Sage Green | 400 | 100 | **104** | 32 | 48 | 16 |
| Half Zero · Navy Blue | 500 | 170 | **172** | 26 | 39 | 13 |
| Half Zero · Terra Cotta | 100 | 25 | **26** | 8 | 12 | 4 |
| **Total** | **6,000 pieces** | 720 | **730** | 90 | 135 | 45 |

</div>

The obvious way to plan by hand is to pack each colour’s floor, then split what’s left into
single-type sets. That leaves remainders that don’t divide: White, for example, keeps 50 of each
type, which strands 2 hand towels, 2 bath towels and 2 washcloths. Across the seven colours that
approach strands **42 pieces**. The model adds just 1 to 4 combos above the floor in each colour,
10 in total, so every remainder becomes a multiple of 12 and every piece lands in a set.

To check it, I re-solved the same problem as an integer program in Python (SciPy’s HiGHS solver).
It confirmed zero leftover and found exactly this plan as the zero-waste option with the most
single-type sets.

## Recommendation: re-solve for every order, and add a tiebreak

Run the model for each purchase order before packing. Then add a second objective. Zero leftover has
many solutions: packing all 1,000 as combos also wastes nothing but drops the single-type listings.
The plan the solver returned happens to keep the most single-type sets, which is what we wanted, but
the model should state that preference instead of relying on it.

## Limitations and what I’d do next

- **Demand isn’t in the model.** It wastes nothing, but it doesn’t know which sets sell fastest.
  Weighting sets by sales velocity would turn waste minimisation into profit maximisation.
- **The objective has many optimal answers.** As above, a stated tiebreak should choose between
  zero-waste plans.
- **The floors are judgement calls.** They come from my read of the main listing, not from a demand
  forecast.
- **Plan versus actual isn’t measured yet.** The next check is whether each set sold through as
  expected, which would also tell me whether the floors were right.

<details class="appendix">
<summary>Technical appendix</summary>

**Formulation** (as built in the workbook)

- **Decision variables.** *x<sub>c,s</sub>* = sets of type *s* packed in colour *c*; 7 × 4 = 28,
  integer.
- **Leftovers.** For each colour and towel type: pieces − 2 × combos − set size × single-type sets.
- **Objective.** Minimise the sum of the 21 leftover cells.
- **Constraints.** All variables integer; combos ≥ the colour’s floor and single-type sets ≥ 0; every
  leftover ≥ 0.
- **Inputs.** Order quantity per colour; pieces of each type = 2 × order quantity.

**Solver settings.** Excel Solver, Simplex LP engine, minimise, integer constraint on all decision
variables, integer optimality tolerance 1%. The model solves in seconds.

**Floor-first remainders** (pieces of each type left after packing exactly the floor):

| Colour | Remainder | Stranded (hand mod 6 + bath mod 4 + wash mod 12) |
|---|---|---|
| ZT Sage Green | 0 | 0 |
| ZT White | 50 | 2 + 2 + 2 = 6 |
| ZT Oatmeal Beige | 50 | 6 |
| ZT Charcoal | 50 | 6 |
| HZ Sage Green | 200 | 2 + 0 + 8 = 10 |
| HZ Navy Blue | 160 | 4 + 0 + 4 = 8 |
| HZ Terra Cotta | 50 | 6 |

</details>
