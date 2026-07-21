---
title: 'Predicting insurance claim likelihood for real-time premium adjustment'
tagline: 'An XGBoost classifier that scores claim risk at quote time so pricing can respond to it.'
summary: 'Led a team building a claim-likelihood model on policyholder and vehicle data, framed around the business use it was meant to serve: adjusting premiums to predicted risk rather than to broad rating classes.'
category: 'Machine Learning'
context: 'Team project — Queen’s University'
role: 'Team lead'
timeline: '2026'
stack: ['Python', 'XGBoost', 'scikit-learn', 'Classification metrics']
metrics: []
glance:
  problem: 'Premiums set from broad rating classes overcharge low-risk drivers and undercharge high-risk ones — an adverse-selection problem.'
  approach: 'Gradient-boosted classification on policyholder and vehicle features, with class imbalance handled explicitly and threshold selection tied to the cost asymmetry between error types.'
  result: 'A risk score usable at quote time, with the decision threshold chosen from business cost rather than from accuracy.'
featured: false
order: 11
---

## Framing

Insurance pricing is a classification problem wearing a business suit. The model question —
*will this policy generate a claim?* — is only useful if it connects to the pricing action it
enables.

Broad rating classes systematically overcharge safe drivers and undercharge risky ones. The
safe drivers leave for a competitor who prices them better, the risky ones stay, and the book
deteriorates. A per-policy risk score is the defence against that.

## What mattered technically

**Class imbalance.** Claims are rare. A model that predicts "no claim" for everyone scores
extremely well on accuracy and is worth nothing. Evaluation ran on precision, recall and
AUC — never raw accuracy.

**Threshold selection is a business decision, not a statistical one.** The costs of the two
error types are wildly asymmetric: underpricing a genuinely risky policy costs a claim
payout; overpricing a safe one costs a customer. The operating point has to come from those
numbers, not from an F1 optimum.

**Interpretability.** Insurance pricing is regulated, and "the model said so" is not a
defensible rationale. Feature importances and the direction of each effect had to be
inspectable.

## Leading the team

I split the work along the pipeline — data preparation, feature engineering, modelling,
evaluation — with a shared, agreed target definition and validation split fixed *before*
anyone started modelling. That last point prevented the most common failure mode in team
data projects: four people producing four numbers that aren't comparable because they
quietly used different splits.
