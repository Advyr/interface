"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { 
  TrendingUp,
  TrendingDown,
  Target,
  Eye,
  MousePointer,
  Zap,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Filter,
  Download,
  ArrowUpRight
} from "lucide-react";

// Mock analytics data
const cpaMetrics = {
  totalActions: 1847,
  validActions: 1623,
  invalidActions: 224,
  averageCPA: 0.048,
  totalSpend: 89.2,
  conversionRate: 87.9
};

const conversionFunnel = [
  { stage: "Views", count: 125420, percentage: 100, dropRate: 0 },
  { stage: "Clicks", count: 8934, percentage: 7.1, dropRate: 92.9 },
  { stage: "Actions", count: 1847, percentage: 20.7, dropRate: 79.3 },
  { stage: "Rewards", count: 1623, percentage: 87.9, dropRate: 12.1 }
];

const fraudDetection = {
  totalFraudAttempts: 224,
  fraudRate: 12.1,
  fraudTypes: [
    { type: "Fake Transactions", count: 89, percentage: 39.7 },
    { type: "Bot Activities", count: 76, percentage: 33.9 },
    { type: "Invalid Wallets", count: 42, percentage: 18.8 },
    { type: "Duplicate Actions", count: 17, percentage: 7.6 }
  ],
  savedAmount: 10.75 // ETH
};

const roiEstimation = {
  totalSpend: 89.2,
  totalRewards: 78.3,
  netProfit: 10.9,
  roi: 12.2,
  projectedValue: 156.8,
  efficiency: 87.8
};

// Engagement heatmap data (24 hours x 7 days)
const engagementData = [
  // Monday to Sunday, 24 hours each
  [12, 8, 5, 3, 2, 4, 8, 15, 22, 28, 31, 35, 42, 38, 36, 33, 29, 25, 22, 18, 16, 14, 13, 11],
  [10, 7, 4, 2, 1, 3, 7, 18, 25, 32, 38, 41, 45, 43, 40, 37, 32, 28, 24, 20, 17, 15, 12, 9],
  [11, 8, 6, 3, 2, 4, 9, 20, 27, 35, 40, 44, 48, 46, 42, 39, 34, 30, 26, 22, 19, 16, 14, 12],
  [13, 9, 7, 4, 3, 5, 11, 22, 29, 37, 42, 46, 52, 49, 45, 41, 36, 32, 28, 24, 21, 18, 15, 13],
  [15, 11, 8, 5, 4, 6, 13, 25, 32, 40, 45, 49, 55, 52, 48, 44, 38, 34, 30, 26, 23, 20, 17, 15],
  [18, 14, 10, 7, 6, 8, 16, 28, 35, 43, 48, 52, 58, 55, 51, 47, 41, 37, 33, 29, 25, 22, 19, 17],
  [16, 12, 9, 6, 5, 7, 14, 26, 33, 41, 46, 50, 56, 53, 49, 45, 39, 35, 31, 27, 24, 21, 18, 16]
];

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const hourLabels = Array.from({ length: 24 }, (_, i) => 
  i === 0 ? "12AM" : i < 12 ? `${i}AM` : i === 12 ? "12PM" : `${i-12}PM`
);

const recentCampaigns = [
  {
    id: "1",
    name: "DeFi Swap Campaign",
    status: "active",
    cpa: 0.052,
    conversions: 345,
    spend: 17.9,
    roi: 15.2
  },
  {
    id: "2", 
    name: "NFT Mint Rewards",
    status: "completed",
    cpa: 0.043,
    conversions: 523,
    spend: 22.5,
    roi: 18.7
  },
  {
    id: "3",
    name: "Staking Incentives", 
    status: "active",
    cpa: 0.051,
    conversions: 267,
    spend: 13.6,
    roi: 11.9
  }
];

export default function AnalyticsInsightsPage() {
  const [timeRange, setTimeRange] = useState("7d");
  const [selectedCampaign, setSelectedCampaign] = useState("all");

  const getStatusBadge = (status: string) => {
    const variants = {
      active: "bg-green-50 text-green-700 border-green-200",
      completed: "bg-blue-50 text-blue-700 border-blue-200",
      paused: "bg-yellow-50 text-yellow-700 border-yellow-200"
    };
    
    return (
      <Badge variant="outline" className={`${variants[status as keyof typeof variants]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getIntensityColor = (value: number) => {
    const maxValue = 60; // Maximum expected value
    const intensity = Math.min(value / maxValue, 1);
    
    if (intensity === 0) return "bg-gray-100";
    if (intensity <= 0.2) return "bg-blue-100";
    if (intensity <= 0.4) return "bg-blue-200";
    if (intensity <= 0.6) return "bg-blue-400";
    if (intensity <= 0.8) return "bg-blue-500";
    return "bg-blue-600";
  };

  const getTextColor = (value: number) => {
    const maxValue = 60;
    const intensity = Math.min(value / maxValue, 1);
    return intensity > 0.6 ? "text-white" : "text-gray-700";
  };

  return (
    <AppShell title="Analytics & Insights">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics & Insights</h1>
            <p className="text-gray-500">Complete campaign performance transparency</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32">
                <Calendar className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* CPA Metrics */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">CPA Metrics</h2>
          
          <div className="grid grid-cols-6 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Actions</p>
              <p className="text-2xl font-bold text-gray-900">{cpaMetrics.totalActions.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Valid Actions</p>
              <p className="text-2xl font-bold text-green-600">{cpaMetrics.validActions.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Invalid Actions</p>
              <p className="text-2xl font-bold text-red-600">{cpaMetrics.invalidActions}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Average CPA</p>
              <p className="text-2xl font-bold text-gray-900">{cpaMetrics.averageCPA} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">{cpaMetrics.totalSpend} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Conversion Rate</p>
              <p className="text-2xl font-bold text-blue-600">{cpaMetrics.conversionRate}%</p>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Conversion Funnel</h2>
          
          <div className="space-y-6">
            {conversionFunnel.map((stage, index) => (
              <div key={stage.stage} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      {index === 0 && <Eye className="h-4 w-4 text-blue-600" />}
                      {index === 1 && <MousePointer className="h-4 w-4 text-blue-600" />}
                      {index === 2 && <Target className="h-4 w-4 text-blue-600" />}
                      {index === 3 && <DollarSign className="h-4 w-4 text-blue-600" />}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{stage.stage}</p>
                      <p className="text-sm text-gray-500">{stage.count.toLocaleString()} users</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{stage.percentage}%</p>
                    {stage.dropRate > 0 && (
                      <p className="text-sm text-red-500">-{stage.dropRate}% drop</p>
                    )}
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-blue-500 h-3 rounded-full transition-all duration-500" 
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fraud Detection Report */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Fraud Detection Report</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Fraud Attempts</p>
                  <p className="text-xl font-bold text-red-600">{fraudDetection.totalFraudAttempts}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Fraud Rate</p>
                  <p className="text-xl font-bold text-red-600">{fraudDetection.fraudRate}%</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Saved Amount</p>
                  <p className="text-xl font-bold text-green-600">{fraudDetection.savedAmount} ETH</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Fraud Types Detected</h4>
              {fraudDetection.fraudTypes.map((type) => (
                <div key={type.type} className="flex items-center justify-between py-2">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm text-gray-900">{type.type}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-gray-900">{type.count}</span>
                    <span className="text-xs text-gray-500 ml-2">{type.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ROI Estimation */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">ROI Estimation</h2>
          
          <div className="grid grid-cols-6 gap-8">
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Spend</p>
              <p className="text-xl font-bold text-gray-900">{roiEstimation.totalSpend} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Total Rewards</p>
              <p className="text-xl font-bold text-blue-600">{roiEstimation.totalRewards} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Net Profit</p>
              <p className="text-xl font-bold text-green-600">{roiEstimation.netProfit} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">ROI</p>
              <div className="flex items-center space-x-1">
                <p className="text-xl font-bold text-green-600">{roiEstimation.roi}%</p>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Projected Value</p>
              <p className="text-xl font-bold text-purple-600">{roiEstimation.projectedValue} ETH</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">Efficiency</p>
              <p className="text-xl font-bold text-blue-600">{roiEstimation.efficiency}%</p>
            </div>
          </div>
        </div>

        {/* Engagement Heatmap */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Engagement Heatmap</h2>
          <p className="text-sm text-gray-500">Peak interaction hours and days</p>
          
          <div className="overflow-x-auto">
            <div className="min-w-full space-y-2">
              {/* Hour labels */}
              <div className="flex space-x-1">
                <div className="w-12"></div>
                {hourLabels.map((hour, index) => (
                  <div key={index} className="w-8 text-xs text-gray-500 text-center">
                    {index % 6 === 0 ? hour : ""}
                  </div>
                ))}
              </div>
              
              {/* Heatmap grid */}
              {engagementData.map((dayData, dayIndex) => (
                <div key={dayIndex} className="flex items-center space-x-1">
                  <div className="w-12 text-sm text-gray-700 font-medium">
                    {dayLabels[dayIndex]}
                  </div>
                  {dayData.map((value, hourIndex) => (
                    <div
                      key={hourIndex}
                      className={`w-8 h-6 rounded text-xs flex items-center justify-center ${getIntensityColor(value)} ${getTextColor(value)}`}
                      title={`${dayLabels[dayIndex]} ${hourLabels[hourIndex]}: ${value} interactions`}
                    >
                      {value > 30 ? value : ""}
                    </div>
                  ))}
                </div>
              ))}
              
              {/* Legend */}
              <div className="flex items-center justify-center space-x-2 pt-4">
                <span className="text-xs text-gray-500">Low</span>
                <div className="flex space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded"></div>
                  <div className="w-3 h-3 bg-blue-100 rounded"></div>
                  <div className="w-3 h-3 bg-blue-200 rounded"></div>
                  <div className="w-3 h-3 bg-blue-400 rounded"></div>
                  <div className="w-3 h-3 bg-blue-500 rounded"></div>
                  <div className="w-3 h-3 bg-blue-600 rounded"></div>
                </div>
                <span className="text-xs text-gray-500">High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Campaign Performance */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Campaign Performance</h2>
          
          <div className="space-y-3">
            {recentCampaigns.map((campaign) => (
              <div key={campaign.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                    {getStatusBadge(campaign.status)}
                  </div>
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View Details
                    <ArrowUpRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div>
                    <p className="text-gray-500">CPA</p>
                    <p className="font-medium">{campaign.cpa} ETH</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Conversions</p>
                    <p className="font-medium">{campaign.conversions}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Spend</p>
                    <p className="font-medium">{campaign.spend} ETH</p>
                  </div>
                  <div>
                    <p className="text-gray-500">ROI</p>
                    <div className="flex items-center space-x-1">
                      <p className="font-medium text-green-600">{campaign.roi}%</p>
                      <TrendingUp className="h-3 w-3 text-green-500" />
                    </div>
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