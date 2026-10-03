export const site = {
  name: 'Hassam Asghar',
  url: 'https://hassamasghar.com',
  role: 'Data & Business Analyst',
  location: 'Kitchener–Waterloo, Ontario',
  email: 'hassam.asghar.work@gmail.com',
  phone: '(226) 581-9664',
  linkedin: 'https://www.linkedin.com/in/hassam-asghar-69628b219',
  github: 'https://github.com/Hassam912',
  resume: '/Hassam-Asghar-Resume.pdf',

  /** The positioning line: the job title is in the eyebrow above it. The last
      word is set in the accent colour. */
  headline: 'I turn messy operating data into decisions.',
  subhead:
    'SQL, Power BI, Python and optimization. Completing a Master of Management Analytics at Queen’s (Dec 2026), and co-running a home-textiles brand where I own every number.',

  status: 'Open to roles in the GTA & Southwestern Ontario',
} as const;

/** Above-the-fold proof: outcomes, each linking to the project behind it. */
export const proof = [
  { value: '~$1M', label: 'a month in billing through data I owned', href: '/projects/cowlar-billing-system/' },
  { value: '−40%', label: 'financial reconciliation time, with Power BI', href: '/projects/cowlar-billing-system/' },
  { value: '+37%', label: 'what menu variety adds to hospital food cost', href: '/projects/hospital-meal-planning-milp/' },
  { value: '#1', label: 'of 18,990 on DrivenData’s Pump It Up leaderboard at submission (team)', href: '/projects/pump-it-up-water-pumps/' },
] as const;

/** Where the work comes from: shown as a single row under the proof strip. */
export const credentials = [
  { name: 'Smith School of Business', sub: 'Queen’s University · MMA' },
  { name: 'Cowlar Design Studio', sub: 'Y Combinator–backed' },
  { name: 'Modisoft Inc.', sub: '200+ US retail accounts' },
  { name: 'Hopefield Home', sub: 'Co-founder' },
] as const;

export const toolkit = [
  {
    group: 'Analysis & Modelling',
    items: ['Python', 'pandas', 'scikit-learn', 'CatBoost', 'LightGBM', 'XGBoost', 'statsmodels', 'PuLP / Solver', 'SQL', 'R'],
  },
  {
    group: 'Decision Science',
    items: [
      'Linear & mixed-integer programming',
      'Ensembles & stacking',
      'Clustering (K-Means, DBSCAN)',
      'Association rules',
      'Cost-sensitive model evaluation',
      'Regression & regularization',
      'Hypothesis testing / ANOVA',
      'A/B testing',
      'Forecasting',
      'Simulation',
    ],
  },
  {
    group: 'Communication',
    items: ['Power BI', 'Tableau', 'Looker Studio', 'Advanced Excel', 'Executive decks', 'Data storytelling'],
  },
  {
    group: 'Engineering & AI',
    items: ['Claude & OpenAI APIs', 'Agentic workflows', 'Node.js', 'REST / GraphQL APIs', 'Google Apps Script', 'n8n', 'Git'],
  },
] as const;

export const education = [
  {
    school: 'Smith School of Business, Queen’s University',
    credential: 'Master of Management Analytics',
    detail: 'In progress',
    period: 'Jan – Dec 2026',
  },
  {
    school: 'National Defense University',
    credential: 'Bachelor of Business Administration (BBA)',
    detail: 'Islamabad, Pakistan',
    period: 'Jan 2019 – Jan 2024',
  },
] as const;

export const experience = [
  {
    company: 'Hopefield Home',
    title: 'Co-Founder & Operator',
    period: 'Nov 2025 – present',
    detail:
      'Home-textiles brand on Amazon FBA and Shopify. I own the demand plan, the inventory optimization, the listing analytics and the automation stack behind it.',
  },
  {
    company: 'Cowlar Design Studio (Y Combinator–backed)',
    title: 'Billing & Compliance Analyst',
    period: 'May 2024 – Jun 2025',
    detail:
      'Owned the 15+ SQL datasets and Power BI reporting behind a live fractional-billing system processing close to $1M a month. Cut financial reconciliation time 40%.',
  },
  {
    company: 'Modisoft Inc.',
    title: 'Customer Support Lead',
    period: 'Jan 2023 – Apr 2024',
    detail:
      'Led a team of 7 across 200+ US retail accounts, ran QA on POS and financial datasets, and traced a recurring scan-data discrepancy to its root cause.',
  },
] as const;
