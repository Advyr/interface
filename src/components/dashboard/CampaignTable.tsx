"use client";

import { DataTable, Column } from "@/components/common/DataTable";
import { ProgressBar } from "@/components/common/ProgressBar";
import { useCampaignStore } from "@/stores/campaignStore";
import { Campaign } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCw } from "lucide-react";

export function CampaignTable() {
  const { campaigns } = useCampaignStore();

  const getStatusBadge = (status: Campaign["status"]) => {
    const variants = {
      active: "bg-green-100 text-green-700 border-green-200",
      paused: "bg-yellow-100 text-yellow-700 border-yellow-200",
      completed: "bg-blue-100 text-blue-700 border-blue-200",
      draft: "bg-gray-100 text-gray-700 border-gray-200"
    };
    
    return (
      <Badge variant="secondary" className={variants[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const columns: Column<Campaign>[] = [
    {
      key: "title",
      header: "Campaign Name",
      render: (value, campaign) => (
        <div>
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
      header: "Budget Locked",
      render: (value) => `${value.toFixed(2)} ETH`,
      sortable: true
    },
    {
      key: "spent",
      header: "Spent",
      render: (value) => `${value.toFixed(2)} ETH`,
      sortable: true
    },
    {
      key: "autoPayoutsDone",
      header: "Auto Payouts",
      render: (value) => value.toLocaleString(),
      sortable: true
    },
    {
      key: "validActions",
      header: "Valid Actions",
      render: (value) => value.toLocaleString(),
      sortable: true
    },
    {
      key: "progress",
      header: "Progress",
      render: (_, campaign) => (
        <div className="w-32">
          <ProgressBar
            value={campaign.spent}
            max={campaign.budgetLocked}
            size="sm"
            showPercentage={false}
          />
          <p className="text-xs text-gray-500 mt-1">
            {((campaign.spent / campaign.budgetLocked) * 100).toFixed(1)}%
          </p>
        </div>
      )
    },
    {
      key: "actions",
      header: "Actions",
      render: (_, campaign) => (
        <div className="flex items-center space-x-2">
          <Button size="sm" variant="outline" className="h-8 w-8 p-0">
            <Eye className="h-4 w-4" />
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="h-8 w-8 p-0"
            disabled={campaign.status === "completed" || campaign.spent >= campaign.budgetLocked}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Recent Campaigns</h3>
        <Button variant="outline" size="sm">
          View All Campaigns
        </Button>
      </div>
      
      <DataTable
        data={campaigns.slice(0, 5)}
        columns={columns}
      />
    </div>
  );
}