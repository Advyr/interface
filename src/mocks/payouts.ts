import { Payout } from "@/types";

export const payoutsMock: Payout[] = [
  {
    id: "payout-1",
    campaignId: "campaign-1",
    to: "0x1234567890abcdef1234567890abcdef12345678",
    amount: 2.15,
    date: "2024-09-10T14:30:00Z"
  },
  {
    id: "payout-2",
    campaignId: "campaign-1",
    to: "0xabcdef1234567890abcdef1234567890abcdef12",
    amount: 1.87,
    date: "2024-09-09T16:45:00Z"
  },
  {
    id: "payout-3",
    campaignId: "campaign-2",
    to: "0x5678901234abcdef5678901234abcdef56789012",
    amount: 0.95,
    date: "2024-09-08T10:20:00Z"
  },
  {
    id: "payout-4",
    campaignId: "campaign-3",
    to: "0xfedcba0987654321fedcba0987654321fedcba09",
    amount: 3.42,
    date: "2024-08-30T18:15:00Z"
  },
  {
    id: "payout-5",
    campaignId: "campaign-1",
    to: "0x9876543210fedcba9876543210fedcba98765432",
    amount: 1.23,
    date: "2024-09-11T09:30:00Z"
  },
  {
    id: "payout-6",
    campaignId: "campaign-4",
    to: "0x2468135792468135792468135792468135792468",
    amount: 0.67,
    date: "2024-09-07T13:45:00Z"
  }
];