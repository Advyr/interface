import { AnalyticsSummary, ActionBreakdown, TimeseriesPoint } from "@/types";

export const analyticsSummaryMock: AnalyticsSummary = {
  totalValidActions: 12847,
  activeCampaigns: 4,
  totalCpaSpent: 23.45,
  refundedBudget: 1.82
};

export const actionBreakdownMock: ActionBreakdown = {
  swap: 4521,
  stake: 3210,
  mint: 2890,
  walletConnect: 2226
};

export const timeseriesMock: TimeseriesPoint[] = [
  { date: "2024-08-14", users: 245, cpaSpend: 0.89 },
  { date: "2024-08-15", users: 312, cpaSpend: 1.12 },
  { date: "2024-08-16", users: 289, cpaSpend: 0.98 },
  { date: "2024-08-17", users: 398, cpaSpend: 1.34 },
  { date: "2024-08-18", users: 445, cpaSpend: 1.67 },
  { date: "2024-08-19", users: 367, cpaSpend: 1.21 },
  { date: "2024-08-20", users: 423, cpaSpend: 1.45 },
  { date: "2024-08-21", users: 356, cpaSpend: 1.18 },
  { date: "2024-08-22", users: 478, cpaSpend: 1.72 },
  { date: "2024-08-23", users: 392, cpaSpend: 1.28 },
  { date: "2024-08-24", users: 445, cpaSpend: 1.54 },
  { date: "2024-08-25", users: 523, cpaSpend: 1.89 },
  { date: "2024-08-26", users: 467, cpaSpend: 1.63 },
  { date: "2024-08-27", users: 398, cpaSpend: 1.34 },
  { date: "2024-08-28", users: 445, cpaSpend: 1.56 },
  { date: "2024-08-29", users: 512, cpaSpend: 1.78 },
  { date: "2024-08-30", users: 434, cpaSpend: 1.45 },
  { date: "2024-08-31", users: 389, cpaSpend: 1.29 },
  { date: "2024-09-01", users: 456, cpaSpend: 1.67 },
  { date: "2024-09-02", users: 378, cpaSpend: 1.24 },
  { date: "2024-09-03", users: 423, cpaSpend: 1.48 },
  { date: "2024-09-04", users: 512, cpaSpend: 1.82 },
  { date: "2024-09-05", users: 445, cpaSpend: 1.55 },
  { date: "2024-09-06", users: 398, cpaSpend: 1.36 },
  { date: "2024-09-07", users: 467, cpaSpend: 1.64 },
  { date: "2024-09-08", users: 523, cpaSpend: 1.87 },
  { date: "2024-09-09", users: 478, cpaSpend: 1.69 },
  { date: "2024-09-10", users: 434, cpaSpend: 1.52 },
  { date: "2024-09-11", users: 512, cpaSpend: 1.81 },
  { date: "2024-09-12", users: 467, cpaSpend: 1.63 }
];