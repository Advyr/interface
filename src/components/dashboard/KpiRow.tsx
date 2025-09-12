"use client";

import { StatCard } from "@/components/common/StatCard";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { Activity, Target, DollarSign, RefreshCw } from "lucide-react";

export function KpiRow() {
  const { summary } = useAnalyticsStore();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Valid Actions"
        value={summary.totalValidActions.toLocaleString()}
        icon={Activity}
        helperText="This month"
      />
      
      <StatCard
        title="Active Campaigns"
        value={summary.activeCampaigns.toString()}
        icon={Target}
        helperText="Currently running"
      />
      
      <StatCard
        title="Total CPA Spent"
        value={`${summary.totalCpaSpent.toFixed(2)} ETH`}
        icon={DollarSign}
        helperText="Lifetime spent"
      />
      
      <StatCard
        title="Refunded Budget"
        value={`${summary.refundedBudget.toFixed(2)} ETH`}
        icon={RefreshCw}
        helperText="Available to claim"
      />
    </div>
  );
}