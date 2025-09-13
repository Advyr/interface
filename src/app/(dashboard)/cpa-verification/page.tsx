"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  CheckCircle, 
  Search, 
  ExternalLink,
  RefreshCw,
  AlertTriangle,
  ArrowUpRight,
  Copy
} from "lucide-react";

// Mock data for verification activities
const verificationStats = {
  totalVerifications: "12,847",
  fraudPrevented: "1,249",
  verificationRate: "94.2%",
  avgVerificationTime: "1.8"
};

const actionTypes = [
  { id: "swap", name: "Swap", icon: "⚡", count: 4521, verified: 4287, fraudDetected: 234 },
  { id: "stake", name: "Stake", icon: "🏦", count: 3210, verified: 3089, fraudDetected: 121 },
  { id: "mint", name: "Mint NFT", icon: "🎨", count: 2876, verified: 2654, fraudDetected: 222 },
  { id: "bridge", name: "Bridge", icon: "🌉", count: 2240, verified: 2108, fraudDetected: 132 }
];

const recentVerifications = [
  {
    id: "1",
    txHash: "0x1a2b3c4d5e6f7890abcdef1234567890",
    action: "Swap USDC to ETH",
    amount: "500 USDC",
    status: "verified",
    timestamp: "2024-01-15T10:30:00Z",
    blockNumber: "4,521,123",
    gasUsed: "21,000",
    campaign: "DeFi Yield Farming"
  },
  {
    id: "2",
    txHash: "0x2b3c4d5e6f7890abcdef1234567890ab",
    action: "Stake ETH",
    amount: "2.5 ETH",
    status: "verified",
    timestamp: "2024-01-15T10:25:00Z",
    blockNumber: "4,521,118",
    gasUsed: "45,000",
    campaign: "Base Network Growth"
  },
  {
    id: "3",
    txHash: "0x3c4d5e6f7890abcdef1234567890abcd",
    action: "Mint Genesis NFT",
    amount: "0.08 ETH",
    status: "fraud_detected",
    timestamp: "2024-01-15T10:20:00Z",
    blockNumber: "4,521,115",
    gasUsed: "85,000",
    campaign: "NFT Collection Launch"
  },
  {
    id: "4",
    txHash: "0x4d5e6f7890abcdef1234567890abcdef",
    action: "Bridge to Base",
    amount: "1000 USDC",
    status: "pending",
    timestamp: "2024-01-15T10:15:00Z",
    blockNumber: null,
    gasUsed: null,
    campaign: "Cross-chain Rewards"
  }
];

export default function CPAVerificationPage() {
  const [searchTx, setSearchTx] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!searchTx.trim()) return;
    
    setIsSearching(true);
    // Simulate API search
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSearching(false);
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      verified: "bg-green-50 text-green-700 border-green-200",
      pending: "bg-yellow-50 text-yellow-700 border-yellow-200",
      fraud_detected: "bg-red-50 text-red-700 border-red-200"
    };
    
    const icons = {
      verified: <CheckCircle className="h-3 w-3" />,
      pending: <RefreshCw className="h-3 w-3" />,
      fraud_detected: <AlertTriangle className="h-3 w-3" />
    };

    const labels = {
      verified: "Verified",
      pending: "Pending",
      fraud_detected: "Fraud Detected"
    };

    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} font-medium flex items-center gap-1`}>
        {icons[status as keyof typeof icons]}
        {labels[status as keyof typeof labels]}
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash: string) => {
    return `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`;
  };

  return (
    <AppShell title="CPA Verification">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CPA Verification</h1>
          <p className="text-gray-500">Real-time blockchain verification of user actions</p>
        </div>

        {/* Search Transaction */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Verify Transaction</h2>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="searchTx" className="text-sm font-medium text-gray-700">
                Transaction Hash or Address
              </Label>
              <Input
                id="searchTx"
                value={searchTx}
                onChange={(e) => setSearchTx(e.target.value)}
                placeholder="0x1a2b3c4d5e6f7890abcdef1234567890..."
                className="mt-1"
              />
            </div>
            <div className="flex items-end">
              <Button 
                onClick={handleSearch}
                disabled={isSearching || !searchTx.trim()}
              >
                {isSearching ? (
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Search className="h-4 w-4 mr-2" />
                )}
                Verify
              </Button>
            </div>
          </div>
        </div>

        {/* Verification Stats */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Verifications</p>
            <p className="text-2xl font-bold text-gray-900">{verificationStats.totalVerifications}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Fraud Prevented</p>
            <p className="text-2xl font-bold text-gray-900">{verificationStats.fraudPrevented}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Verification Rate</p>
            <p className="text-2xl font-bold text-gray-900">{verificationStats.verificationRate}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Avg. Verify Time</p>
            <p className="text-2xl font-bold text-gray-900">{verificationStats.avgVerificationTime}s</p>
          </div>
        </div>

        {/* Action Types */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Action Types</h2>
          <div className="grid grid-cols-4 gap-6">
            {actionTypes.map((action) => (
              <div key={action.id} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{action.icon}</span>
                  <span className="font-medium text-gray-900">{action.name}</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-medium">{action.count.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Verified:</span>
                    <span className="font-medium text-green-600">{action.verified.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Fraud:</span>
                    <span className="font-medium text-red-600">{action.fraudDetected}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${(action.verified / action.count) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Verifications */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">Recent Verifications</h2>
            <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
              View all
              <ArrowUpRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
          
          <div className="space-y-4">
            {recentVerifications.map((verification) => (
              <div key={verification.id} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{verification.action}</h3>
                    {getStatusBadge(verification.status)}
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{verification.amount}</p>
                    <p className="text-sm text-gray-500">{verification.campaign}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Transaction:</span>
                    <div className="flex items-center space-x-2">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                        {truncateHash(verification.txHash)}
                      </code>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                        onClick={() => copyToClipboard(verification.txHash)}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 h-6 w-6"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 pt-2">
                    <div>
                      <span className="text-gray-500">Time:</span>
                      <p className="font-medium">{formatDate(verification.timestamp)}</p>
                    </div>
                    {verification.blockNumber && (
                      <div>
                        <span className="text-gray-500">Block:</span>
                        <p className="font-medium">{verification.blockNumber}</p>
                      </div>
                    )}
                    {verification.gasUsed && (
                      <div>
                        <span className="text-gray-500">Gas Used:</span>
                        <p className="font-medium">{verification.gasUsed}</p>
                      </div>
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