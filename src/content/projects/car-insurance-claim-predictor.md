---
title: 'Predicted auto claims at 0.887 ROC-AUC with plain logistic regression'
tagline: 'A five-person claim-risk model on 10,000 policies, plus my scoring function that turns intake answers into a risk tier.'
tldr: 'Insurers need claim risk at quote time. Our five-person team’s logistic regression reached 0.887 ROC-AUC on 10,000 policies; flagged policies claimed 73% of the time vs 31% overall. I built the EDA and scoring function.'
summary: 'Five-person MMA 867 project: logistic regression predicts auto insurance claims at 0.887 ROC-AUC. I ran the EDA and built the score_customer() function.'
category: 'Predictive Modelling'
context: 'MMA 867 · Smith School of Business, Queen’s University'
team: 'Team of 5'
role: 'Ran the EDA on all 18 variables and built score_customer(), the scoring function that turns raw intake answers into a claim probability and risk tier'
timeline: '2026'
stack: ['Python', 'scikit-learn', 'Logistic Regression', 'Gradient Boosting', 'pandas', 'SciPy']
headline:
  value: '0.887'
  label: 'ROC-AUC on 2,000 held-out policies, vs 0.881 for the best tree model and 0.50 for chance'
result: 'Logistic regression scored 0.8865 ROC-AUC on a held-out test set of 2,000 policies, against 0.8814 for gradient boosting and 0.50 for random guessing. At the default threshold, 73% of the policies it flagged filed a claim, against a 31% base rate.'
impact: 'Of every 100 policies the model flags at quote time, about 73 file a claim, against 31 in 100 picked at random (2.3 times the base rate). The dollar value was not modelled: it needs claim-cost and premium data the project did not have.'
metrics:
  - value: '73% vs 31%'
    label: 'claim rate among flagged policies vs all policies'
  - value: '455 of 627'
    label: 'test-set claimants flagged (recall 0.73)'
  - value: '0.868'
    label: 'ROC-AUC from 6 inputs, vs 0.887 from all 16 features'
links:
  - label: 'Notebook & data on GitHub'
    href: 'https://github.com/Hassam912/riskiq-claim-prediction'
featured: false
order: 5
draft: false
---

<figure class="chart-figure">
<figcaption class="chart-title">Logistic regression edged out three tree models on one test split</figcaption>

<svg viewBox="0 0 640 244" role="img" aria-labelledby="riskA-title riskA-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="riskA-title">ROC-AUC of five models on the same 2,000-policy test set</title>
<desc id="riskA-desc">Dot plot on an axis from 0.86 to 0.90. Logistic regression with 16 features 0.8865, gradient boosting 0.8814, random forest 0.8762, decision tree 0.8729, and logistic regression on 6 features 0.8678. The top four sit within 0.014 of each other on a single test split. Random guessing would score 0.50.</desc>
<line x1="200.0" y1="30" x2="200.0" y2="214" stroke="var(--rule)" stroke-width="1" />
<text x="200.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.86</text>
<line x1="300.0" y1="30" x2="300.0" y2="214" stroke="var(--rule)" stroke-width="1" />
<text x="300.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.87</text>
<line x1="400.0" y1="30" x2="400.0" y2="214" stroke="var(--rule)" stroke-width="1" />
<text x="400.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.88</text>
<line x1="500.0" y1="30" x2="500.0" y2="214" stroke="var(--rule)" stroke-width="1" />
<text x="500.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.89</text>
<line x1="600.0" y1="30" x2="600.0" y2="214" stroke="var(--rule)" stroke-width="1" />
<text x="600.0" y="22" text-anchor="middle" font-size="9.5" fill="var(--ink-3)">0.90</text>
<text x="186" y="53" text-anchor="end" font-size="11.5" fill="var(--ink)">Logistic regression</text>
<text x="186" y="66" text-anchor="end" font-size="9.5" fill="var(--ink-3)">16 features · team’s pick</text>
<line x1="200" y1="56" x2="465.0" y2="56" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3" />
<circle cx="465.0" cy="56" r="6" fill="var(--accent)"><title>Logistic regression (16 features · team’s pick): ROC-AUC 0.8865</title></circle>
<text x="477.0" y="60" font-size="10.5" fill="var(--accent-ink)" font-weight="600">0.8865</text>
<text x="186" y="91" text-anchor="end" font-size="11.5" fill="var(--ink)">Gradient boosting</text>
<text x="186" y="104" text-anchor="end" font-size="9.5" fill="var(--ink-3)">200 trees, depth 3</text>
<line x1="200" y1="94" x2="414.0" y2="94" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3" />
<circle cx="414.0" cy="94" r="6" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Gradient boosting (200 trees, depth 3): ROC-AUC 0.8814</title></circle>
<text x="426.0" y="98" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8814</text>
<text x="186" y="129" text-anchor="end" font-size="11.5" fill="var(--ink)">Random forest</text>
<text x="186" y="142" text-anchor="end" font-size="9.5" fill="var(--ink-3)">300 trees, depth 10</text>
<line x1="200" y1="132" x2="362.0" y2="132" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3" />
<circle cx="362.0" cy="132" r="6" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Random forest (300 trees, depth 10): ROC-AUC 0.8762</title></circle>
<text x="374.0" y="136" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8762</text>
<text x="186" y="167" text-anchor="end" font-size="11.5" fill="var(--ink)">Decision tree</text>
<text x="186" y="180" text-anchor="end" font-size="9.5" fill="var(--ink-3)">depth 5</text>
<line x1="200" y1="170" x2="329.0" y2="170" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3" />
<circle cx="329.0" cy="170" r="6" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Decision tree (depth 5): ROC-AUC 0.8729</title></circle>
<text x="341.0" y="174" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8729</text>
<text x="186" y="205" text-anchor="end" font-size="11.5" fill="var(--ink)">Logistic regression</text>
<text x="186" y="218" text-anchor="end" font-size="9.5" fill="var(--ink-3)">6 inputs only</text>
<line x1="200" y1="208" x2="278.0" y2="208" stroke="var(--rule)" stroke-width="1" stroke-dasharray="2 3" />
<circle cx="278.0" cy="208" r="6" fill="color-mix(in oklab, var(--ink-3) 45%, var(--paper-3))"><title>Logistic regression (6 inputs only): ROC-AUC 0.8678</title></circle>
<text x="290.0" y="212" font-size="10.5" fill="var(--ink-3)" font-weight="400">0.8678</text>
<text x="200" y="238" font-size="9.5" fill="var(--ink-3)">Axis starts at 0.86. Random guessing scores 0.50.</text>
</svg>

<figcaption class="chart-caption">All five models were scored on the same 2,000 held-out policies. The top four sit within 0.014 ROC-AUC of each other, and the 0.005 lead over gradient boosting comes from a single split, so the fair reading is that the plain model matched the trees. Cutting the model to 6 inputs costs 0.019.</figcaption>
</figure>

## Blanket premiums misprice individual drivers, so insurers need a score at quote time

Most auto premiums are set by broad rating classes such as age band, postal code and vehicle
class, and everyone in a class pays the same. That pricing selects against the insurer. A safe
driver charged above their real risk leaves for a competitor who prices them correctly; a risky
driver charged below it stays. Each renewal cycle the book gets worse. The countermeasure is a
per-policy claim score at quote time. Our team’s question was: **from the answers on an intake
form, how well can we predict whether a policy will produce a claim, and can an underwriter
explain the score?** Success meant beating the trivial baseline on ROC-AUC with a model whose
drivers can be read off directly.

## 10,000 policies, a 31% claim rate and two columns 10% empty

The data is `car_insurance.csv` from a DataCamp project brief: 10,000 customers, 18 columns, one
row per policyholder. The columns cover the driver (age band, gender, driving experience,
education, income class, credit score, marital status, children), the record (speeding
violations, DUIs, past accidents) and the vehicle (ownership, year before or after 2015, sedan or
sports car, annual mileage). The target is whether the policy produced a claim: **31.3% did**.
A model that always predicts “no claim” is right 68.7% of the time, which makes accuracy a weak
yardstick.

`credit_score` was missing for 9.8% of rows and `annual_mileage` for 9.6%. The team median-imputed
both and added a missing-credit flag, expecting a thin credit file to signal risk. The data did
not support that: the flag showed no link to claims (χ² = 0.05, p = 0.82).

## Four decisions shaped a model an underwriter can read and call

### My EDA showed driving experience separates claimants more than any other variable

I profiled all 18 variables: distributions, missingness, and the claim rate by category. Driving experience had the strongest association with claims (χ² = 2,810), followed by
age (2,309), income (1,798) and vehicle ownership (1,434). Gender was significant but far weaker
(χ² = 114). The EDA also surfaced a pattern that looks wrong: policyholders who claimed had
**fewer** recorded past accidents on average (0.29 against 1.40), and speeding violations ran the
same way. The team kept those columns, and I flagged the pattern as a sign that this is a
teaching dataset whose relationships should not be carried over to a real book without checking.

### The team ranked models on ROC-AUC because accuracy rewards ignoring claimants

With a 69/31 split, accuracy flatters a model that rarely predicts a claim. The team compared
logistic regression with a decision tree, a random forest and gradient boosting on one
stratified 80/20 split (8,000 training and 2,000 test policies), and ranked them on ROC-AUC with
precision, recall and F1 alongside. Every model scored between 0.82 and 0.83 on accuracy, so
accuracy could not separate them anyway.

### The team kept logistic regression because it matched the trees and explains itself

Logistic regression scored 0.8865 against 0.8814 for gradient boosting. That gap is too small to
call a win on one split. With performance tied, the team chose the model an underwriter or a
regulator can audit: each standardised coefficient states how much one factor moves the odds of a
claim. Gradient boosting was rejected because its gain, if any, did not pay for the loss of a
readable model.

<figure class="chart-figure">
<figcaption class="chart-title">Driving experience lowers claim odds more than any other factor</figcaption>

<svg viewBox="0 0 640 320" role="img" aria-labelledby="chartB-title chartB-desc" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:auto;font-family:var(--font-mono, monospace);">
<title id="chartB-title">Standardised logistic regression coefficients, top 8 claim drivers</title>
<desc id="chartB-desc">Diverging bar chart centred on zero. Driving experience has the largest coefficient, at -1.69, and lowers claim odds. A vehicle built before 2015 (+0.78) and gender (+0.46) raise them; vehicle ownership (-0.77) and past accidents (-0.37) lower them.</desc>
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

<figcaption class="chart-caption">Standardised logistic-regression coefficients, so each bar is the effect of a one-standard-deviation change. One standard deviation more driving experience cuts the odds of a claim to 0.19 times; a pre-2015 vehicle roughly doubles them (2.17 times). The negative sign on past accidents mirrors the raw data, where claimants had fewer recorded accidents.</figcaption>
</figure>

### I built score_customer() to accept the answers an intake form actually produces

A fitted model in a notebook expects encoded, scaled features. An intake form produces strings
such as `"high school"` or `"before 2015"`, and sometimes no credit score at all. I could have
asked whoever calls the model to pre-encode inputs; I rejected that because any mismatch with
training would silently change scores. Instead `score_customer()` applies the training encodings,
fills a missing credit score with the training median and sets the flag, scales the features in
training column order, and returns a claim probability and a risk tier. On the notebook’s test
applicants it returns 0.94 (Very High) for a young driver with no credit history and prior
incidents, and 0.0085 (Low) for an experienced owner with a clean record. The tier cut-offs are
equal-width placeholders at 0.25, 0.50 and 0.75.

## 0.887 ROC-AUC on 2,000 held-out policies, level with the trees

- **Validation:** one stratified 80/20 split (claim rate 31.3% in training, 31.4% in test). No
  cross-validation was run, so the spread across splits is not measured and the ranking among the
  top four models is not settled.
- **Logistic regression:** ROC-AUC 0.8865, accuracy 0.831, precision 0.73, recall 0.73, F1 0.73.
- **What that means in policies:** of 627 test-set claimants it flagged 455; of the 622 policies
  it flagged, 455 claimed (73%, against a 31% base rate). It missed 172 claimants and wrongly
  flagged 167 safe drivers. These counts follow from the reported precision and recall.
- **Simpler options:** A 6-input version gives 0.868 ROC-AUC. Age alone gives 77.2% accuracy
  against 68.7% for always predicting no claim.

## Recommendation: use the score to route quotes, and set tiers from costs

An underwriting team could use the score to route quotes: price the low tier automatically and
send high-tier quotes for review. The model exists as a deployable scoring function and has not
been deployed. Before any live use, the tier cut-offs should come from the cost of each error:
a missed risky driver costs a claim payout, and a wrongly flagged safe driver may leave for a
competitor. If a short form matters more than the last 0.019 of ROC-AUC, the 6-input version
is the practical choice. Track the claim rate within each tier against the predicted rate every
quarter.

## Limitations and what I’d do next

- **One split, no cross-validation.** The 0.005 gap over gradient boosting could reverse on
  another split. Next: 5-fold stratified cross-validation with the spread reported for all models.
- **Teaching data with odd relationships.** Claimants have fewer recorded accidents and
  violations than non-claimants. Next: validate on a real claims history before any pricing use.
- **Imputation saw the test rows.** The medians were computed before the split, a small leak.
  Next: fit the imputer on training rows only, inside a pipeline.
- **Fairness review is not done.** Gender carries a coefficient of +0.45. Next: a fairness and
  regulatory review, and a version without gender to measure what removing it costs.
- **Default threshold.** All precision and recall figures use a 0.5 cut-off. Next: choose the
  threshold from claim-cost and churn-cost estimates.

## Team and credits

Five people split the pipeline into phases: data cleaning, feature engineering, hypothesis
testing and modelling. **I ran the EDA on all 18 variables at the start and built the
`score_customer()` scoring function at the end.** Teammates owned cleaning, feature engineering,
hypothesis testing and the four-model comparison.

<details class="appendix">
<summary>Technical appendix</summary>

**Test-set results (2,000 policies)**

<div class="table-scroll">

| Model | Accuracy | Precision | Recall | F1 | ROC-AUC |
|---|---|---|---|---|---|
| **Logistic regression** | **0.831** | **0.732** | **0.726** | **0.729** | **0.8865** |
| Gradient boosting | 0.830 | 0.731 | 0.723 | 0.727 | 0.8814 |
| Random forest | 0.825 | 0.726 | 0.707 | 0.716 | 0.8762 |
| Decision tree | 0.825 | 0.726 | 0.710 | 0.718 | 0.8729 |
| Logistic regression, 6 features | 0.812 | | | | 0.8678 |

</div>

**Settings.** Logistic regression: L2, standardised inputs, `max_iter` 2000. Decision tree: depth
5. Random forest: 300 trees, depth 10. Gradient boosting: 200 trees, depth 3, learning rate 0.05.
All with `random_state` 42. The 6-feature model uses the top 6 random-forest features: driving
experience, vehicle ownership, age, credit score, vehicle year and income.

**Encoding.** Ordinal: driving experience (0–9, 10–19, 20–29, 30+ years), education, income.
One-hot: vehicle year, vehicle type. Dropped: `id`, `postal_code`.

**Standardised coefficients and odds ratios (top 8)**

<div class="table-scroll">

| Driver | Coefficient | Odds ratio |
|---|---|---|
| Driving experience | −1.687 | 0.19 |
| Vehicle year before 2015 | +0.776 | 2.17 |
| Vehicle owned | −0.770 | 0.46 |
| Gender | +0.455 | 1.58 |
| Past accidents | −0.370 | 0.69 |
| Speeding violations | +0.188 | 1.21 |
| Married | −0.188 | 0.83 |
| Annual mileage | +0.112 | 1.12 |

</div>

**Hypothesis tests (team).** Chi-square, all p < 0.001 except the missing-credit flag: driving
experience 2,810, age 2,309, income 1,798, vehicle ownership 1,434, married 686, children 541,
education 365, gender 114, missing-credit flag 0.05 (p = 0.82). Welch’s t-tests, claim vs no
claim means: past accidents 0.29 vs 1.40, speeding violations 0.51 vs 1.93, credit score 0.46 vs
0.54, DUIs 0.08 vs 0.31, annual mileage 12,433 vs 11,404.

**The scoring function (outline)**

```python
def score_customer(record: dict, model=logit, scaler=scaler, ...):
    r = dict(record)
    # ordinal encoding for driving_experience / education / income
    # credit_score: flag, then fill with the training median if missing
    # one-hot encoding for vehicle_year and vehicle_type
    # build the vector in training column order, scale, predict
    ...
    return {"claim_probability": prob, "risk_tier": tier}
```

Tiers: Low < 0.25, Medium < 0.50, High < 0.75, otherwise Very High.

</details>
