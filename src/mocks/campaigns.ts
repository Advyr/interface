import { Campaign } from "@/types";

export const campaignsMock: Campaign[] = [
  {
    id: "campaign-1",
    title: "Base Summer Campaign",
    description: "Promoting DeFi activities on Base network during summer season",
    budgetLocked: 15.5,
    spent: 8.23,
    startDate: "2024-08-01T00:00:00Z",
    endDate: "2024-09-30T23:59:59Z",
    status: "active",
    autoPayoutsDone: 1247,
    validActions: 3421
  },
  {
    id: "campaign-2",
    title: "NFT Mint Rewards",
    description: "Incentivize NFT minting on Base with CPA rewards",
    budgetLocked: 8.75,
    spent: 3.12,
    startDate: "2024-08-15T00:00:00Z",
    endDate: "2024-10-15T23:59:59Z",
    status: "active",
    autoPayoutsDone: 623,
    validActions: 1890
  },
  {
    id: "campaign-3",
    title: "Staking Incentives",
    description: "Reward users for staking tokens on Base network",
    budgetLocked: 12.0,
    spent: 12.0,
    startDate: "2024-07-01T00:00:00Z",
    endDate: "2024-08-31T23:59:59Z",
    status: "completed",
    autoPayoutsDone: 2145,
    validActions: 4231
  },
  {
    id: "campaign-4",
    title: "Swap Volume Drive",
    description: "Boost DEX trading volume with swap rewards",
    budgetLocked: 6.25,
    spent: 1.89,
    startDate: "2024-09-01T00:00:00Z",
    status: "active",
    autoPayoutsDone: 387,
    validActions: 1205
  },
  {
    id: "campaign-5",
    title: "Wallet Onboarding",
    description: "Incentivize new wallet connections and first transactions",
    budgetLocked: 4.5,
    spent: 0.0,
    startDate: "2024-09-15T00:00:00Z",
    endDate: "2024-11-15T23:59:59Z",
    status: "draft",
    autoPayoutsDone: 0,
    validActions: 0
  }
];