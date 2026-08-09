---
title: 'Finding undervalued footballers in Europe’s Big Five'
tagline: 'A market-value model over 4,056 player-seasons that separates what a player does from what the market pays for it.'
short: 'Finding footballers the market underprices'
navLabel: 'Transfer values'
summary: 'Transfer fees are set by narrative as much as by performance. We merged three sources into one 203-feature dataset, tested four hypotheses about how the market actually prices players, then modelled valuation to surface the gap between output and price.'
category: 'Machine Learning'
context: 'MMA 860 — Queen’s University'
role: 'Team lead on data assembly, hypothesis design and modelling'
timeline: '2026'
stack: ['Python', 'pandas', 'scikit-learn', 'statsmodels', 'ANOVA', 'VIF']
metrics:
  - value: '4,056'
    label: 'player-seasons across Europe’s Big Five'
  - value: '203'
    label: 'features after merge and engineering'
  - value: '4'
    label: 'formal hypotheses tested'
glance:
  problem: 'Clubs overpay for visible output — goals, and a Premier League badge. If the market systematically misprices certain profiles, those players are a buying opportunity.'
  approach: 'Merged FBref performance data, Transfermarkt valuations and league financials; ran VIF to control collinearity; tested four hypotheses about market bias; then modelled log market value and measured residuals.'
  result: 'A ranked list of players whose modelled value exceeds their market price — plus statistical evidence for which biases are real and which are folklore.'
links:
  - label: 'Notebook & model results on GitHub'
    href: 'https://github.com/Hassam912/soccer-transfer-value-model'
featured: true
order: 2
---

## The question

A forward who scores fifteen goals might be valued at €50M. A centre-back with four
interceptions a game and 90% passing accuracy might be valued at €25M — even though both
are performing at an elite level for their position.

That gap is the whole project. **The transfer market does not price all contributions
equally.** Some of that is rational — goals win games, and scarcity is real. Some of it is
narrative: visibility, league prestige, age optics, agent noise. If you can separate the
rational part from the narrative part, the residual is a shopping list.

So: *can we predict what the market will pay for a player from what that player actually
does — and are the players the model disagrees with systematically undervalued?*

## Why three data sources

No single dataset contains both what a player does and what the market thinks they're
worth. We assembled three, each contributing something the others could not:

| Source | Contributes | Why it was necessary |
|---|---|---|
| **FBref** | Per-90 performance across shooting, passing, possession, defensive actions, goalkeeping | The behavioural ground truth — what actually happened on the pitch |
| **Transfermarkt** | Market valuations by season | The target variable. Without it there is nothing to predict |
| **League financials** | Total revenue per league-season | Controls for the fact that richer leagues inflate every price inside them |

The join was on player-season, with league financials joined on league and season. The
result: **4,056 player-seasons, 203 columns**, split temporally — 2021–22 and 2022–23 for
training, 2023–24 held out as the test season.

**The split is temporal on purpose.** A random split would let the model see a player's
2023–24 valuation while training on their 2022–23 one, and player valuations are heavily
autocorrelated. That would produce a beautiful score and a useless model. Splitting by
season forces it to do the real task: predict a valuation it has never seen for a season
it knows nothing about.

## Guarding against leakage

More time went into deciding what to *exclude* than what to include. Explicitly dropped:

- `market_value_eur` — the raw target
- `highest_market_value_in_eur` — circular; it encodes future valuations
- `valuation_date`, `contract_expiration` — leak information from after the prediction point

The target itself is **log market value**, not raw euros. Transfer values are heavily
right-skewed — a handful of superstars sit orders of magnitude above the median — and
regression on raw euros lets those few observations dominate the loss. Logging makes the
residual structure roughly homoscedastic and turns the model's errors into something
closer to *percentage* error, which is how club valuations are actually reasoned about.

## Multicollinearity

203 football statistics are enormously redundant. `passes_completed`, `passes` and
`passes_pct` are three views of one thing; touches by pitch zone sum to total touches.
Feeding that directly into a linear model produces unstable, uninterpretable coefficients.

We ran **variance inflation factor analysis on the training data only** — running it on
the full dataset would leak test-season structure into a preprocessing decision — and
pruned iteratively.

One judgement call worth recording: `plus_minus_per90` was the single strongest predictor
in the model (t ≈ 27), and it was also collinear with several team-level features. We kept
it and dropped its correlates instead of the reverse. **Statistical hygiene shouldn't cost
you your most informative variable** — when VIF forces a choice, drop the one that explains
less.

## The four hypotheses

Rather than jumping straight to prediction, we tested the market biases explicitly. A model
that predicts well but can't tell you *why* the market misprices anyone is not an
investment thesis.

1. **League premium** — do Premier League players command higher values than statistically
   comparable players elsewhere? Tested with ANOVA on log market value, controlling for
   performance.
2. **Positional valuation gap** — are forwards valued above defenders after controlling for
   age and minutes played?
3. **Age–performance interaction** — does the market discount older players for identical
   statistical output?
4. **Contract length effect** — do players with longer remaining contracts command higher
   valuations? (They should — leverage sits with the selling club.)

Testing these separately matters because each one is a *different kind of inefficiency*. A
league premium is arbitrage across competitions. An age discount is arbitrage across time.
They imply different buying strategies.

## The mistake I want to keep in the write-up

The first version of the undervalued-player ranking returned a defender with a predicted
value of **€1.55 × 10²⁹**. Which is, generously, more money than exists.

The cause was a classic one: the model predicts in **log space**, and I compared predictions
to actual values without correctly back-transforming — so a modest error in logs became an
astronomical error in euros, and the "most undervalued player" ranking was really just
sorting by *whose back-transform blew up worst*.

I'm keeping this in the case study deliberately. The lesson isn't "check your maths" — it's
that **a result which is absurd on its face is a gift**, because it's the only kind of bug
that announces itself. The dangerous version of this error is the one that produces a
plausible-looking number. The fix — back-transforming both sides consistently and ranking
on the residual in log space rather than on a euro difference — is small. Catching it
required looking at the output and asking whether it made sense in the real world, which is
a habit no cross-validation score will give you.

## What it's for

The output is a ranked list of players whose modelled value exceeds their market price,
alongside statistical evidence for which market biases are real. For a club with a finite
budget, that's a shortlist — and, more usefully, a *reason* attached to each name: this
player is cheap because he plays in the wrong league, that one because he's on the wrong
side of thirty for a market that over-weights age.

<figure class="chart-figure">
<figcaption class="chart-title">Actual vs. model-predicted value — top 5 undervalued, 2023–24 test season</figcaption>

<svg viewBox="0 0 660 314" role="img" aria-labelledby="chart3-title chart3-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chart3-title">Actual vs modelled market value, top 5 undervalued players</title>
<desc id="chart3-desc">Dumbbell chart. For each of five players, a line from their actual Transfermarkt value to the model predicted value. Florian Lejeune shows the largest gap, from 3 million euros actual to 127 million predicted.</desc>
<line x1="150.0" y1="28" x2="150.0" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="150.0" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€0M</text>
<line x1="235.7" y1="28" x2="235.7" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="235.7" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€50M</text>
<line x1="321.4" y1="28" x2="321.4" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="321.4" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€100M</text>
<line x1="407.1" y1="28" x2="407.1" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="407.1" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€150M</text>
<line x1="492.9" y1="28" x2="492.9" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="492.9" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€200M</text>
<line x1="578.6" y1="28" x2="578.6" y2="268" stroke="var(--rule)" stroke-width="1" />
<text x="578.6" y="20" text-anchor="middle" font-size="10" fill="var(--ink-3)">€250M</text>
<text x="136.0" y="54.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Harry Kane</text>
<text x="136.0" y="68.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Centre-Forward</text>
<line x1="321.4" y1="57.0" x2="591.4" y2="57.0" stroke="var(--rule)" stroke-width="2" />
<circle cx="321.4" cy="57.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Harry Kane — actual: €100M</title></circle>
<circle cx="591.4" cy="57.0" r="5.5" fill="var(--accent)"><title>Harry Kane — model value: €258M</title></circle>
<text x="602.4" y="60.5" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+€158M</text>
<text x="136.0" y="100.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Florian Wirtz</text>
<text x="136.0" y="114.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Att. Midfield</text>
<line x1="372.9" y1="103.0" x2="600.5" y2="103.0" stroke="var(--rule)" stroke-width="2" />
<circle cx="372.9" cy="103.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Florian Wirtz — actual: €130M</title></circle>
<circle cx="600.5" cy="103.0" r="5.5" fill="var(--accent)"><title>Florian Wirtz — model value: €263M</title></circle>
<text x="611.5" y="106.5" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+€133M</text>
<text x="136.0" y="146.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Florian Lejeune</text>
<text x="136.0" y="160.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Centre-Back</text>
<line x1="155.1" y1="149.0" x2="368.4" y2="149.0" stroke="var(--rule)" stroke-width="2" />
<circle cx="155.1" cy="149.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Florian Lejeune — actual: €3M</title></circle>
<circle cx="368.4" cy="149.0" r="5.5" fill="var(--accent)"><title>Florian Lejeune — model value: €127M</title></circle>
<text x="379.4" y="152.5" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+€124M</text>
<text x="136.0" y="192.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Jamal Musiala</text>
<text x="136.0" y="206.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Att. Midfield</text>
<line x1="355.7" y1="195.0" x2="522.5" y2="195.0" stroke="var(--rule)" stroke-width="2" />
<circle cx="355.7" cy="195.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Jamal Musiala — actual: €120M</title></circle>
<circle cx="522.5" cy="195.0" r="5.5" fill="var(--accent)"><title>Jamal Musiala — model value: €217M</title></circle>
<text x="533.5" y="198.5" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+€97M</text>
<text x="136.0" y="238.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Martin Ødegaard</text>
<text x="136.0" y="252.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Att. Midfield</text>
<line x1="338.6" y1="241.0" x2="502.1" y2="241.0" stroke="var(--rule)" stroke-width="2" />
<circle cx="338.6" cy="241.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Martin Ødegaard — actual: €110M</title></circle>
<circle cx="502.1" cy="241.0" r="5.5" fill="var(--accent)"><title>Martin Ødegaard — model value: €205M</title></circle>
<text x="513.1" y="244.5" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+€95M</text>
<circle cx="150" cy="298" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2" />
<text x="161" y="302" font-size="10.5" fill="var(--ink-2)">Actual (Transfermarkt)</text>
<circle cx="335" cy="298" r="5.5" fill="var(--accent)" />
<text x="347" y="302" font-size="10.5" fill="var(--ink-2)">Model-predicted value</text>
</svg>

<figcaption class="chart-caption">Florian Lejeune is the extreme case: a €3M valuation against a €127M model prediction — a centre-back whose defensive output (15 interceptions) the market appears to almost entirely ignore. The three attacking midfielders (Wirtz, Musiala, Ødegaard) show the same pattern at smaller scale: heavy progressive-carry and defensive-contribution numbers the transfer market underweights relative to goals.</figcaption>
</figure>

## Limitations

- **Market value is not transfer fee.** Transfermarkt valuations are crowd-informed
  estimates, not observed transactions. The model predicts perceived value, and the honest
  framing is that it finds players the *market's own consensus* underrates.
- **Injuries aren't in the feature set**, and they're a large part of why some players look
  cheap.
- **Three seasons is a short panel** for claims about structural market bias.
