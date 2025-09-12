export interface Campaign {
  id: string;
  title: string;
  description: string;
  budgetLocked: number;
  spent: number;
  startDate: string;
  endDate?: string;
  status: "draft" | "active" | "paused" | "completed";
  autoPayoutsDone: number;
  validActions: number;
}

export interface Payout {
  id: string;
  campaignId: string;
  to: string;
  amount: number;
  date: string;
}

export interface Publisher {
  id: string;
  name: string;
  trafficViews: number;
  ctr: number;
  wallet?: string;
  score?: number;
}

export interface ReferralCode {
  id: string;
  code: string;
  clicks: number;
  signups: number;
  conversions: number;
}

export interface AnalyticsSummary {
  totalValidActions: number;
  activeCampaigns: number;
  totalCpaSpent: number;
  refundedBudget: number;
}

export interface ActionBreakdown {
  swap: number;
  stake: number;
  mint: number;
  walletConnect: number;
}

export interface TimeseriesPoint {
  date: string;
  users: number;
  cpaSpend: number;
}

export type TimeRange = "7d" | "30d" | "custom";