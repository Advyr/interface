"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  ArrowUpRight,
  RefreshCw
} from "lucide-react";

// Mock data for rewards
const mockRewards = [
  {
    id: "1",
    action: "Swap USDC to ETH",
    amount: "0.025",
    token: "ETH",
    status: "completed",
    timestamp: "2024-01-15T10:30:00Z",
    txHash: "0x1a2b3c4d5e6f...",
    campaignTitle: "DeFi Yield Farming Rewards"
  },
  {
    id: "2", 
    action: "Stake ETH on Base",
    amount: "50",
    token: "USDC",
    status: "pending",
    timestamp: "2024-01-15T09:15:00Z",
    txHash: null,
    campaignTitle: "Base Network Growth Incentives"
  },
  {
    id: "3",
    action: "Mint NFT Collection",
    amount: "0.01",
    token: "ETH",
    status: "completed",
    timestamp: "2024-01-14T16:45:00Z",
    txHash: "0x7h8i9j0k1l2m...",
    campaignTitle: "NFT Mint Rewards Campaign"
  },
  {
    id: "4",
    action: "Bridge to Base",
    amount: "25",
    token: "USDC",
    status: "verifying",
    timestamp: "2024-01-14T14:20:00Z",
    txHash: null,
    campaignTitle: "Base Network Growth Incentives"
  }
];

const rewardsSummary = {
  totalEarned: "125.75",
  pendingRewards: "75.00",
  completedActions: 24,
  averageRewardTime: "2.3"
};

export default function RewardsPage() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      verifying: "bg-blue-50 text-blue-700 border-blue-200"
    };
    
    const icons = {
      completed: <CheckCircle className="h-3 w-3" />,
      pending: <Clock className="h-3 w-3" />,
      verifying: <RefreshCw className="h-3 w-3" />
    };

    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} font-medium flex items-center gap-1`}>
        {icons[status as keyof typeof icons]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <AppShell title="Rewards">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Rewards</h1>
            <p className="text-gray-500">Automatic onchain reward distribution</p>
          </div>
          
          <Button 
            onClick={handleRefresh}
            disabled={refreshing}
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Earned</p>
            <p className="text-2xl font-bold text-gray-900">${rewardsSummary.totalEarned}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Pending Rewards</p>
            <p className="text-2xl font-bold text-gray-900">${rewardsSummary.pendingRewards}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Completed Actions</p>
            <p className="text-2xl font-bold text-gray-900">{rewardsSummary.completedActions}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Avg. Payout Time</p>
            <p className="text-2xl font-bold text-gray-900">{rewardsSummary.averageRewardTime}min</p>
          </div>
        </div>

        {/* Recent Rewards */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Rewards</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              View all
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {mockRewards.map((reward) => (
              <div key={reward.id} className="flex items-center justify-between py-4 border-b border-gray-100 last:border-0">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="font-medium text-gray-900">{reward.action}</h3>
                    {getStatusBadge(reward.status)}
                  </div>
                  <p className="text-sm text-gray-500">{reward.campaignTitle}</p>
                  <p className="text-xs text-gray-400">{formatDate(reward.timestamp)}</p>
                </div>
                
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    +{reward.amount} {reward.token}
                  </p>
                  {reward.txHash && (
                    <Button variant="ghost" size="sm" className="text-xs text-blue-600 p-0 h-auto">
                      View transaction
                      <ArrowUpRight className="h-3 w-3 ml-1" />
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}