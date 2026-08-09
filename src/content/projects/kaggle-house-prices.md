---
title: 'Top 20% on Kaggle’s House Prices — by fixing the encoding, not the model'
tagline: 'A disciplined preprocessing strategy beat hyperparameter chasing on 79 mixed-type features.'
short: 'Top 20% on Kaggle by fixing the encoding'
summary: 'The Ames housing dataset is 79 features of numeric, ordinal and nominal data with missingness that means three different things. Most of the leaderboard gap comes from treating those distinctions correctly — not from a fancier estimator.'
category: 'Machine Learning'
context: 'Kaggle competition — team entry'
role: 'Preprocessing design, model selection and tuning'
timeline: '2026'
stack: ['Python', 'pandas', 'scikit-learn', 'Ridge / Lasso', 'Gradient Boosting', 'GridSearchCV']
metrics:
  - value: 'Top 20%'
    label: 'leaderboard finish'
  - value: '79'
    label: 'raw features before encoding'
  - value: '5-fold'
    label: 'CV on RMSE for model selection'
glance:
  problem: 'Predict sale price from 79 features spanning numeric, ordinal and nominal types, with missing values that carry three distinct meanings.'
  approach: 'Type-aware preprocessing — ordinals ranked, nominals one-hot encoded, and missingness interpreted per feature — then a grid search across Ridge, Lasso and Gradient Boosting on 5-fold CV.'
  result: 'Top 20% finish, driven mostly by the preprocessing decisions rather than the estimator.'
featured: true
order: 4
---

## The dataset

1,460 training rows, 1,459 test rows, 79 feature columns, one target: `SalePrice`. It looks
like a beginner problem and isn't, because those 79 columns are not one kind of thing.

They're three kinds of thing, and the entire result hinges on telling them apart.

## The three-way distinction that does the work

Most submissions apply one encoding strategy across the board. That throws away real
information in one direction and invents it in the other.

**Numeric features stay numeric.** Square footage, year built, lot area. Nothing to do.

**Ordinal features become ranked numbers.** `ExterQual` takes values Excellent, Good,
Average, Fair, Poor. One-hot encoding that creates five unrelated binary columns and
discards the fact that Excellent > Good > Average — an ordering the model would otherwise
have to rediscover from data. Mapping it to 5-4-3-2-1 hands the model a monotonic
relationship for free.

**Nominal features get one-hot encoded.** Neighbourhood, roof style, sale type. Here there
genuinely is no ordering, and imposing one would be worse than useless — it would tell the
model that Neighbourhood 7 sits between 6 and 8 in some meaningful sense.

## Missingness means three different things

This is the second place the leaderboard separates, and it's a domain-reasoning problem
rather than a statistical one. In this dataset a null can mean:

1. **The feature doesn't exist for this house.** No garage, no basement, no fireplace, no
   fence. `GarageType = NaN` doesn't mean "unknown garage type" — it means *there is no
   garage*. Imputing the mode here fabricates a garage. These get filled with an explicit
   `'None'` category, which lets the model learn "absence of garage" as its own signal.
2. **A genuinely missing numeric measurement.** Filled with the median — robust to the
   heavy right skew in this data in a way the mean isn't.
3. **A genuinely missing category.** Filled with the mode.

Getting category 1 wrong is the single most expensive mistake available in this
competition, and it's invisible to cross-validation — the error is consistent across folds
because it's baked into the data, not the split.

## One preprocessing pipeline, two datasets

Train and test are combined *before* encoding, then split back apart afterwards.

The reason is mundane and important: if you one-hot encode them separately, any category
appearing in test but not train (or vice versa) produces a different set of dummy columns,
and the matrices no longer align. Combining first guarantees both receive identical
treatment and identical column structure.

The care needed here is that this applies to **structural** preprocessing only. Anything
learned from data — medians, scaling parameters — must be fitted on train alone to avoid
leaking test-set distribution into the model.

## Model selection

Grid search across three estimators with 5-fold cross-validation, selecting on RMSE:

- **Ridge** — L2 regularization. The natural first choice given heavy multicollinearity
  after one-hot expansion.
- **Lasso** — L1. Performs feature selection by driving coefficients to zero, useful when
  many of the expanded dummy columns are noise.
- **Gradient Boosting** — captures non-linearity and interactions the linear models can't,
  such as the way an extra bathroom is worth much more in a large house than a small one.

The honest finding: **the spread between a well-tuned Ridge and a well-tuned Gradient
Boosting model was far smaller than the spread between good and bad preprocessing.** Time
spent on the encoding strategy returned more than time spent on hyperparameters — which is
the opposite of where most effort typically goes.

## What I'd add

- **Target transformation.** `SalePrice` is right-skewed; modelling `log(SalePrice)` and
  back-transforming usually buys a measurable improvement, since the competition scores on
  log error anyway.
- **Feature engineering** — total square footage as a single derived feature, house age at
  sale, total bathroom count. Domain-obvious combinations that tree models find slowly.
- **Ensembling** the linear and boosted predictions, which tends to help precisely because
  their errors are uncorrelated.
