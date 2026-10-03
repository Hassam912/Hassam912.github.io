---
title: 'Showed the transfer market pays forwards a 76% premium over defenders'
tagline: 'A valuation model and four hypothesis tests on 4,056 Big Five player-seasons, tested on an unseen season.'
tldr: 'Does the transfer market price output fairly? I led a team modelling 4,056 Big Five player-seasons (R² 0.72 on an unseen season). After controls, forwards are valued 76% above defenders; each contract year adds 15%.'
summary: 'MMA 860 team project: a log-value model of 4,056 Big Five player-seasons (test R² 0.72) and four tests of how the transfer market prices players.'
category: 'Predictive Modelling'
context: 'MMA 860 · Smith School of Business, Queen’s University'
team: 'Team of 7 · team lead'
role: 'Team lead: led data assembly across three sources, designed the four hypothesis tests and led the modelling'
timeline: '2026'
stack: ['Python', 'pandas', 'statsmodels', 'scikit-learn', 'Ridge / Lasso', 'ANOVA']
headline:
  value: '+76%'
  label: 'market value of forwards over defenders after age and minutes (95% CI +61% to +92%)'
result: 'On the held-out 2023–24 season, Ridge regression explained 72% of the variance in log market value (R² 0.72, where predicting the average scores 0). League, position and contract length all moved value significantly; there was no sign of a discount on older players’ goals.'
impact: 'For a recruitment team, a large gap between model and market is a lead to scout. A typical miss is a factor of about 1.9 either way, so the model can build a shortlist but cannot price a player on its own.'
metrics:
  - value: 'R² 0.72'
    label: 'on the unseen 2023–24 season (Ridge), vs 0.79 in training'
  - value: '−13%'
    label: 'market value per extra year of age, after position and minutes'
  - value: '+15%'
    label: 'market value per extra contract year, with all controls'
links:
  - label: 'Notebook & model results on GitHub'
    href: 'https://github.com/Hassam912/soccer-transfer-value-model'
featured: false
order: 7
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Forwards carry a 76% premium, and the market does not discount older scorers</figcaption>

<svg viewBox="0 0 640 236" role="img" aria-labelledby="socA-title socA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="socA-title">Estimated effects on market value, with 95% confidence intervals</title>
<desc id="socA-desc">Dot plot of percentage change in market value with 95% confidence intervals, from regressions on the 2021–22 and 2022–23 seasons. Forwards are valued 76% above defenders (61% to 92%). Each extra contract year adds 15% (13% to 18%). Each extra year of age costs 13% (12% to 14%). The age-by-goals interaction is about zero (minus 5% to plus 4%) and not significant.</desc>
<line x1="250.0" y1="30" x2="250.0" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="250.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">−20%</text>
<line x1="308.3" y1="30" x2="308.3" y2="206" stroke="var(--rule)" stroke-width="1.5" />
<text x="308.3" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0</text>
<line x1="366.7" y1="30" x2="366.7" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="366.7" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">+20%</text>
<line x1="425.0" y1="30" x2="425.0" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="425.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">+40%</text>
<line x1="483.3" y1="30" x2="483.3" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="483.3" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">+60%</text>
<line x1="541.7" y1="30" x2="541.7" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="541.7" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">+80%</text>
<line x1="600.0" y1="30" x2="600.0" y2="206" stroke="var(--rule)" stroke-width="1" />
<text x="600.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">+100%</text>
<text x="236" y="55" text-anchor="end" font-size="11.5" fill="var(--ink)">Forward vs defender</text>
<text x="236" y="68" text-anchor="end" font-size="9.5" fill="var(--ink-3)">after age and minutes (H2)</text>
<line x1="485.7" y1="59" x2="575.9" y2="59" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" />
<circle cx="529.0" cy="59" r="5.5" fill="var(--accent)"><title>Forward vs defender: +76% (95% CI +61% to +92%)</title></circle>
<text x="584.9" y="63" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+76%</text>
<text x="236" y="99" text-anchor="end" font-size="11.5" fill="var(--ink)">Each contract year left</text>
<text x="236" y="112" text-anchor="end" font-size="9.5" fill="var(--ink-3)">explanatory model, all controls</text>
<line x1="345.2" y1="103" x2="361.3" y2="103" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" />
<circle cx="353.1" cy="103" r="5.5" fill="var(--accent)"><title>Each contract year left: +15% (95% CI +13% to +18%)</title></circle>
<text x="370.3" y="107" font-size="10.5" fill="var(--accent-ink)" font-weight="600">+15%</text>
<text x="236" y="143" text-anchor="end" font-size="11.5" fill="var(--ink)">Each year of age</text>
<text x="236" y="156" text-anchor="end" font-size="9.5" fill="var(--ink-3)">after position and minutes (H2)</text>
<line x1="268.2" y1="147" x2="273.5" y2="147" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" />
<circle cx="270.8" cy="147" r="5.5" fill="var(--accent)"><title>Each year of age: −13% (95% CI −14% to −12%)</title></circle>
<text x="282.5" y="151" font-size="10.5" fill="var(--accent-ink)" font-weight="600">−13%</text>
<text x="236" y="187" text-anchor="end" font-size="11.5" fill="var(--ink)">Age × goals per 90</text>
<text x="236" y="200" text-anchor="end" font-size="9.5" fill="var(--ink-3)">interaction (H3), p = 0.82</text>
<line x1="293.0" y1="191" x2="321.1" y2="191" stroke="var(--ink-3)" stroke-width="2" stroke-linecap="round" />
<circle cx="306.7" cy="191" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Age × goals per 90: −1% (95% CI −5% to +4%), not significant</title></circle>
<text x="330.1" y="195" font-size="10.5" fill="var(--ink-3)" font-weight="400">≈ 0</text>
<text x="250" y="230" font-size="9.5" fill="var(--ink-3)">% change in market value · line = 95% confidence interval</text>
</svg>

<figcaption class="chart-caption">Effects on market value from regressions on the two training seasons, converted from log points to percentages. Position, contract length and age all move value, with tight intervals. The age-by-scoring interaction sits on zero: once age itself is accounted for, there is no sign that the market values an older player’s goals differently.</figcaption>
</figure>

## Clubs pay for visible output, so the market may misprice whole groups of players

A forward who scores fifteen goals might be valued at €50M, while a centre-back with elite
defensive numbers might be valued at €25M. Some of that gap is rational, because goals win games.
Some may come from visibility, league prestige or age. If the market misprices whole groups of
players, a club with a fixed budget can buy where the market is cheap. Our question had two
parts: **how well can on-pitch output, age, contract and league predict a player’s market value in
a season the model has never seen, and which pricing patterns hold up as statistically real?**
Success meant a test-season fit well above the average-value baseline and a clear verdict on
each of four hypotheses.

## Three sources joined into 4,056 player-seasons and 203 columns

- **FBref:** per-90 performance for shooting, passing, possession and defensive actions.
- **Transfermarkt:** market valuations by season, the target.
- **League financials:** revenue per league and season, to separate “plays well” from “plays in
  a rich league”.

Every row is one player in one season of the Premier League, La Liga, Serie A, Bundesliga or
Ligue 1, with at least 900 minutes played. The two hardest problems were matching players across
FBref and Transfermarkt, which share no ID, and contract dates missing for 382 players (9.4%),
which we flagged instead of dropping. We removed every column that leaks the answer: the raw
value, the player’s highest-ever value (it encodes future valuations), the valuation date and the
contract expiry date.

## Four design choices kept the test honest and the effects readable

### A season split tests the real task, so we rejected a random split

Training used 2021–22 and 2022–23 (2,876 player-seasons) and testing used 2023–24 (1,179 after
dropping incomplete rows). A player’s valuation carries over strongly from one season to the
next, so a random split would let the model see a player’s later value while training on the
earlier one. It would score well and predict nothing. The season split asks the model to value
players in a season it knows nothing about.

### We modelled log value because a handful of stars would dominate a model in euros

Most players are valued at €1M to €15M, and the most expensive reach €180M. On raw euros, the
few most expensive players would decide the fit. On log value, errors behave like percentage errors, which is how clubs
compare prices, and every effect reads as a percentage change. Logging did not make the errors
even across the range in the full model: a Breusch-Pagan test found heteroscedasticity (p ≈ 0),
so standard errors in that model need a robust correction. The smaller explanatory model and
the hypothesis models passed the same test (p = 0.07 to 0.99).

### Pruning 184 candidate features on training seasons only kept the strongest predictor

Football statistics overlap heavily: 60 feature pairs correlated above 0.95, 137 features had a
variance inflation factor above 10, and 51 were exact duplicates of others. We removed the worst
feature one at a time until every VIF was below 10, leaving 154 features, and ran it on the
training seasons only so the test season could not shape the feature set. Where the algorithm
would have dropped `plus_minus_per90`, the strongest single predictor (t ≈ 27), we dropped its
correlates instead.

### League matters to value, but revenue and the Premier League badge cannot be separated

Hypothesis 1 asked whether Premier League players carry a premium for the same output. An ANOVA
controlling for attacking output, defensive contribution and minutes found league strongly
significant (F = 88.5, p < 0.001). The Premier League term alone was not significant in the
explanatory model (+0.29 log points, p = 0.12), because league revenue and the Premier League
indicator are almost perfectly correlated. I report this as a league effect. A clean Premier
League premium needs a design that separates money from badge.

## Ridge explained 72% of value in an unseen season, and three of four effects held

<div class="table-scroll">

| Model | Train R² | Test R² (2023–24) | Test RMSE (log) |
|---|---|---|---|
| OLS, 154 features | 0.80 | 0.69 | 0.68 |
| **Ridge (α = 50)** | **0.79** | **0.72** | **0.65** |
| Lasso (5-fold CV α) | 0.80 | 0.69 | 0.68 |

</div>

- **Baseline and uncertainty.** Predicting the average value for everyone scores R² 0. Ridge
  explains 72% of the variance in a new season. The train-to-test drop (0.79 to 0.72) is the
  overfitting cost. An RMSE of 0.65 log points means a typical prediction is off by a factor of
  about 1.9 in either direction.
- **H1, league:** significant (F = 88.5), with the Premier League effect not separable from
  revenue.
- **H2, position:** forwards are valued 76% above defenders after age and minutes (95% CI 61% to
  92%, p < 0.001).
- **H3, age × output:** not significant (p = 0.82). Age costs about 13% of value per year, but
  there is no sign that a goal per 90 is valued differently at different ages.
- **H4, contract length:** significant (Wald χ² = 897, p < 0.001). Average log value rises from
  12.9 for players with 0–1 years left to 16.4 for 5+ years. With all controls, each extra year
  adds about 15%.

All four tests used a Bonferroni-corrected threshold of 0.0125.

## The largest model–market gaps are leads to scout and check

The model’s second output is a ranking of players whose predicted value most exceeds their
market value. The first version of that ranking put a defender at a predicted **€1.55 × 10²⁹**,
more money than exists. I had compared predictions with actual values without back-transforming
them consistently from log space, so a modest log error became an astronomical euro figure, and
the “most undervalued” list was sorting by whose back-transform blew up worst. The fix was to
back-transform both sides the same way. I keep the story because an absurd result is the easy
kind of bug: it announces itself. The plausible-looking wrong number is the dangerous one.

Even after the fix, the largest gaps are many times the model’s typical error. A gap that size
says the model is missing something about that player, such as an injury, as often as it says
the market is wrong. That is why this page shows the tested effects and no individual player
predictions.

## Recommendation: use the effects to set search filters and the gaps to order scouting

A recruitment analyst should use the tested effects as filters: defenders and players on short
contracts are where the market pays least for the same output, and there is no evidence of a discount on older
scorers. The model–market gap should set the order of scouting visits, with every candidate
checked for injuries and contract details before any bid. A single gap should never set a price,
because the model’s typical miss is a factor of about 1.9.

## Limitations and what I’d do next

- **Wide error band per player.** Test RMSE of 0.65 log points. Next: report a prediction interval
  for each player and rank on the gap divided by that interval.
- **Market value is not a transfer fee.** Transfermarkt valuations are crowd-informed estimates.
  Next: validate the gaps against fees actually paid in the following window.
- **No injury data.** Injuries explain part of why a player looks cheap. Next: add days missed per
  season.
- **Heteroscedastic errors in the full model.** Next: refit with robust (HC3) standard errors
  before reading individual coefficients.
- **Three seasons is a short panel** for claims about structural market bias.

## Team and credits

**I led the team: data assembly across the three sources, the design of the four hypotheses and
the modelling plan.** The notebook, feature pruning and hypothesis tests were team work.

<details class="appendix">
<summary>Technical appendix</summary>

**Explanatory OLS (training seasons, 2,876 rows, R² 0.54).** Log market value on age, minutes,
contract years, four output composites, league revenue and league:

<div class="table-scroll">

| Term | Coefficient (log points) | p |
|---|---|---|
| Player age (per year) | −0.122 | < 0.001 |
| Minutes (per 90 played) | +0.042 | < 0.001 |
| Contract years remaining | +0.143 | < 0.001 |
| Attacking output per 90 | +0.256 | < 0.001 |
| Defensive contribution per 90 | −0.145 | < 0.001 |
| Creative output per 90 | +0.077 | < 0.001 |
| Carrying threat per 90 | +0.049 | < 0.001 |
| League revenue (€bn) | +0.147 | 0.021 |
| Premier League (vs Bundesliga) | +0.289 | 0.117 |

</div>

**Hypothesis models.** H1: OLS of log value on league, attacking output, defensive contribution
and minutes, then type-II ANOVA (league F = 88.5). H2: forwards vs defenders only, controlling for
age and minutes (forward coefficient +0.563, 95% CI 0.475 to 0.651). H3: age × goals per 90 with
minutes (interaction −0.006, p = 0.82; age −0.139; goals per 90 +2.51). H4: log value on contract
bins with HC3 robust errors, Wald test on all bins (χ² = 897). Breusch-Pagan p-values: explanatory
model 0.20, H2 0.99, H3 0.07; full 154-feature model ≈ 0.

**Predictive models.** OLS on all 154 VIF-cleaned features: train R² 0.798, test 0.689, test
MAE 0.49 log. Ridge with `RidgeCV` over α ∈ {0.01 … 1000}, best α = 50: test R² 0.720, RMSE 0.646,
MAE 0.459. Lasso with 5-fold `LassoCV`: test R² 0.694, RMSE 0.675.

**Feature pruning.** 184 numeric candidates, 60 pairs with |r| > 0.95, 137 with VIF > 10, 51
infinite. Rules kept `npxg_per90` over `xg_per90`, centred age terms over raw age, and
`plus_minus_per90` over raw plus-minus. 154 features survived.

**What didn’t work.** The first undervalued ranking (inconsistent back-transform). Reading the
Premier League dummy as the league premium (collinear with revenue). Ranking on a euro gap, which
favours expensive players; the log-residual ranking is the next step.

</details>
