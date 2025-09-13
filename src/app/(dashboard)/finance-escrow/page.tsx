"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  Wallet,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  DollarSign,
  Lock,
  Unlock,
  Eye,
  Download,
  TrendingUp,
  Users,
  Gift
} from "lucide-react";

// Supported tokens
const supportedTokens = [
  {
    id: "ETH",
    name: "Ethereum",
    symbol: "ETH",
    icon: "⟠",
    balance: "12.45",
    usdValue: "24,890.00",
    locked: "8.20",
    available: "4.25"
  },
  {
    id: "USDC",
    name: "USD Coin", 
    symbol: "USDC",
    icon: "$",
    balance: "15,650.00",
    usdValue: "15,650.00",
    locked: "12,100.00",
    available: "3,550.00"
  },
  {
    id: "IDRX",
    name: "Indonesian Rupiah X",
    symbol: "IDRX",
    icon: "₹",
    balance: "250,000.00",
    usdValue: "16,500.00",
    locked: "180,000.00",
    available: "70,000.00"
  },
  {
    id: "DAI",
    name: "DAI Stablecoin",
    symbol: "DAI",
    icon: "◈",
    balance: "8,920.00",
    usdValue: "8,920.00",
    locked: "5,500.00",
    available: "3,420.00"
  }
];

// Escrow overview data
const escrowOverview = {
  totalLocked: "57,090.00",
  pendingRefunds: "2,450.00",
  availableBalance: "11,195.00",
  totalCampaigns: 8,
  activeEscrows: 5
};

// Mock reward ledger data
const rewardLedger = [
  {
    id: "1",
    type: "user_reward",
    recipient: "0x1a2b...5f6g",
    amount: "0.05",
    token: "ETH",
    campaign: "DeFi Swap Campaign",
    timestamp: "2024-01-15T10:30:00Z",
    txHash: "0x9h8i7j6k5l4m3n2o1p...",
    status: "completed"
  },
  {
    id: "2",
    type: "referrer_reward",
    recipient: "0x2b3c...6g7h",
    amount: "0.01",
    token: "ETH", 
    campaign: "NFT Mint Rewards",
    timestamp: "2024-01-15T09:15:00Z",
    txHash: "0x8g7f6e5d4c3b2a1z...",
    status: "completed"
  },
  {
    id: "3",
    type: "community_fund",
    recipient: "Community Pool",
    amount: "0.002",
    token: "ETH",
    campaign: "Base Network Growth",
    timestamp: "2024-01-15T08:45:00Z",
    txHash: "0x7f6e5d4c3b2a1z9y...",
    status: "completed"
  },
  {
    id: "4",
    type: "user_reward",
    recipient: "0x3c4d...7h8i",
    amount: "25.00",
    token: "USDC",
    campaign: "Staking Incentives",
    timestamp: "2024-01-15T08:20:00Z",
    txHash: null,
    status: "pending"
  }
];

// Refund requests
const refundRequests = [
  {
    id: "1",
    campaign: "DeFi Swap Campaign",
    amount: "1.20",
    token: "ETH",
    requestedAt: "2024-01-14T16:00:00Z",
    status: "pending",
    reason: "Campaign ended early"
  },
  {
    id: "2",
    campaign: "NFT Collection Launch",
    amount: "750.00",
    token: "USDC",
    requestedAt: "2024-01-13T14:30:00Z", 
    status: "processing",
    reason: "Unused budget"
  },
  {
    id: "3",
    campaign: "Cross-chain Bridge",
    amount: "500.00",
    token: "USDC",
    requestedAt: "2024-01-12T11:15:00Z",
    status: "completed",
    reason: "Campaign cancelled"
  }
];

export default function FinanceEscrowPage() {
  const [selectedToken, setSelectedToken] = useState("all");
  const [refundAmount, setRefundAmount] = useState("");
  const [isProcessingRefund, setIsProcessingRefund] = useState(false);

  const getStatusBadge = (status: string) => {
    const variants = {
      completed: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      processing: "bg-blue-50 text-blue-700 border-blue-200",
      failed: "bg-red-50 text-red-700 border-red-200"
    };
    
    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      user_reward: <Users className="h-3 w-3" />,
      referrer_reward: <Gift className="h-3 w-3" />,
      community_fund: <TrendingUp className="h-3 w-3" />
    };
    
    return icons[type as keyof typeof icons] || <DollarSign className="h-3 w-3" />;
  };

  const getTypeLabel = (type: string) => {
    const labels = {
      user_reward: "User Reward",
      referrer_reward: "Referrer Reward", 
      community_fund: "Community Fund"
    };
    
    return labels[type as keyof typeof labels] || type;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleRefund = async () => {
    setIsProcessingRefund(true);
    // Simulate refund processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsProcessingRefund(false);
    setRefundAmount("");
  };

  const filteredLedger = selectedToken === "all" 
    ? rewardLedger 
    : rewardLedger.filter(item => item.token === selectedToken);

  return (
    <AppShell title="Finance & Escrow">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Finance & Escrow</h1>
            <p className="text-gray-500">Secure advertising fund management</p>
          </div>
          
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Escrow Overview */}
        <div className="grid grid-cols-5 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Locked</p>
            <p className="text-2xl font-bold text-gray-900">${escrowOverview.totalLocked}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Pending Refunds</p>
            <p className="text-2xl font-bold text-gray-900">${escrowOverview.pendingRefunds}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Available Balance</p>
            <p className="text-2xl font-bold text-gray-900">${escrowOverview.availableBalance}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Campaigns</p>
            <p className="text-2xl font-bold text-gray-900">{escrowOverview.totalCampaigns}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Active Escrows</p>
            <p className="text-2xl font-bold text-gray-900">{escrowOverview.activeEscrows}</p>
          </div>
        </div>

        {/* Multi-token Balances */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Token Balances</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {supportedTokens.map((token) => (
              <div key={token.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{token.icon}</span>
                    <div>
                      <h3 className="font-semibold text-gray-900">{token.symbol}</h3>
                      <p className="text-sm text-gray-500">{token.name}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{token.balance}</p>
                    <p className="text-sm text-gray-500">${token.usdValue}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Lock className="h-3 w-3 text-red-500" />
                      <span className="text-gray-500">Locked:</span>
                    </div>
                    <p className="font-medium">{token.locked} {token.symbol}</p>
                  </div>
                  <div>
                    <div className="flex items-center space-x-1 mb-1">
                      <Unlock className="h-3 w-3 text-green-500" />
                      <span className="text-gray-500">Available:</span>
                    </div>
                    <p className="font-medium">{token.available} {token.symbol}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Refund Mechanism */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Refund Mechanism</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Request Refund */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Request Refund</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="refundAmount">Amount to Refund</Label>
                  <div className="flex space-x-2 mt-1">
                    <Input
                      id="refundAmount"
                      type="number"
                      step="0.001"
                      value={refundAmount}
                      onChange={(e) => setRefundAmount(e.target.value)}
                      placeholder="0.00"
                      className="flex-1"
                    />
                    <Select defaultValue="ETH">
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ETH">ETH</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="IDRX">IDRX</SelectItem>
                        <SelectItem value="DAI">DAI</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <Button 
                  onClick={handleRefund}
                  disabled={isProcessingRefund || !refundAmount}
                  className="w-full"
                >
                  {isProcessingRefund ? (
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  ) : (
                    <ArrowDownLeft className="h-4 w-4 mr-2" />
                  )}
                  Request Refund
                </Button>
              </div>
            </div>
            
            {/* Recent Refund Requests */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="font-medium text-gray-900 mb-4">Recent Refund Requests</h3>
              <div className="space-y-3">
                {refundRequests.slice(0, 3).map((refund) => (
                  <div key={refund.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{refund.amount} {refund.token}</p>
                      <p className="text-xs text-gray-500">{refund.campaign}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(refund.status)}
                      <p className="text-xs text-gray-400 mt-1">{formatDate(refund.requestedAt)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reward Ledger */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Reward Ledger</h2>
            <div className="flex items-center space-x-2">
              <Select value={selectedToken} onValueChange={setSelectedToken}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All tokens" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tokens</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="IDRX">IDRX</SelectItem>
                  <SelectItem value="DAI">DAI</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                View all
                <ArrowUpRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {filteredLedger.map((entry) => (
              <div key={entry.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                      {getTypeIcon(entry.type)}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{getTypeLabel(entry.type)}</p>
                      <p className="text-sm text-gray-500">{entry.campaign}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">+{entry.amount} {entry.token}</p>
                    <p className="text-sm text-gray-500">{formatDate(entry.timestamp)}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-500">To:</span>
                    <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                      {entry.recipient.length > 20 
                        ? `${entry.recipient.substring(0, 6)}...${entry.recipient.substring(entry.recipient.length - 4)}`
                        : entry.recipient
                      }
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(entry.status)}
                    {entry.txHash && (
                      <Button variant="ghost" size="sm" className="p-1 h-6">
                        <Eye className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </AppShell>
  );
}