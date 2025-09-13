"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Column } from "@/components/common/DataTable";
import { ProgressBar } from "@/components/common/ProgressBar";
import { useCampaignStore } from "@/stores/campaignStore";
import { Campaign } from "@/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus, Eye, Zap } from "lucide-react";
import { CreateAdDialog } from "@/components/ads/CreateAdDialog";
import { MakeOnchainDialog } from "@/components/ads/MakeOnchainDialog";

type CampaignFormData = {
  title: string;
  description: string;
  budgetLocked: number;
  duration: number;
  aiAgent: string;
  paymentToken: string;
};

export default function AdsPage() {
  const { campaigns, createCampaign } = useCampaignStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [onchainDialogOpen, setOnchainDialogOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  
  // Mock AI Agents data
  const availableAgents = [
    {
      id: "agent-1",
      name: "DeFi Maximizer",
      description: "Specialized in DeFi protocols and yield farming",
      aiModel: "Coinbase Agentkit",
      status: "active",
      defaultSettings: {
        title: "DeFi Yield Farming Rewards",
        description: "Earn high APY rewards by providing liquidity to DeFi protocols on Base network",
        budgetLocked: 2.5,
        duration: 30
      }
    },
    {
      id: "agent-2", 
      name: "NFT Promoter",
      description: "Expert in NFT marketing and community building",
      aiModel: "Coinbase Agentkit",
      status: "active",
      defaultSettings: {
        title: "NFT Mint Rewards Campaign",
        description: "Get exclusive rewards for minting NFTs from verified collections on Base",
        budgetLocked: 1.8,
        duration: 14
      }
    },
    {
      id: "agent-3",
      name: "Base Builder",
      description: "Focused on Base ecosystem growth",
      aiModel: "Coinbase Agentkit", 
      status: "active",
      defaultSettings: {
        title: "Base Network Growth Incentives",
        description: "Earn rewards for bridging assets and participating in Base ecosystem",
        budgetLocked: 5.0,
        duration: 45
      }
    }
  ];
  
  const handleCreateAd = (data: CampaignFormData) => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + data.duration);
    
    createCampaign({
      title: data.title,
      description: data.description,
      budgetLocked: data.budgetLocked,
      startDate: new Date().toISOString(),
      endDate: endDate.toISOString(),
      status: "draft"
    });
  };

  const handleMakeOnchain = async (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setOnchainDialogOpen(true);
  };

  const deployToBlockchain = async () => {
    // Simulate blockchain deployment
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Here you would integrate with actual blockchain deployment
    // - Deploy smart contract
    // - Set up payment channels
    // - Configure Base network parameters
    // - Initialize CPA tracking
    
    setOnchainDialogOpen(false);
    setSelectedCampaign(null);
    
    // Show success message or redirect
  };

  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      active: "text-green-700 bg-green-50 border-green-200",
      paused: "text-yellow-700 bg-yellow-50 border-yellow-200", 
      completed: "text-blue-700 bg-blue-50 border-blue-200",
      draft: "text-gray-700 bg-gray-50 border-gray-200"
    };
    
    return (
      <Badge variant="outline" className={`${variants[status]} font-medium`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns: Column<Campaign>[] = [
    {
      key: "title",
      header: "Ad",
      render: (value, campaign) => (
        <div className="space-y-1">
          <p className="font-medium text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 truncate max-w-xs">{campaign.description}</p>
        </div>
      ),
      sortable: true
    },
    {
      key: "status",
      header: "Status",
      render: (value) => getStatusBadge(value),
      sortable: true
    },
    {
      key: "budgetLocked",
      header: "Budget",
      render: (value) => (
        <span className="font-medium text-gray-900">{value.toFixed(2)} ETH</span>
      ),
      sortable: true
    },
    {
      key: "spent",
      header: "Spent",
      render: (value) => (
        <span className="text-gray-600">{value.toFixed(2)} ETH</span>
      ),
      sortable: true
    },
    {
      key: "validActions",
      header: "Actions", 
      render: (value) => (
        <span className="text-gray-900">{value.toLocaleString()}</span>
      ),
      sortable: true
    },
    {
      key: "progress",
      header: "Progress",
      render: (_, campaign) => (
        <div className="w-24">
          <div className="text-xs text-gray-500 mb-1">
            {((campaign.spent / campaign.budgetLocked) * 100).toFixed(0)}%
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(campaign.spent / campaign.budgetLocked) * 100}%` }}
            />
          </div>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, campaign) => (
        <div className="flex items-center space-x-2">
          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2 text-xs"
          >
            <Eye className="h-3 w-3 mr-1" />
            View
          </Button>
          {campaign.status === "draft" && (
            <Button
              size="sm"
              onClick={() => handleMakeOnchain(campaign)}
              className="h-8 px-2 text-xs bg-blue-500 hover:bg-blue-600 text-white border border-blue-200"
            >
              <Zap className="h-3 w-3 mr-1" />
              Make Onchain
            </Button>
          )}
          {campaign.status === "active" && (
            <div className="flex items-center text-xs text-green-600">
              <Zap className="h-3 w-3 mr-1" />
              Onchain
            </div>
          )}
        </div>
      )
    }
  ];

  const activeCampaigns = campaigns.filter(c => c.status === "active").length;
  const totalBudget = campaigns.reduce((sum, c) => sum + c.budgetLocked, 0);
  const totalSpent = campaigns.reduce((sum, c) => sum + c.spent, 0);

  return (
    <AppShell title="Ads">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Ads</h1>
            <p className="text-gray-500">{campaigns.length} total ads • {activeCampaigns} active</p>
          </div>
          
          <CreateAdDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            onSubmit={handleCreateAd}
            availableAgents={availableAgents}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">{totalBudget.toFixed(2)} ETH</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Spent</p>
            <p className="text-2xl font-bold text-gray-900">{totalSpent.toFixed(2)} ETH</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Available</p>
            <p className="text-2xl font-bold text-green-600">{(totalBudget - totalSpent).toFixed(2)} ETH</p>
          </div>
        </div>

        {/* Ads Table */}
        <div className="space-y-4">
          <DataTable data={campaigns} columns={columns} className="border-0 shadow-none" />
        </div>

        {/* Make Onchain Dialog */}
        <MakeOnchainDialog
          open={onchainDialogOpen}
          onOpenChange={setOnchainDialogOpen}
          campaign={selectedCampaign}
          onDeploy={deployToBlockchain}
        />
      </div>
    </AppShell>
  );
}