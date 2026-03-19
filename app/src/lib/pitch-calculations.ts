/**
 * AUTO-CALCULATED METRICS
 * ========================
 *
 * All derived metrics calculated from config values.
 * DO NOT edit values here - edit src/config/aiox-metrics.ts instead.
 */

import {
  ARPA_BLENDED,
  COGS_INFRA,
  COGS_SUPPORT,
  COGS_TOOLING,
  TAX_RATE,
  GATEWAY_RATE,
  CAC,
  AVERAGE_LIFETIME_MONTHS,
  MONTH12_ACCOUNTS_TARGET,
  BURN_CAP_MONTHLY,
} from '@/config/aiox-metrics';

// =============================================================================
// UNIT ECONOMICS (Auto-Calculated)
// =============================================================================

/** Total COGS per account per month */
export const COGS_TOTAL = COGS_INFRA + COGS_SUPPORT + COGS_TOOLING;

/** Gross profit per account per month */
export const GROSS_PROFIT = ARPA_BLENDED - COGS_TOTAL;

/** Gross margin percentage */
export const GROSS_MARGIN_PERCENT = (GROSS_PROFIT / ARPA_BLENDED) * 100;

/** Tax amount per transaction */
export const TAX_AMOUNT = ARPA_BLENDED * TAX_RATE;

/** Gateway fee per transaction */
export const GATEWAY_AMOUNT = ARPA_BLENDED * GATEWAY_RATE;

/** Total variable costs per transaction */
export const VARIABLE_COSTS = TAX_AMOUNT + GATEWAY_AMOUNT;

/** Contribution margin before CAC */
export const CONTRIBUTION_MARGIN_BEFORE_CAC = GROSS_PROFIT - VARIABLE_COSTS;

/** Contribution margin after CAC (first month) */
export const CONTRIBUTION_MARGIN_AFTER_CAC = CONTRIBUTION_MARGIN_BEFORE_CAC - CAC;

// =============================================================================
// LTV MODEL (Auto-Calculated)
// =============================================================================

/** LTV (revenue-based) */
export const LTV_REVENUE = ARPA_BLENDED * AVERAGE_LIFETIME_MONTHS;

/** COGS over lifetime */
export const COGS_LIFETIME = COGS_TOTAL * AVERAGE_LIFETIME_MONTHS;

/** Gross profit per customer (lifetime) */
export const GROSS_PROFIT_PER_CUSTOMER = GROSS_PROFIT * AVERAGE_LIFETIME_MONTHS;

/** Contribution margin after CAC (lifetime) */
export const CONTRIBUTION_MARGIN_LIFETIME = GROSS_PROFIT_PER_CUSTOMER - CAC;

/** LTV to CAC ratio */
export const LTV_CAC_RATIO = LTV_REVENUE / CAC;

/** Payback period in months */
export const PAYBACK_MONTHS = Math.ceil(CAC / CONTRIBUTION_MARGIN_BEFORE_CAC);

// =============================================================================
// BREAK-EVEN (Auto-Calculated)
// =============================================================================

/** Break-even number of accounts */
export const BREAK_EVEN_ACCOUNTS = Math.ceil(BURN_CAP_MONTHLY / CONTRIBUTION_MARGIN_BEFORE_CAC);

/** Break-even MRR */
export const BREAK_EVEN_MRR = BREAK_EVEN_ACCOUNTS * ARPA_BLENDED;

// =============================================================================
// MONTH 12 PROJECTIONS (Auto-Calculated)
// =============================================================================

/** MRR at Month 12 */
export const MONTH12_MRR = MONTH12_ACCOUNTS_TARGET * ARPA_BLENDED;

/** ARR run-rate at Month 12 */
export const MONTH12_ARR = MONTH12_MRR * 12;

// =============================================================================
// FORMATTING UTILITIES
// =============================================================================

/** Format number as Brazilian Real currency */
export function formatCurrency(value: number, showDecimals = false): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
}

/** Format number as USD currency */
export function formatUSD(value: number, showDecimals = false): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
}

/** Format number as percentage */
export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

/** Format number with K/M suffix (BRL) */
export function formatCompact(value: number): string {
  if (value >= 1000000) {
    return `R$${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `R$${(value / 1000).toFixed(0)}k`;
  }
  return formatCurrency(value);
}

/** Format number with K/M suffix (USD) */
export function formatCompactUSD(value: number): string {
  if (value >= 1000000000) {
    return `US$${(value / 1000000000).toFixed(1)}B`;
  }
  if (value >= 1000000) {
    return `US$${(value / 1000000).toFixed(0)}M`;
  }
  if (value >= 1000) {
    return `US$${(value / 1000).toFixed(0)}k`;
  }
  return formatUSD(value);
}

/** Format range */
export function formatRange(min: number, max: number, compact = false): string {
  const formatter = compact ? formatCompact : formatCurrency;
  return `${formatter(min)} - ${formatter(max)}`;
}
