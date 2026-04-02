/**
 * SYNKRA AIOX METRICS CONFIGURATION
 * ===================================
 *
 * All business metrics defined in ONE place.
 * Change a value here, and all calculations update automatically.
 *
 * Product: Synkra AIOX — AI-Orchestrated System for Full Stack Development
 * Model: B2B SaaS (subscription) with professional services
 */

// =============================================================================
// UNIT ECONOMICS (Core Business Model)
// =============================================================================

/** Average Revenue Per Account - monthly subscription */
export const ARPA_STARTER = 497;
export const ARPA_PRO = 1497;
export const ARPA_ENTERPRISE = 4997;
export const ARPA_BLENDED = 1200;

/** Cost of Goods Sold - per account */
export const COGS_INFRA = 120;        // Cloud infrastructure (AI APIs, compute)
export const COGS_SUPPORT = 80;       // Customer success allocation
export const COGS_TOOLING = 50;       // Third-party tool licenses

/** Variable costs as percentage of revenue */
export const TAX_RATE = 0.05;         // 5% - taxes on revenue
export const GATEWAY_RATE = 0.035;    // 3.5% - payment gateway fees

/** Customer Acquisition Cost */
export const CAC = 350;               // Blended paid + organic

// =============================================================================
// ASSUMPTIONS (Conservative Early-Stage)
// =============================================================================

/** Monthly churn rate */
export const MONTHLY_CHURN = 0.05;    // 5% - B2B SaaS early-stage

/** Average customer lifetime in months */
export const AVERAGE_LIFETIME_MONTHS = 18;

/** Net Revenue Retention */
export const NRR = 1.15;              // 115% - expansion > churn

// =============================================================================
// 12-MONTH TARGETS (Seed Validation Phase)
// =============================================================================

/** Target active accounts at Month 12 */
export const MONTH12_ACCOUNTS_TARGET = 120;

/** Target ARR run-rate at Month 12 */
export const MONTH12_ARR_TARGET = 1728000;  // 120 × R$1,200 × 12

/** Target MRR at Month 12 */
export const MONTH12_MRR_TARGET = 144000;   // 120 × R$1,200

// =============================================================================
// CAPITAL DISCIPLINE
// =============================================================================

/** Monthly burn cap */
export const BURN_CAP_MONTHLY = 45000;

/** Team cost per month */
export const TEAM_COST_MONTHLY = 32000;

/** Runway with seed round */
export const RUNWAY_MONTHS = 18;

// =============================================================================
// SEED ROUND TERMS
// =============================================================================

/** Target raise */
export const SEED_RAISE = 500000;

/** Valuation cap for SAFE */
export const VALUATION_CAP = 12000000;

/** Discount rate for SAFE conversion */
export const DISCOUNT_RATE = 0.20;    // 20%

// =============================================================================
// MARKET SIZE
// =============================================================================

/** TAM - Total Addressable Market (global AI dev tools) */
export const TAM = 45000000000;       // US$45B

/** SAM - Serviceable Available Market (LATAM AI dev tools) */
export const SAM = 3200000000;        // US$3.2B

/** SOM - Serviceable Obtainable Market (Brazil AI dev tools, early) */
export const SOM = 180000000;         // US$180M

// =============================================================================
// EXIT STRATEGY
// =============================================================================

/** Target exit horizon in years */
export const EXIT_HORIZON_MIN = 5;
export const EXIT_HORIZON_MAX = 7;

/** Exit multiple (focus on ARR) */
export const EXIT_MULTIPLE = 10;      // 10x ARR for AI/SaaS

/** Target valuation range at exit */
export const EXIT_VALUATION_MIN = 200000000;   // R$200M
export const EXIT_VALUATION_MAX = 500000000;   // R$500M

// =============================================================================
// COMPARABLE ACQUIRERS / STRATEGIC PARTNERS
// =============================================================================

export const COMPARABLE_ACQUIRERS = [
  { name: 'Vercel', description: 'Developer platform leader' },
  { name: 'GitHub (Microsoft)', description: 'Code hosting & AI Copilot' },
  { name: 'Atlassian', description: 'Developer workflow tools' },
  { name: 'GitLab', description: 'DevSecOps platform' },
  { name: 'JetBrains', description: 'IDE & developer tools' },
  { name: 'Datadog', description: 'Observability & AI ops' },
  { name: 'ServiceNow', description: 'Enterprise workflow automation' },
  { name: 'Private Equity', description: 'Enterprise SaaS roll-up funds' },
];

// =============================================================================
// PRODUCT TIERS
// =============================================================================

export const PRODUCT_TIERS = [
  {
    name: 'Starter',
    price: ARPA_STARTER,
    features: [
      'Up to 3 AI agent personas',
      '1 active project',
      'Core dev workflow (stories, QA, deploy)',
      'Community support',
      '5,000 agent interactions/mo',
    ],
  },
  {
    name: 'Pro',
    price: ARPA_PRO,
    features: [
      'Unlimited agent personas',
      'Up to 10 projects',
      'Full agent orchestration (squads, epics)',
      'Priority support',
      '50,000 agent interactions/mo',
      'Custom agent creation',
      'CI/CD integration',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: ARPA_ENTERPRISE,
    features: [
      'Everything in Pro',
      'Unlimited projects',
      'Dedicated infrastructure',
      'SSO & RBAC',
      'Unlimited agent interactions',
      'Custom integrations',
      'SLA guarantee',
      'Dedicated success manager',
    ],
  },
];

// =============================================================================
// TEAM
// =============================================================================

export const TEAM_MEMBERS = [
  {
    name: 'Alan',
    role: 'CEO & Founder',
    bio: 'Product-obsessed builder with 15+ years shipping SaaS products. Deep expertise in AI orchestration, developer tools, and scaling B2B platforms.',
    linkedin: 'https://linkedin.com/in/alan',
    photo: null,
  },
];

// =============================================================================
// KEY COMPETITORS
// =============================================================================

export const COMPETITORS = [
  {
    name: 'Cursor',
    category: 'AI IDE',
    strength: 'Code completion',
    weakness: 'No multi-agent orchestration',
    aioxAdvantage: 'Full SDLC orchestration vs single-task',
  },
  {
    name: 'Devin (Cognition)',
    category: 'AI SWE Agent',
    strength: 'Autonomous coding',
    weakness: 'Black box, no team integration',
    aioxAdvantage: 'Transparent agents with role-based collaboration',
  },
  {
    name: 'GitHub Copilot',
    category: 'AI Code Assistant',
    strength: 'Massive adoption, IDE integration',
    weakness: 'Single-agent, no workflow orchestration',
    aioxAdvantage: 'Multi-agent system covering PM, QA, Arch, Dev',
  },
  {
    name: 'Windsurf',
    category: 'AI IDE',
    strength: 'Flow-based coding',
    weakness: 'IDE-centric, no process management',
    aioxAdvantage: 'Process + product: stories, epics, squads',
  },
  {
    name: 'Bolt.new',
    category: 'AI App Builder',
    strength: 'Quick prototyping',
    weakness: 'No enterprise workflow, no team roles',
    aioxAdvantage: 'Enterprise-grade with governance & roles',
  },
  {
    name: 'v0 (Vercel)',
    category: 'AI UI Generator',
    strength: 'UI generation',
    weakness: 'Frontend-only, no backend/infra',
    aioxAdvantage: 'Full-stack: UI + API + DB + deploy + QA',
  },
];

// =============================================================================
// ROADMAP MILESTONES
// =============================================================================

export const ROADMAP_MILESTONES = [
  {
    quarter: 'Q1 2026',
    phase: 'Foundation',
    status: 'completed' as const,
    items: [
      'Core agent orchestration engine',
      'Story-driven development workflow',
      'Design system & brandbook',
      'Initial agent personas (7 roles)',
    ],
  },
  {
    quarter: 'Q2 2026',
    phase: 'Launch',
    status: 'in-progress' as const,
    items: [
      'Public beta launch',
      'Squad system (multi-domain agents)',
      'Investor Data Room',
      'First 20 paying customers',
    ],
  },
  {
    quarter: 'Q3 2026',
    phase: 'Growth',
    status: 'planned' as const,
    items: [
      'Enterprise features (SSO, RBAC)',
      'Custom agent builder',
      'Marketplace for agent templates',
      'Scale to 60+ accounts',
    ],
  },
  {
    quarter: 'Q4 2026',
    phase: 'Scale',
    status: 'planned' as const,
    items: [
      'Series A preparation',
      'International expansion (LATAM)',
      'Advanced analytics dashboard',
      'Target: 120 accounts, ~R$1.7M ARR',
    ],
  },
];

// =============================================================================
// GROWTH CHANNELS
// =============================================================================

export const GROWTH_CHANNELS = [
  {
    name: 'Content & Community',
    allocation: 0.30,
    description: 'Technical content, open-source contributions, developer community',
  },
  {
    name: 'Paid Acquisition',
    allocation: 0.25,
    description: 'LinkedIn Ads, Google Ads targeting dev teams and CTOs',
  },
  {
    name: 'Partnerships',
    allocation: 0.20,
    description: 'Agency partnerships, consulting firms, dev shops',
  },
  {
    name: 'Product-Led Growth',
    allocation: 0.15,
    description: 'Free tier, viral loops, team invites',
  },
  {
    name: 'Events & Conferences',
    allocation: 0.10,
    description: 'Dev conferences, webinars, workshops',
  },
];
