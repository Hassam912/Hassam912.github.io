---
title: 'RiskIQ: pricing auto insurance risk instead of guessing at it'
tagline: 'A claim-likelihood model and a deployable underwriting function — where the simplest, most interpretable model beat every tree ensemble we tried.'
summary: 'Built the EDA and the deployable underwriting tool for a four-person team project: a claim-likelihood model on 10,000 policyholder records, framed around the pricing decision it exists to serve rather than around leaderboard accuracy. Logistic regression, the most interpretable model in the comparison, also won on ROC-AUC — which mattered, because insurance pricing is regulated and "the model said so" is not a defensible answer.'
category: 'Machine Learning'
context: 'MMA 867 — Queen’s University'
role: 'Solution architecture — EDA, model interpretation, deployable underwriting tool'
timeline: '2026'
stack: ['Python', 'scikit-learn', 'Logistic Regression', 'Ensemble benchmarks', 'Classification metrics']
metrics:
  - value: '0.887'
    label: 'ROC-AUC, best model (logistic regression)'
  - value: '10,000'
    label: 'policyholder records, 18 variables'
  - value: '4'
    label: 'models benchmarked head-to-head'
glance:
  problem: 'Blanket, demographic-class premiums overcharge safe drivers and undercharge risky ones — adverse selection that bled Canadian auto insurers roughly $1.2B in Alberta alone in a recent fiscal year.'
  approach: 'Benchmarked logistic regression against decision tree, random forest and gradient boosting on 10,000 records; picked the winner on ROC-AUC, not just accuracy; wrapped it in a scoring function built for a real intake form.'
  result: 'Logistic regression wins outright — 0.887 ROC-AUC, ahead of every tree ensemble — and ships as a `score_customer()` function that turns a raw customer record into a probability and a risk tier.'
links:
  - label: 'Notebook & data on GitHub'
    href: 'https://github.com/Hassam912/riskiq-claim-prediction'
featured: false
order: 11
---

## The business problem, with a number attached

Canadian auto insurers have been pricing risk with a blunt instrument. Broad demographic
rating classes assume risk shifts slowly by group — age band, postal code, vehicle
class — and charge everyone in a class the same premium. That assumption broke: claim
severity and auto-theft payouts both climbed sharply in recent years, and insurers using
blanket pricing were absorbing losses **averaging 18% more in claims and legal overhead than
they collected in premiums**, a gap that ran to roughly **$1.2B in Alberta alone**.

Blanket pricing also self-selects against the insurer. Overcharge a safe driver relative to
their actual risk and they leave for a competitor pricing them correctly. Undercharge a
risky one and they stay. The book quietly gets worse every renewal cycle. A per-policy risk
score, applied at quote time, is the direct countermeasure — and the point of this project
was to build one, prove it works, and make it usable by an actual intake process rather than
just by a notebook.

## The data

10,000 policyholder records, 18 variables spanning demographics (age, gender, education,
income bracket, marital status), driving history (experience, past accidents, speeding
violations, DUIs), and the vehicle itself (year, type, ownership status, annual mileage).
The target — `outcome` — is whether the policy generated a claim: **31.3% did, 68.7%
didn't.** Moderate imbalance, not the extreme rarity you'd see in fraud detection, but
enough that raw accuracy is a bad optimization target — a model that predicts "no claim"
for everyone still scores nearly 69%.

Roughly 10% of records were missing `credit_score` and `annual_mileage`. Rather than drop
those rows or silently impute and move on, we added a **`credit_score_missing` flag** before
median-imputing — missingness on a credit file is itself a risk signal (thin or no credit
history correlates with risk in ways a silently-imputed median would erase), and the flag
let the model use that signal instead of losing it.

## Four models, one honest comparison

We benchmarked logistic regression against a decision tree, a random forest and gradient
boosting on an identical train/test split, and evaluated on precision, recall, F1 and
ROC-AUC — never on accuracy alone, for the reason above.

<figure class="chart-figure">
<figcaption class="chart-title">Model comparison, held-out test set (ROC-AUC)</figcaption>

<svg viewBox="0 0 640 220" role="img" aria-labelledby="chartA-title chartA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chartA-title">Model comparison by ROC-AUC on the held-out test set</title>
<desc id="chartA-desc">Horizontal bar chart. Logistic Regression scores highest at 0.8865 ROC-AUC, ahead of Gradient Boosting, Random Forest and Decision Tree, all within two points of each other.</desc>
<line x1="168.0" y1="24" x2="168.0" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="168.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.85</text>
<line x1="250.4" y1="24" x2="250.4" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="250.4" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.86</text>
<line x1="332.8" y1="24" x2="332.8" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="332.8" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.87</text>
<line x1="415.2" y1="24" x2="415.2" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="415.2" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.88</text>
<line x1="497.6" y1="24" x2="497.6" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="497.6" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.89</text>
<line x1="580.0" y1="24" x2="580.0" y2="208" stroke="var(--rule)" stroke-width="1" />
<text x="580.0" y="18" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.90</text>
<text x="154.0" y="54.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Logistic Regression</text>
<rect x="168.0" y="41.0" width="300.8" height="18" rx="3" fill="var(--accent)"><title>Logistic Regression: 0.8865 ROC-AUC</title></rect>
<text x="476.8" y="54.0" font-size="10.5" fill="var(--accent-ink)" font-weight="600">0.8865</text>
<text x="154.0" y="98.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Gradient Boosting</text>
<rect x="168.0" y="85.0" width="258.7" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Gradient Boosting: 0.8814 ROC-AUC</title></rect>
<text x="434.7" y="98.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8814</text>
<text x="154.0" y="142.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Random Forest</text>
<rect x="168.0" y="129.0" width="215.9" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Random Forest: 0.8762 ROC-AUC</title></rect>
<text x="391.9" y="142.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8762</text>
<text x="154.0" y="186.0" text-anchor="end" font-size="11.5" fill="var(--ink)">Decision Tree</text>
<rect x="168.0" y="173.0" width="188.7" height="18" rx="3" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Decision Tree: 0.8729 ROC-AUC</title></rect>
<text x="364.7" y="186.0" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8729</text>
</svg>

<figcaption class="chart-caption">Logistic regression — the plainest, most interpretable model in the lineup — won outright. Accuracy 0.831, precision 0.732, recall 0.726, F1 0.729. No tree ensemble made up the gap, which is a genuinely convenient result for a use case that needs to explain itself to a regulator.</figcaption>
</figure>

That result mattered beyond the leaderboard. **Interpretability isn't a nice-to-have in
insurance pricing — it's close to a legal requirement.** A regulator or an ombudsman asking
why a specific customer was priced the way they were needs an answer better than "the
gradient boosting model said so." Logistic regression winning meant we didn't have to trade
performance for explainability — we got both from the same model.

## What actually drives claim risk

With logistic regression as the production model, its standardised coefficients double as
the interpretability layer the regulatory case needs. Sign and magnitude both matter here:
a negative coefficient means that factor *lowers* claim odds.

<figure class="chart-figure">
<figcaption class="chart-title">Standardised coefficients, top 8 claim drivers</figcaption>

<svg viewBox="0 0 640 320" role="img" aria-labelledby="chartB-title chartB-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chartB-title">Standardised logistic regression coefficients, top 8 claim drivers</title>
<desc id="chartB-desc">Diverging bar chart centered on zero. Driving experience has the strongest negative coefficient, reducing claim odds. Vehicle year before 2015 has the strongest positive coefficient, raising claim odds.</desc>
<line x1="380.0" y1="14" x2="380.0" y2="286" stroke="var(--rule)" stroke-width="1" />
<text x="176.0" y="35.0" text-anchor="end" font-size="11" fill="var(--ink)">Driving experience</text>
<rect x="262.2" y="24.0" width="117.8" height="14" rx="3" fill="var(--accent)"><title>Driving experience: -1.687 (standardised coefficient)</title></rect>
<text x="254.2" y="34.5" text-anchor="end" font-size="10" fill="var(--ink-3)">-1.69</text>
<text x="176.0" y="69.0" text-anchor="end" font-size="11" fill="var(--ink)">Vehicle year &lt; 2015</text>
<rect x="380.0" y="58.0" width="54.2" height="14" rx="3" fill="color-mix(in oklab, var(--ink-2) 70%, var(--paper-3))"><title>Vehicle year < 2015: +0.776 (standardised coefficient)</title></rect>
<text x="442.2" y="68.5" text-anchor="start" font-size="10" fill="var(--ink-3)">+0.78</text>
<text x="176.0" y="103.0" text-anchor="end" font-size="11" fill="var(--ink)">Vehicle ownership (owned)</text>
<rect x="326.2" y="92.0" width="53.8" height="14" rx="3" fill="var(--accent)"><title>Vehicle ownership (owned): -0.770 (standardised coefficient)</title></rect>
<text x="318.2" y="102.5" text-anchor="end" font-size="10" fill="var(--ink-3)">-0.77</text>
<text x="176.0" y="137.0" text-anchor="end" font-size="11" fill="var(--ink)">Gender</text>
<rect x="380.0" y="126.0" width="31.8" height="14" rx="3" fill="color-mix(in oklab, var(--ink-2) 70%, var(--paper-3))"><title>Gender: +0.455 (standardised coefficient)</title></rect>
<text x="419.8" y="136.5" text-anchor="start" font-size="10" fill="var(--ink-3)">+0.46</text>
<text x="176.0" y="171.0" text-anchor="end" font-size="11" fill="var(--ink)">Past accidents</text>
<rect x="354.2" y="160.0" width="25.8" height="14" rx="3" fill="var(--accent)"><title>Past accidents: -0.370 (standardised coefficient)</title></rect>
<text x="346.2" y="170.5" text-anchor="end" font-size="10" fill="var(--ink-3)">-0.37</text>
<text x="176.0" y="205.0" text-anchor="end" font-size="11" fill="var(--ink)">Speeding violations</text>
<rect x="380.0" y="194.0" width="13.1" height="14" rx="3" fill="color-mix(in oklab, var(--ink-2) 70%, var(--paper-3))"><title>Speeding violations: +0.188 (standardised coefficient)</title></rect>
<text x="401.1" y="204.5" text-anchor="start" font-size="10" fill="var(--ink-3)">+0.19</text>
<text x="176.0" y="239.0" text-anchor="end" font-size="11" fill="var(--ink)">Married</text>
<rect x="366.9" y="228.0" width="13.1" height="14" rx="3" fill="var(--accent)"><title>Married: -0.188 (standardised coefficient)</title></rect>
<text x="358.9" y="238.5" text-anchor="end" font-size="10" fill="var(--ink-3)">-0.19</text>
<text x="176.0" y="273.0" text-anchor="end" font-size="11" fill="var(--ink)">Annual mileage</text>
<rect x="380.0" y="262.0" width="7.8" height="14" rx="3" fill="color-mix(in oklab, var(--ink-2) 70%, var(--paper-3))"><title>Annual mileage: +0.112 (standardised coefficient)</title></rect>
<text x="395.8" y="272.5" text-anchor="start" font-size="10" fill="var(--ink-3)">+0.11</text>
<rect x="190" y="297" width="10" height="10" rx="2" fill="var(--accent)" />
<text x="205" y="306" font-size="10.5" fill="var(--ink-2)">Reduces claim odds</text>
<rect x="375" y="297" width="10" height="10" rx="2" fill="color-mix(in oklab, var(--ink-2) 70%, var(--paper-3))" />
<text x="390" y="306" font-size="10.5" fill="var(--ink-2)">Raises claim odds</text>
</svg>

<figcaption class="chart-caption">Driving experience dominates — by a wide margin, the single strongest lever, ahead of the vehicle itself. Owning your car outright (versus financing) also reduces odds, plausibly because financed vehicles skew toward newer drivers with less equity cushion. Gender and pre-2015 vehicle age are the two clearest odds-raising factors.</figcaption>
</figure>

## Threshold selection is a business decision, not a statistical one

The costs of the two error types are wildly asymmetric: underpricing a genuinely risky
policy costs a claim payout; overpricing a safe one costs a customer to a competitor who
prices them correctly. The operating threshold has to come from those relative costs, not
from an F1-optimal default — a point the strategic report built the deployment
recommendation around, not just the model itself.

## The deployable piece

A notebook that produces a good ROC-AUC and stops is a homework assignment. The thing that
makes this a solution rather than an exercise is `score_customer()` — a function that takes
a raw record in the shape an intake form would actually produce (strings like `"high school"`
or `"before 2015"`, not pre-encoded features), and returns a claim probability and a risk
tier:

```python
def score_customer(record: dict, model=logit, scaler=scaler, ...):
    """
    Take a raw customer record (as it would come off the intake form),
    return claim probability and a risk tier.
    """
    r = dict(record)
    # ordinal encoding for education / income / driving_experience
    # credit_score: flag-then-impute if missing, using the training median
    # one-hot encoding for vehicle_year and vehicle_type
    # build the feature vector in trained column order, scale, predict
    ...
    return {"claim_probability": prob, "risk_tier": tier}
```

It handles the two things a real intake form guarantees will happen: missing
`credit_score`, and categorical fields arriving as human-readable strings rather than
model-ready codes. Both are handled the same way the training pipeline handled them, so a
production score can never silently drift from how the model was actually fit. Wrapped
behind a Google Form intake, it's deployable as-is.

## What I owned

Team Danforth split the pipeline into phases — data cleaning, feature engineering,
hypothesis testing, modelling — across five people. My piece was the EDA on all 18
variables at the start, and the underwriting scoring tool at the end: taking a fitted model
out of a notebook and making it something an intake process could actually call.

## Limitations

- **Synthetic-adjacent dataset.** The 10,000-record dataset is realistic but not a live book
  of business — real deployment needs validation against actual claims experience before
  any premium decision leans on it.
- **Static snapshot, not a monitored model.** Risk profiles drift — driving habits, vehicle
  age, local claim severity all move over time. A production version needs scheduled
  retraining and drift monitoring, not a one-time fit.
- **Fairness review is unfinished.** `gender` shows up as a meaningful coefficient, and any
  model that prices on demographic-adjacent features needs an explicit fairness and
  regulatory-compliance pass before it touches a real quote.
