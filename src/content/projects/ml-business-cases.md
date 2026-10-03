---
title: 'Chose a turbine model on cost, not accuracy, saving $137,500 a year'
tagline: 'Four machine-learning business cases: predictive maintenance, credit risk, customer segmentation and basket analysis.'
tldr: 'Four course cases, one theme: pick the model by the decision it drives. A cost matrix showed the “less accurate” random forest beats an RNN by $137,500 a year on turbine maintenance.'
summary: 'Individual MMA 869 assignment: cost-based model choice for predictive maintenance, a leak-free credit-risk pipeline (test ROC-AUC 0.928), K-Means vs DBSCAN segmentation and association rules.'
category: 'Predictive Modelling'
context: 'MMA 869 Machine Learning & AI · individual assignment'
team: 'Solo'
role: 'All analysis, code and write-up'
timeline: 'Summer 2026 (submitted Sep 2026)'
stack: ['scikit-learn', 'Random Forest', 'K-Means', 'DBSCAN', 'Association rules', 'Python']
headline:
  value: '$137,500'
  label: 'a year saved by choosing the turbine model on cost, not recall (course case)'
result: 'Random forest costs $1.63M a year against $1.77M for the RNN and $5.12M for no model. Credit-risk pipeline reached 0.928 ROC-AUC on held-out data, up from a 0.819 baseline.'
impact: 'In the course’s wind-farm case, predictive maintenance cuts costs by about two thirds; picking the right model is worth a further $137,500 a year. Figures use the case’s given costs.'
metrics:
  - value: '$137,500'
    label: 'a year: random forest over RNN, same failure data'
  - value: '0.928'
    label: 'held-out ROC-AUC on credit risk (baseline 0.819)'
  - value: '1.000'
    label: 'adjusted Rand index: K-Means and DBSCAN found the same 5 segments'
links: []
featured: false
order: 6
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">The random forest is $137,500 a year cheaper than the RNN</figcaption>

<svg viewBox="0 0 640 158" role="img" aria-labelledby="windA-title windA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="windA-title">Annual maintenance cost under each policy</title>
<desc id="windA-desc">Horizontal bars. Waiting for failures costs 5.12 million dollars a year. The RNN costs 1.77 million. The random forest costs 1.63 million, the lowest.</desc>
<line x1="200.0" y1="24" x2="200.0" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="200.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$0M</text>
<line x1="263.7" y1="24" x2="263.7" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="263.7" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$1M</text>
<line x1="327.4" y1="24" x2="327.4" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="327.4" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$2M</text>
<line x1="391.1" y1="24" x2="391.1" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="391.1" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$3M</text>
<line x1="454.8" y1="24" x2="454.8" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="454.8" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$4M</text>
<line x1="518.5" y1="24" x2="518.5" y2="152" stroke="var(--rule)" stroke-width="1" />
<text x="518.5" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">$5M</text>
<text x="188" y="49.0" text-anchor="end" font-size="11.5" fill="var(--ink)">No model</text>
<text x="188" y="62.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">fix after failure</text>
<rect x="200" y="41.0" width="326.2" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>No model: $5.12M</title></rect>
<text x="534.2" y="54.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">$5.12M</text>
<text x="188" y="89.0" text-anchor="end" font-size="11.5" fill="var(--ink)">RNN</text>
<text x="188" y="102.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">higher recall</text>
<rect x="200" y="81.0" width="112.4" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>RNN: $1.76M</title></rect>
<text x="320.4" y="94.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">$1.76M</text>
<text x="188" y="129.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Random forest</text>
<text x="188" y="142.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">higher precision</text>
<rect x="200" y="121.0" width="103.7" height="18" rx="3" fill="var(--accent)"><title>Random forest: $1.63M</title></rect>
<text x="311.7" y="134.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">$1.63M</text>
</svg>

<figcaption class="chart-caption">Annual cost over 255,501 turbine-days: caught failure $2,500 (inspection + service), missed failure $20,000, false alarm $500. Either model cuts costs by about two thirds.</figcaption>
</figure>

## Accuracy could not tell the two turbine models apart

A wind farm with 700 turbines fails about once every two days. A breakdown costs $20,000 to repair;
an inspection costs $500, and fixing a turbine caught early costs $2,000 more. Two models predict
failures, and both score above 99% accuracy, because only 256 of 255,501 turbine-days were failures.
A model that never predicted a failure would score above 99% too.

So I priced every outcome and applied it to each model’s confusion matrix:

<div class="table-scroll">

| | Caught | Missed | False alarms | Annual cost | Saving vs no model |
|---|---|---|---|---|---|
| **Random forest** | 201 | 55 | 50 | **$1,627,500** | $3,492,500 |
| RNN | 226 | 30 | 1,200 | $1,765,000 | $3,355,000 |

</div>

The RNN’s better recall is real: its 25 extra catches save $437,500. Its 1,150 extra false alarms
cost $575,000. Net, the random forest wins by $137,500 a year.

**Recommendation:** choose models by expected cost, and check the costs first. The answer flips if
inspections fall below about $380 or breakdowns rise above about $25,500.

## Engineering affordability beat tuning on credit risk

<figure class="chart-figure">
<figcaption class="chart-title">Feature engineering did most of the work on credit risk</figcaption>

<svg viewBox="0 0 640 238" role="img" aria-labelledby="credB-title credB-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="credB-title">Credit-risk ROC-AUC at each pipeline step</title>
<desc id="credB-desc">Horizontal bars. Baseline 0.8189, feature engineering 0.9096, feature selection 0.9082, tuning 0.9188, held-out test 0.9279.</desc>
<line x1="210.0" y1="24" x2="210.0" y2="232" stroke="var(--rule)" stroke-width="1" />
<text x="210.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.80</text>
<line x1="305.4" y1="24" x2="305.4" y2="232" stroke="var(--rule)" stroke-width="1" />
<text x="305.4" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.84</text>
<line x1="400.9" y1="24" x2="400.9" y2="232" stroke="var(--rule)" stroke-width="1" />
<text x="400.9" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.88</text>
<line x1="496.3" y1="24" x2="496.3" y2="232" stroke="var(--rule)" stroke-width="1" />
<text x="496.3" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.92</text>
<text x="198" y="49.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Baseline</text>
<text x="198" y="62.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">Random Forest, raw features</text>
<rect x="210" y="41.0" width="45.1" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Baseline: 0.8189</title></rect>
<text x="263.1" y="54.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8189</text>
<text x="198" y="89.0" text-anchor="end" font-size="11.5" fill="var(--ink)">+ feature engineering</text>
<text x="198" y="102.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">instalment, ratios</text>
<rect x="210" y="81.0" width="261.5" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>+ feature engineering: 0.9096</title></rect>
<text x="479.5" y="94.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.9096</text>
<text x="198" y="129.0" text-anchor="end" font-size="11.5" fill="var(--ink)">+ feature selection</text>
<text x="198" y="142.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">21 of 41 kept</text>
<rect x="210" y="121.0" width="258.1" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>+ feature selection: 0.9082</title></rect>
<text x="476.1" y="134.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.9082</text>
<text x="198" y="169.0" text-anchor="end" font-size="11.5" fill="var(--ink)">+ tuning</text>
<text x="198" y="182.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">32-combo grid</text>
<rect x="210" y="161.0" width="283.4" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>+ tuning: 0.9188</title></rect>
<text x="501.4" y="174.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.9188</text>
<text x="198" y="209.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Held-out test</text>
<text x="198" y="222.0" text-anchor="end" font-size="9.5" fill="var(--ink-3)">never seen before</text>
<rect x="210" y="201.0" width="305.1" height="18" rx="3" fill="var(--accent)"><title>Held-out test: 0.9279</title></rect>
<text x="523.1" y="214.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">0.9279</text>
</svg>

<figcaption class="chart-caption">ROC-AUC, stratified cross-validation on training data, then one score on the untouched test set. Engineering affordability features added 0.09; tuning added 0.01.</figcaption>
</figure>

The task was to flag bad credit risks without leaking information. Every step sat inside one
scikit-learn pipeline, so feature engineering, selection and tuning were refit on each training fold
only, and the test set was scored once at the end. The biggest gain came from features a lender
would recognise: **monthly instalment** (the same $20,000 is a very different risk repaid over 6
months than over several years) and amount per previous account. I scored on ROC-AUC because a model that catches no bad
loans can still look accurate.

On the held-out set the tuned model reached **0.928 ROC-AUC**, catching 80% of bad risks (recall
0.799) at 0.614 precision. I chose class weighting deliberately: missing a bad risk costs a lender
more than refusing a good one.

## Two clustering methods agreed on five customer segments

For a jewellery store’s customer base, I compared raw, standard-scaled and min-max-scaled data for
K-Means at k = 2 to 10. Unscaled data never passed a silhouette of 0.74 because income (in dollars)
swamped spending score (0 to 1). Both scaled versions chose k = 5 with silhouette 0.805. DBSCAN,
tuned separately, found **the same five clusters (adjusted Rand index 1.000)**, which is strong
evidence the segments are real rather than an artefact of one algorithm. I turned each into a persona,
from high earners who spend everything and save $4.1k on average to older, low-income savers.

## Association rules: lift separates habit from cause

For a grocery store, I worked through when support, confidence and lift each mislead: milk with
eggs has high support but lift near 1, because milk is in most baskets anyway; a rare item like cake
can have very high confidence and lift with a specific partner. Lift is the one to act on.

## Limitations

- **These are course cases.** The costs, data and confusion matrices were given, so the dollar
  figures show method, not money I saved a real company.
- **The wind-farm comparison takes the confusion matrices as fixed.** A real team would also tune
  each model’s threshold against the cost matrix, which could narrow the gap.
- **Credit-risk tuning used a 32-combination grid with 5 folds** to keep runtime short; a wider search
  might add a little.

<details class="appendix">
<summary>Technical appendix</summary>

**Credit-risk pipeline.** FunctionTransformer feature engineering → OneHotEncoder → SelectFromModel
(Random Forest, threshold tuned) → RandomForestClassifier. Best grid: `class_weight=balanced`,
`max_depth=10`, `max_features=sqrt`, `min_samples_leaf=5`, 300 trees, selection threshold = mean.
Test confusion matrix: 886 good correctly passed, 105 good refused, 42 bad missed, 167 bad caught
(1,200 applicants).

**Segmentation.** K-Means k = 5 on standard-scaled data: silhouette 0.805, Calinski-Harabasz 3,671.
DBSCAN grid over `eps` and `min_samples`. The highest-silhouette settings (min_samples 24) only
scored well by labelling about 26 customers as noise, and those customers formed a coherent segment
of their own. Chosen: `eps` 0.5, `min_samples` 8, in the middle of the stable region, with every
customer assigned.

</details>
