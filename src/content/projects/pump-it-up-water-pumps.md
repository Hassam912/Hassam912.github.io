---
title: 'Ranked #1 on DrivenData predicting which Tanzanian water pumps fail'
tagline: 'Three-class pump-failure model on 59,400 survey records, built around CatBoost’s native handling of 19,000-value location columns.'
tldr: 'Tanzania needs to know which of 59,400 water pumps to repair. I built a CatBoost-led blend (0.8235) inside a six-person team whose stacked ensemble hit 0.8308 accuracy, #1 on the leaderboard at submission, against a 0.5431 baseline.'
summary: 'Team Danforth’s DrivenData Pump It Up entry: 0.8308 accuracy, #1 at submission and top 3 of 8,657 ranked entries today. My CatBoost, LightGBM and Random Forest blend scored 0.8235.'
category: 'Predictive Modelling'
context: 'DrivenData Pump It Up · MMA 869 Machine Learning & AI'
team: 'Team of 6'
role: 'Modelling pair: built my own CatBoost blend, ran the model and error analysis, generated the final submissions'
timeline: 'Summer 2026 (submitted Sep 2026)'
stack: ['CatBoost', 'LightGBM', 'Random Forest', 'Stacking', 'scikit-learn', 'Python']
headline:
  value: '#1'
  label: 'on DrivenData’s Pump It Up leaderboard at submission; top 3 of 8,657 ranked entries today (team, 0.8308)'
result: '0.8308 accuracy for the team’s stacked ensemble and 0.8235 for my own blend, against 0.5431 for always guessing the most common class. #1 on the leaderboard at submission; #3 of 8,657 ranked entries as of 3 Oct 2026.'
impact: 'Of every 100 broken pumps, my blend correctly sends a repair crew to 77. Trading about 0.5 accuracy points would raise that by roughly 6.'
metrics:
  - value: '0.8308'
    label: 'team accuracy on the public leaderboard (CV 0.8208)'
  - value: '+2.0 pts'
    label: 'from native categorical encoding, against under 0.5 from all tuning'
  - value: '−2.3 pts'
    label: 'leaderboard cost of 12 features that cross-validation liked'
links:
  - label: 'Public leaderboard on DrivenData'
    href: 'https://www.drivendata.org/competitions/7/pump-it-up-data-mining-the-water-table/leaderboard/'
featured: true
order: 2
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Native categorical encoding did most of the climb</figcaption>

<svg viewBox="0 0 640 280" role="img" aria-labelledby="pumpA-title pumpA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="pumpA-title">Accuracy at each step of the project</title>
<desc id="pumpA-desc">Horizontal bars. First CatBoost 0.7906 in cross-validation; adding the high-cardinality columns 0.8109; proper 5-fold CV 0.8133; my three-model blend 0.8154 in CV and 0.8235 on the public leaderboard; the team's stacked ensemble 0.8308 on the public leaderboard. Guessing the most common class scores 0.5431.</desc>
<line x1="232.0" y1="24" x2="232.0" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="232.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.78</text>
<line x1="293.5" y1="24" x2="293.5" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="293.5" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.79</text>
<line x1="354.9" y1="24" x2="354.9" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="354.9" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.80</text>
<line x1="416.4" y1="24" x2="416.4" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="416.4" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.81</text>
<line x1="477.8" y1="24" x2="477.8" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="477.8" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.82</text>
<line x1="539.3" y1="24" x2="539.3" y2="274" stroke="var(--rule)" stroke-width="1" />
<text x="539.3" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.83</text>
<text x="220" y="49.0" text-anchor="end" font-size="11.5" fill="var(--ink)">First CatBoost</text>
<text x="220" y="62.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">14 simple categories · CV</text>
<rect x="232" y="41.0" width="65.1" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>First CatBoost (14 simple categories · CV): 0.7906</title></rect>
<text x="305.1" y="54.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.7906</text>
<text x="220" y="89.0" text-anchor="end" font-size="11.5" fill="var(--ink)">+ ward, subvillage, funder…</text>
<text x="220" y="102.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">high-cardinality columns · CV</text>
<rect x="232" y="81.0" width="189.9" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>+ ward, subvillage, funder… (high-cardinality columns · CV): 0.8109</title></rect>
<text x="429.9" y="94.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8109</text>
<text x="220" y="129.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Proper 5-fold CV</text>
<text x="220" y="142.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">same model · CV</text>
<rect x="232" y="121.0" width="204.6" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Proper 5-fold CV (same model · CV): 0.8133</title></rect>
<text x="444.6" y="134.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8133</text>
<text x="220" y="169.0" text-anchor="end" font-size="11.5" fill="var(--ink)">My blend</text>
<text x="220" y="182.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">CatBoost + LightGBM + RF · CV</text>
<rect x="232" y="161.0" width="217.5" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>My blend (CatBoost + LightGBM + RF · CV): 0.8154</title></rect>
<text x="457.5" y="174.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8154</text>
<text x="220" y="209.0" text-anchor="end" font-size="11.5" fill="var(--ink)">My blend</text>
<text x="220" y="222.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">public leaderboard</text>
<rect x="232" y="201.0" width="267.3" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>My blend (public leaderboard): 0.8235</title></rect>
<text x="507.3" y="214.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8235</text>
<text x="220" y="249.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Team stacked ensemble</text>
<text x="220" y="262.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">public leaderboard</text>
<rect x="232" y="241.0" width="312.2" height="18" rx="3" fill="var(--accent)"><title>Team stacked ensemble (public leaderboard): 0.8308</title></rect>
<text x="552.2" y="254.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">0.8308</text>
</svg>

<figcaption class="chart-caption">One step carries the chart: letting CatBoost use the high-cardinality columns added 2.0 points. All hyperparameter tuning combined added under 0.5. For scale, always guessing "functional" scores 0.5431.</figcaption>
</figure>

## A repair crew can only visit so many pumps

Tanzania’s water ministry surveyed 59,400 water points. 38% were broken and another 7% needed
repair. A crew sent to a working pump is a wasted day; a broken pump nobody visits leaves a village
walking to the next well. The competition turns that into one question per pump: **functional,
needs repair, or non-functional?** It is scored on plain accuracy, and the bar to beat is 0.5431: what you get by
calling every pump functional.

## The data hides its gaps as zeros

Each row is one pump at one survey date, with about 40 columns covering location, hardware, funder, installer,
water quantity and payment. Three problems shaped everything after:

- **Fake zeros.** 34.9% of `construction_year` and 34.4% of `gps_height` values are 0, meaning
  “unknown”. I turned them into missing values and added a flag, because missingness is itself a
  clue: pumps with a recorded build year work 56.1% of the time, pumps without one 51.0%.
- **Huge categories.** `ward` has 2,092 values and `subvillage` 19,287.
- **A rare middle class.** Only 7.3% of pumps “need repair”, so accuracy rewards ignoring them.

Anything learned from the labels, including ward-level medians and neighbour features, was
rebuilt inside each cross-validation fold so no pump ever saw its own answer.

## How the model was built

### Letting CatBoost read 2,092 wards was worth 2 points

Our first models were stuck at 0.79 because one-hot encoding `subvillage` would create about
19,000 columns, so we had dropped the location columns. The signal was in exactly those columns.
Failure is local, and it gets stronger the smaller the area:

<div class="table-scroll">

| Area level | Areas | Spread in failure rate |
|---|---|---|
| region | 21 | 0.114 |
| lga | 125 | 0.171 |
| **ward** | **2,092** | **0.239** |

</div>

CatBoost replaces each category with how pumps in that category usually do, computed in a shuffled
order so no pump sees its own label. That made `ward`, `subvillage`, `funder`, `installer` and
`scheme_name` usable and added **+2.0 accuracy points**. All hyperparameter tuning combined added
under 0.5. I rejected MICE imputation (it erased the missingness signal) and one-hot encoding.

### Nearby pumps predict each other

Each pump got the outcome mix of its 10, 25 and 50 nearest pumps by GPS, built out-of-fold.
Neighbours share a water table, a mechanic and a budget, and these features ended up carrying 22.2%
of the model’s importance.

### Cross-validation ranked two blends backwards

<figure class="chart-figure">
<figcaption class="chart-title">Cross-validation ranked our two best blends backwards</figcaption>

<svg viewBox="0 0 640 224" role="img" aria-labelledby="pumpB-title pumpB-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="pumpB-title">Cross-validation score versus public leaderboard score for four pipelines</title>
<desc id="pumpB-desc">Dumbbell chart. Open circle is cross-validation, filled circle is leaderboard. The blend with 12 extra features dropped from 0.8166 in CV to about 0.80 on the leaderboard. The submitted blend rose from 0.8154 to 0.8235. A teammate's XGBoost and LightGBM pipeline went from 0.8125 to 0.8158. The team stacked ensemble went from 0.8208 to 0.8308.</desc>
<line x1="291.3" y1="30" x2="291.3" y2="218" stroke="var(--rule)" stroke-width="1" />
<text x="291.3" y="24" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.80</text>
<line x1="373.8" y1="30" x2="373.8" y2="218" stroke="var(--rule)" stroke-width="1" />
<text x="373.8" y="24" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.81</text>
<line x1="456.2" y1="30" x2="456.2" y2="218" stroke="var(--rule)" stroke-width="1" />
<text x="456.2" y="24" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.82</text>
<line x1="538.7" y1="30" x2="538.7" y2="218" stroke="var(--rule)" stroke-width="1" />
<text x="538.7" y="24" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.83</text>
<text x="236" y="62.0" text-anchor="end" font-size="11" fill="var(--ink)">Blend with 12 extra features</text>
<line x1="428.2" y1="58.0" x2="291.3" y2="58.0" stroke="var(--signal)" stroke-width="2" />
<circle cx="428.2" cy="58.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Blend with 12 extra features: cross-validation 0.8166</title></circle>
<circle cx="291.3" cy="58.0" r="5.5" fill="var(--signal)"><title>Blend with 12 extra features: leaderboard ~0.80</title></circle>
<text x="281.3" y="74.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">CV 0.8166 → ~0.80</text>
<text x="236" y="106.0" text-anchor="end" font-size="11" fill="var(--ink)">Blend without them (submitted)</text>
<line x1="418.3" y1="102.0" x2="485.1" y2="102.0" stroke="var(--accent)" stroke-width="2" />
<circle cx="418.3" cy="102.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Blend without them (submitted): cross-validation 0.8154</title></circle>
<circle cx="485.1" cy="102.0" r="5.5" fill="var(--accent)"><title>Blend without them (submitted): leaderboard 0.8235</title></circle>
<text x="495.1" y="118.0" text-anchor="start" font-size="9.5" fill="var(--ink-3)">CV 0.8154 → 0.8235</text>
<text x="236" y="150.0" text-anchor="end" font-size="11" fill="var(--ink)">Teammate: XGBoost + LightGBM</text>
<line x1="394.4" y1="146.0" x2="421.6" y2="146.0" stroke="var(--accent)" stroke-width="2" />
<circle cx="394.4" cy="146.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Teammate: XGBoost + LightGBM: cross-validation 0.8125</title></circle>
<circle cx="421.6" cy="146.0" r="5.5" fill="var(--accent)"><title>Teammate: XGBoost + LightGBM: leaderboard 0.8158</title></circle>
<text x="431.6" y="162.0" text-anchor="start" font-size="9.5" fill="var(--ink-3)">CV 0.8125 → 0.8158</text>
<text x="236" y="194.0" text-anchor="end" font-size="11" fill="var(--ink)">Team stacked ensemble</text>
<line x1="462.8" y1="190.0" x2="545.4" y2="190.0" stroke="var(--accent)" stroke-width="2" />
<circle cx="462.8" cy="190.0" r="5" fill="var(--paper-3)" stroke="var(--ink-3)" stroke-width="2"><title>Team stacked ensemble: cross-validation 0.8208</title></circle>
<circle cx="545.4" cy="190.0" r="5.5" fill="var(--accent)"><title>Team stacked ensemble: leaderboard 0.8308</title></circle>
<text x="555.4" y="206.0" text-anchor="start" font-size="9.5" fill="var(--ink-3)">CV 0.8208 → 0.8308</text>
</svg>

<figcaption class="chart-caption">Open circle = cross-validation, filled = public leaderboard. CV put the 12-feature blend ahead; the leaderboard put it 2.3 points behind. The two files disagree on 804 of 14,850 pumps, far too many for luck.</figcaption>
</figure>

I added 12 engineered features: counts per funder and installer, `quantity` combinations, date
parts. Cross-validation said +0.14 points. The leaderboard said **−2.3**. The two submissions disagree
on 804 of 14,850 pumps, far too many for luck. We had made about ten choices against the same CV
rows, and the extra features memorised quirks of those rows. The best of them was the **#1 feature by
importance** in the worse model. I deleted all twelve. Cross-validation is good for comparing
options, but after many rounds of tuning against it, it overstates how well the model will do on new
data.

## 0.8308, #1 on the leaderboard at submission

- **Team stacked ensemble: 0.8308** on the public leaderboard, cross-validated at 0.8208. It was #1
  on the leaderboard when we submitted in September 2026; newer entries have since posted 0.8325 and a
  tied 0.8308, so it stands #3 of 8,657 ranked entries as of 3 October 2026. (About 20,000 people have
  joined the competition; most never submitted.)
- **My blend: 0.8235** on the leaderboard and 0.8154 in stratified 5-fold CV (CatBoost 0.50,
  LightGBM 0.25, Random Forest 0.25, weights chosen on out-of-fold predictions only).
- **Validation spread:** the same CatBoost scored 0.8091 to 0.8207 across folds, a 1.1-point swing
  from luck alone, which is why every comparison used all five folds.

Per-class results for my blend (out-of-fold, all 59,400 pumps):

<div class="table-scroll">

| Actual ↓ / Predicted → | Functional | Needs repair | Non-functional |
|---|---|---|---|
| **Functional** | **91.6%** | 1.3% | 7.1% |
| **Needs repair** | 57.1% | **28.6%** | 14.4% |
| **Non-functional** | 21.6% | 1.0% | **77.4%** |

</div>

Read as a repair plan: of every 100 broken pumps, the model sends a crew to 77 and misses 22.
“Needs repair” is the weak class: precision 0.66, recall 0.29.

## What drives pump failure

<figure class="chart-figure">
<figcaption class="chart-title">Location and neighbours make up 45.6% of the model (CatBoost importance)</figcaption>

<svg viewBox="0 0 640 328" role="img" aria-labelledby="pumpC-title pumpC-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="pumpC-title">Share of feature importance by theme</title>
<desc id="pumpC-desc">Horizontal bars. Location 23.4 percent and neighbour features 22.2 percent together make up 45.6 percent. Hardware 15.9, who funded or runs the pump 13.3, water quantity 10.2, payment and water quality 4.8, age 4.5, everything else 5.7.</desc>
<line x1="244.0" y1="24" x2="244.0" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="244.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0%</text>
<line x1="309.2" y1="24" x2="309.2" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="309.2" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">5%</text>
<line x1="374.4" y1="24" x2="374.4" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="374.4" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">10%</text>
<line x1="439.6" y1="24" x2="439.6" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="439.6" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">15%</text>
<line x1="504.8" y1="24" x2="504.8" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="504.8" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">20%</text>
<line x1="570.0" y1="24" x2="570.0" y2="322" stroke="var(--rule)" stroke-width="1" />
<text x="570.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">25%</text>
<text x="232" y="47.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Where the pump is</text>
<text x="232" y="60.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">ward, lga, region, basin</text>
<rect x="244" y="39.0" width="305.1" height="18" rx="3" fill="var(--accent)"><title>Where the pump is (ward, lga, region, basin): 23.4%</title></rect>
<text x="557.1" y="52.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">23.4%</text>
<text x="232" y="83.0" text-anchor="end" font-size="11.5" fill="var(--ink)">How nearby pumps are doing</text>
<text x="232" y="96.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">10 / 25 / 50 nearest</text>
<rect x="244" y="75.0" width="289.5" height="18" rx="3" fill="var(--accent)"><title>How nearby pumps are doing (10 / 25 / 50 nearest): 22.2%</title></rect>
<text x="541.5" y="88.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">22.2%</text>
<text x="232" y="119.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Pump hardware</text>
<text x="232" y="132.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">type, extraction, source</text>
<rect x="244" y="111.0" width="207.3" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Pump hardware (type, extraction, source): 15.9%</title></rect>
<text x="459.3" y="124.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">15.9%</text>
<text x="232" y="155.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Who funded, built, runs it</text>
<text x="232" y="168.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">funder, installer, scheme</text>
<rect x="244" y="147.0" width="173.4" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Who funded, built, runs it (funder, installer, scheme): 13.3%</title></rect>
<text x="425.4" y="160.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">13.3%</text>
<text x="232" y="191.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Water availability</text>
<text x="232" y="204.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">quantity</text>
<rect x="244" y="183.0" width="133.0" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Water availability (quantity): 10.2%</title></rect>
<text x="385.0" y="196.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">10.2%</text>
<text x="232" y="227.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Payment and water quality</text>
<text x="232" y="240.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)"></text>
<rect x="244" y="219.0" width="62.6" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Payment and water quality (): 4.8%</title></rect>
<text x="314.6" y="232.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">4.8%</text>
<text x="232" y="263.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Age</text>
<text x="232" y="276.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">pump_age</text>
<rect x="244" y="255.0" width="58.7" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Age (pump_age): 4.5%</title></rect>
<text x="310.7" y="268.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">4.5%</text>
<text x="232" y="299.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Everything else</text>
<text x="232" y="312.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)"></text>
<rect x="244" y="291.0" width="74.3" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Everything else (): 5.7%</title></rect>
<text x="326.3" y="304.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">5.7%</text>
</svg>

<figcaption class="chart-caption">Location plus neighbours is 45.6% of the model. Nearby pumps share a water table, a mechanic and a maintenance budget, so they fail together.</figcaption>
</figure>

- **A dry pump is almost always broken:** 96.9% of pumps recorded as `dry` are non-functional.
- **Who runs a pump matters as much as its hardware.** Funder, installer and scheme (13.3%) nearly
  match all hardware columns combined (15.9%).
- **Payment signals maintenance.** 75% of pumps where users pay an annual fee work, against 45% where
  they never pay.

These shares come from CatBoost’s built-in importance, which shows what the model uses, not what
causes failure.

## Recommendation: rank by risk, then pay for recall

A ministry should send crews in order of predicted probability of failure, not by district. If a
missed broken pump costs more than a wasted visit, move the decision threshold: our prior-tuning
work showed about 0.5 accuracy points buys roughly 6 points of recall on broken pumps. And because
the model is blind to one group (below), young hand pumps should stay on a routine inspection
rotation.

## Limitations and what I’d do next

- **It misses young hand pumps that still have water.** Among broken pumps it misses, 57.1% have
  enough water and the median age is 11 years, against 23 for the ones it catches. They look healthy
  on every recorded column; two rounds of features built to fix this failed.
- **Accuracy is the wrong objective for a real ministry.** A deployment would set the threshold from
  repair and travel costs, not from a leaderboard.
- **Importance is not causation.** Next step: permutation importance or SHAP on a held-out fold.
- **The leaderboard is not a fully independent test.** We used leaderboard scores when choosing
  which blend to submit (the 12-feature decision above), so 0.8308 is somewhat optimistic as an
  estimate of performance on new data. Cross-validation (0.8208) is the more honest figure.
- **Every strong model was tree-based.** Our logistic-regression baseline scored about 0.76.

## Team and credits

Team Danforth had six people. **I was half of the modelling pair: I built my own CatBoost, LightGBM and
Random Forest pipeline (0.8235), ran the model analysis, confusion matrix, feature importance and
error analysis, and generated the final submissions.** Teammates led data cleaning and feature
engineering, built further CatBoost and XGBoost pipelines, and assembled the stacked ensemble with a
meta-learner on top that scored 0.8308.

<details class="appendix">
<summary>Technical appendix</summary>

**Score ladder (my pipeline)**

| Step | CV accuracy | Change |
|---|---|---|
| CatBoost, 14 simple categories | 0.7906 | single 80/20 split |
| + `ward`, `subvillage`, `funder`, `installer`, `scheme_name` | 0.8109 | +2.0 |
| Stratified 5-fold CV | 0.8133 | measured properly |
| + LightGBM and Random Forest blend | 0.8154 | leaderboard 0.8235 |

**Final settings.** CatBoost 700 rounds, learning rate 0.05, depth 8, `l2_leaf_reg` 3 (early stopping
found 710 rounds best). LightGBM 800 rounds, learning rate 0.05, 96 leaves. Random Forest 400 trees,
`min_samples_leaf` 2, `max_features="sqrt"`.

**Tuning.** RandomizedSearchCV on XGBoost (50 fits, best 0.7449, held back by one-hot encoding);
GridSearchCV on CatBoost (24 fits); class-prior multipliers over 2,025 combinations, rejected because
the gain (0.8187 → 0.8188) vanished on held-out rows.

**What didn’t work.** MICE imputation, StandardScaler (no effect on trees), one-hot encoding,
grouping rare funders into “other”, the 12 extra features (−2.3 on the leaderboard), conditional
neighbour features (−0.10, 4 of 5 folds worse), and class weighting for accuracy (needs-repair recall
0.21 → 0.70 but accuracy 0.79 → 0.74).

**Out-of-fold scores, my blend.** Accuracy 0.8154 · macro F1 0.6885 · balanced accuracy 0.6584 ·
Cohen’s κ 0.6497 · log loss 0.4679.

</details>
