---
title: 'Kitting 7 SKU families without stranding inventory'
tagline: 'A linear program that turns loose towel stock into sellable retail sets — with almost nothing left over.'
short: 'An LP that turns loose stock into sellable sets'
summary: 'My home-textiles brand receives towels as loose pieces and sells them as bundled sets. Packing by intuition strands odd inventory that can never be sold. I replaced the guesswork with a linear program that maximises how much stock becomes revenue.'
category: 'Optimization'
context: 'Hopefield — my own brand'
role: 'Founder, and the person who has to live with the answer'
timeline: '2026'
stack: ['Linear Programming', 'Excel Solver', 'Python', 'Inventory Planning']
metrics:
  - value: '28'
    label: 'decision variables across the model'
  - value: '7'
    label: 'line–colour families planned at once'
  - value: '3'
    label: 'towel types balanced simultaneously'
glance:
  problem: 'Towels arrive as loose bath, hand and washcloth pieces. They sell as fixed-composition sets. Pack the wrong mix and the remainder is capital that can never convert to revenue.'
  approach: 'Formulated the kitting decision as a linear program: how many of each set type to package, per line and colour, subject to real piece availability and a minimum production run on the hero SKU.'
  result: 'A packing plan the solver produces in seconds, replacing an estimate that used to take an evening and still left dead stock behind.'
links:
  - label: 'The LinkedIn write-up'
    href: 'https://www.linkedin.com/in/hassam-asghar-69628b219/recent-activity/all/'
featured: true
order: 1
---

## The problem nobody warns you about

Hopefield is a home-textiles brand I run on Amazon FBA and Shopify. The catalogue looks
simple from the outside — two fabric lines, seven colours — but the operational reality
underneath it is not.

Towels arrive from the mill as **loose pieces** in three types: bath, hand and washcloth.
Customers don't buy loose pieces. They buy **sets**, and each set has a fixed composition:

| Set configuration | Bath | Hand | Washcloth |
|---|---|---|---|
| Set of 6 (combo) | 2 | 2 | 2 |
| Set of 6 hand towels | — | 6 | — |
| Set of 4 bath towels | 4 | — | — |
| Set of 12 washcloths | — | — | 12 |

So every packing decision consumes pieces from a shared, finite pool — and the pools are
coupled. Every combo set I make burns two washcloths that are then unavailable for a
12-pack. Get the mix wrong and I'm left holding, say, 40 hand towels in Terra Cotta with
no bath towels to pair them with. Those 40 towels are not inventory. They're **capital
locked in a shape nobody buys.**

The naive approach — eyeball it, pack what feels right, deal with the remainder later —
is exactly how you end up with a warehouse full of unsellable odd lots.

## Why this is a linear program, not a spreadsheet

The tell is that this problem has all three ingredients of an optimization problem, not a
calculation problem:

- **A decision** — how many of each set type to package, for each line and colour.
- **A constraint set** — you cannot use more pieces than you physically have, and each
  piece type constrains independently.
- **An objective** — something you're actually trying to make as good as possible.

That last one is the part people skip. "Pack the towels" is not an objective. **"Minimise
the number of pieces left unallocated"** is. Once the goal is written that precisely, the
problem stops being a judgement call and becomes something a solver can settle exactly.

## Formulation

**Decision variables.** For each of the 7 line–colour families (Zero Twist in Sage Green,
White, Oatmeal Beige and Charcoal; Duvet Half Zero in Sage Green, Navy Blue and Terra
Cotta) and each of the 4 set configurations, an integer count of sets to package —
28 variables in total.

**Objective.** Minimise total unallocated pieces across bath, hand and washcloth. Framed
the other way: convert as much raw stock into sellable product as the compositions allow.

**Constraints.**

1. **Piece availability** — for each line, colour and towel type, pieces consumed across
   all set types cannot exceed pieces on hand. This is the binding constraint and the
   reason the answer isn't obvious: the three towel types compete for the same
   packing decisions.
2. **Non-negativity** — no negative production runs. Trivial to state, and the model
   returns nonsense without it.
3. **Minimum production run on the hero SKU** — the Set of 6 combo is the listing that
   drives the business, so it carries a floor quantity regardless of what pure
   piece-efficiency would prefer. This is where business judgement enters the model
   rather than overriding it afterwards.

That third constraint is the one I'd point to in an interview. A model that only minimises
waste will happily starve your best-selling listing to save a handful of washcloths. The
useful version encodes the commercial reality *as a constraint* and then optimises inside
it.

## What came out

The solver returns a complete packing plan: exactly how many of each set configuration to
build, per line, per colour — and it does it in seconds. What it replaced was an evening of
arithmetic that still left dead stock on the floor.

Two things I didn't expect going in:

- **The leftovers move to where they're cheapest.** Because washcloths are consumed twelve
  at a time in one configuration and two at a time in another, the model has real
  flexibility to push any unavoidable remainder into the piece type that's easiest to
  absorb in a future order.
- **It reprices the restock decision.** Once you can see exactly which piece type binds
  first for each colour, the next purchase order stops being "reorder everything
  proportionally" and starts being "buy the specific thing that unlocks the most sets."

## What I'd do differently

The current model is deterministic and single-period — it optimises today's stock against
today's compositions. The honest limitations:

- **Demand isn't in the objective.** Minimising leftover pieces implicitly assumes every
  set is equally sellable. It isn't. The next version should weight the objective by
  contribution margin or velocity per SKU, which turns it from a waste-minimisation
  problem into a profit-maximisation one.
- **It's a snapshot, not a policy.** A multi-period formulation with incoming purchase
  orders would let it decide not just *what to pack* but *when to hold pieces back*.
- **No uncertainty.** Real demand is stochastic. Stochastic programming or a simple
  scenario analysis over demand ranges would tell me how fragile the plan is.

I'd rather ship a model with known limits and state them than present a solver output as
if it were the truth.
