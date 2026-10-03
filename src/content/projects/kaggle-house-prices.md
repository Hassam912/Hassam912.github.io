---
title: 'Reached the top 20% on Kaggle House Prices through better encoding'
tagline: 'Type-aware encoding and missing-value rules on 79 mixed-type housing features, compared across three models.'
tldr: 'Kaggle’s House Prices asks for sale prices from 79 mixed-type features. I encoded each feature by type and read missing values by meaning; the entry reached the top 20% of the leaderboard.'
summary: 'Kaggle House Prices: type-aware encoding and missing-value handling on 79 features took the entry to the top 20% of the leaderboard.'
category: 'Predictive Modelling'
context: 'Kaggle House Prices (Getting Started competition)'
team: 'Self-directed'
role: 'Designed the preprocessing, ran model selection and tuning'
timeline: '2026'
stack: ['Python', 'pandas', 'scikit-learn', 'Ridge / Lasso', 'Gradient Boosting', 'GridSearchCV']
headline:
  value: 'Top 20%'
  label: 'of the Kaggle House Prices leaderboard (score, field size and date not recorded)'
result: 'The entry finished in the top 20% of the House Prices leaderboard. The score, exact rank and field size were not recorded, and the leaderboard is rolling, so the percentile is a snapshot.'
metrics:
  - value: 'Top 20%'
    label: 'House Prices leaderboard finish'
featured: false
order: 8
draft: false
---

## The 79 features are three different kinds of data, and the result depends on telling them apart

Kaggle’s House Prices competition asks for the sale price of homes in Ames, Iowa, scored on the
error between the log of the predicted and actual price. It looks like a beginner problem. The
difficulty is that its 79 feature columns mix three kinds of data: numbers, ordered ratings and
unordered categories, with missing values that mean different things in different columns. A
pipeline that treats every column the same way loses information in some columns and invents it
in others. My question was **how much of the leaderboard gap comes from preprocessing each
column correctly, compared with choosing and tuning the estimator.**

## 1,460 sold homes, with missing values that mean three different things

The training set has 1,460 homes and the test set 1,459, each with 79 features and, for training,
the sale price. Features cover lot and floor areas, build and sale years, quality and condition
ratings, garage, basement, fireplace and fence details, neighbourhood and sale type. A null can
mean three things here:

1. **The feature does not exist.** `GarageType` is empty because there is no garage.
2. **A numeric measurement is missing.**
3. **A category value is missing.**

## Three preprocessing choices carried the entry

### Quality ratings became ranks, so the model did not have to relearn their order

`ExterQual` runs Excellent, Good, Average, Fair, Poor. One-hot encoding turns that into five
unrelated columns and throws away the order. I mapped ratings like this to 5 to 1, which gives the
model a monotonic relationship directly. True categories such as neighbourhood, roof style and
sale type have no order, so I one-hot encoded them. Numbering them would tell the model that
neighbourhood 7 sits between 6 and 8, which means nothing.

### A missing garage means no garage, so absence became its own category

Filling `GarageType` with the most common value would invent a garage for houses that have
none. For features that can be absent (garage, basement, fireplace, fence) I
filled nulls with an explicit `None` category, so the model can learn absence as a signal. Genuinely
missing numbers got the median, which resists this data’s right skew better than the mean. Genuinely
missing categories got the mode. Getting the first group wrong would not show up in
cross-validation, because the error is in the data and repeats in every fold.

### Train and test were encoded together so their columns lined up

Encoding the two files separately produces different dummy columns whenever a category appears
in only one of them, and the matrices stop aligning. I combined train and test for structural
steps only (type mapping and one-hot encoding), then split them back. Anything learned from values,
such as medians and scaling, was fitted on training rows alone so the test distribution could not
leak into the model.

## The entry reached the top 20% of the public leaderboard

I compared Ridge, Lasso and gradient boosting with a grid search on 5-fold cross-validated RMSE.
Ridge suits the many correlated columns after one-hot expansion, Lasso can zero out noisy
dummies, and gradient boosting captures interactions such as an extra bathroom being worth more in
a large house. The finding I took away: the difference between the tuned models was small next
to the difference between careful and careless preprocessing. I did not keep the cross-validation
scores, so I cannot put a number on either gap.

> **Note, October 2026:** House Prices is a Getting Started competition with a rolling
> leaderboard that drops older submissions. The top-20% finish is a snapshot, and its score,
> rank, field size and date were not recorded.

## Recommendation: fix data types before tuning models

For anyone building a price model on property data, the first day should go to a column-by-column
decision: number, ordered rating or category, and what a null means in that column. That work is
cheap, transfers to any estimator, and in this project moved the result more than tuning. Model
comparison comes after, on a fixed cross-validation scheme so scores can be compared.

## Limitations and what I’d do next

- **No recorded scores.** Without the CV RMSE before and after preprocessing, the page’s main
  claim is not backed by a number. Next: rerun the pipeline and log CV RMSE for each step.
- **No log target.** The competition scores error on log price, but the models were not trained on
  `log(SalePrice)`, so expensive homes carried more weight in training than in scoring. Next: train
  on log price and back-transform.
- **No engineered features.** Total floor area, age at sale and total bathrooms are obvious
  combinations that tree models find slowly. Next: add them and measure each one.
- **No ensemble.** Blending the linear and boosted predictions usually helps when their errors
  differ. Next: a simple weighted blend chosen on out-of-fold predictions.

<details class="appendix">
<summary>Technical appendix</summary>

**Encoding rules.** Numeric features kept as numbers. Ordered quality and condition ratings mapped
Excellent 5, Good 4, Average 3, Fair 2, Poor 1. Unordered categories one-hot encoded. Structural
steps run on train and test combined; medians, modes and scaling fitted on train only.

**Missing values.** Absence-type nulls (garage, basement, fireplace, fence) filled with `None`;
numeric nulls with the training median; categorical nulls with the training mode.

**Model selection.** Ridge (L2), Lasso (L1) and gradient boosting, each tuned with `GridSearchCV`
on 5-fold cross-validated RMSE.

</details>
