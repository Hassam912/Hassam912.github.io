export const site = {
  name: 'Hassam Asghar',
  url: 'https://hassamasghar.com',
  role: 'Analytics · Optimization · AI Automation',
  location: 'Kitchener–Waterloo, Ontario',
  email: 'hassamasghar94@gmail.com',
  phone: '(226) 581-9664',
  linkedin: 'https://www.linkedin.com/in/hassam-asghar-69628b219',
  github: 'https://github.com/Hassam912',
  resume: '/Hassam-Asghar-Resume.pdf',

  /** The positioning line. Everything else on the site supports this claim. */
  headline: 'Analytics that ends in a decision,\nnot a dashboard.',
  subhead:
    'Master of Management Analytics from Queen’s. I work at the point where optimization, machine learning and automation meet a real P&L — including my own: a home-goods brand whose inventory I plan with a linear program I wrote.',

  status: 'Open to analytics roles in the GTA & Southwestern Ontario',
} as const;

/** Above-the-fold proof. Every number here traces to a real artifact. */
export const proof = [
  { value: '$100K+', label: 'monthly billing run through a system I built', note: 'Cowlar Design Studio' },
  { value: 'Top 20%', label: 'Kaggle House Prices leaderboard finish', note: 'team entry' },
  { value: '4,056', label: 'player-seasons modelled across 203 features', note: 'MMA 860 team project' },
  { value: '7 SKUs', label: 'of live inventory kitted by my LP model', note: 'Hopefield' },
] as const;

export const toolkit = [
  {
    group: 'Analysis & Modelling',
    items: ['Python', 'pandas', 'scikit-learn', 'XGBoost', 'statsmodels', 'PuLP / Solver', 'SQL', 'R'],
  },
  {
    group: 'Decision Science',
    items: [
      'Linear & mixed-integer programming',
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
    detail: 'Data Science major',
    period: '2026 – 2027',
  },
  {
    school: 'National Defense University',
    credential: 'BS, Business Management',
    detail: 'Islamabad, Pakistan',
    period: '2019 – 2024',
  },
] as const;

export const experience = [
  {
    company: 'Hopefield',
    title: 'Founder & Operator',
    period: '2026 – present',
    detail:
      'Home-textiles brand on Amazon FBA and Shopify. I own the demand plan, the inventory optimization, the listing analytics and the automation stack behind it.',
  },
  {
    company: 'Cowlar Design Studio (Y Combinator–backed)',
    title: 'Billing & Compliance Analyst',
    period: '2024 – 2025',
    detail:
      'Owned the analytics-ready SQL datasets and Power BI reporting behind a live fractional-billing system, and automated the pipelines that fed it.',
  },
  {
    company: 'Modisoft Inc.',
    title: 'Customer Support Lead',
    period: '2022 – 2024',
    detail:
      'Managed 200+ retail accounts, ran QA on POS and financial datasets, and led weekly ERP training for US clients.',
  },
] as const;
