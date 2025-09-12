"use client";

import { AppShell } from "@/components/layout/AppShell";
import { DataTable, Column } from "@/components/common/DataTable";
import { useReferralStore } from "@/stores/referralStore";
import { ReferralCode } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, Plus, ExternalLink } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ReferralsPage() {
  const { codes, generateCode } = useReferralStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleGenerateCode = () => {
    generateCode();
    toast.success("New referral code generated!");
  };

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(`https://advyr.com/ref/${code}`);
      setCopiedCode(code);
      toast.success("Referral link copied!");
      
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      toast.error("Failed to copy link");
    }
  };

  const getConversionRate = (conversions: number, signups: number) => {
    if (signups === 0) return "0%";
    return `${((conversions / signups) * 100).toFixed(1)}%`;
  };

  const columns: Column<ReferralCode>[] = [
    {
      key: "code",
      header: "Code",
      render: (value) => (
        <Badge variant="outline" className="font-mono bg-gray-50">
          {value}
        </Badge>
      ),
      sortable: true
    },
    {
      key: "clicks",
      header: "Clicks",
      render: (value) => (
        <span className="text-gray-900">{value.toLocaleString()}</span>
      ),
      sortable: true
    },
    {
      key: "signups",
      header: "Signups",
      render: (value) => (
        <span className="text-gray-900">{value.toLocaleString()}</span>
      ),
      sortable: true
    },
    {
      key: "conversions",
      header: "Conversions",
      render: (value) => (
        <span className="text-gray-900">{value.toLocaleString()}</span>
      ),
      sortable: true
    },
    {
      key: "conversionRate",
      header: "Rate",
      render: (_, referral) => {
        const rate = referral.signups > 0 ? (referral.conversions / referral.signups) : 0;
        return (
          <Badge 
            variant="outline"
            className={`font-medium border-0 ${
              rate > 0.1 ? "text-green-700 bg-green-50" : "text-gray-700 bg-gray-50"
            }`}
          >
            {getConversionRate(referral.conversions, referral.signups)}
          </Badge>
        );
      }
    },
    {
      key: "actions",
      header: "",
      render: (_, referral) => (
        <div className="flex items-center space-x-1">
          <Button
            size="sm"
            variant="ghost"
            className="h-8 w-8 p-0 hover:bg-gray-100"
            onClick={() => handleCopyCode(referral.code)}
          >
            <Copy className="h-3 w-3" />
          </Button>
          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
            <ExternalLink className="h-3 w-3" />
          </Button>
        </div>
      )
    }
  ];

  const totalClicks = codes.reduce((sum, code) => sum + code.clicks, 0);
  const totalSignups = codes.reduce((sum, code) => sum + code.signups, 0);
  const totalConversions = codes.reduce((sum, code) => sum + code.conversions, 0);
  const overallRate = totalSignups > 0 ? (totalConversions / totalSignups) * 100 : 0;

  return (
    <AppShell title="Referrals">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold text-gray-900">Referrals</h1>
            <p className="text-gray-500">{codes.length} active codes • {overallRate.toFixed(1)}% conversion rate</p>
          </div>
          
          <Button onClick={handleGenerateCode} className="bg-blue-500 hover:bg-blue-600 rounded-lg">
            <Plus className="h-4 w-4 mr-2" />
            Generate Code
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-8">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-2xl font-bold text-gray-900">{totalClicks.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Total Signups</p>
            <p className="text-2xl font-bold text-gray-900">{totalSignups.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Conversions</p>
            <p className="text-2xl font-bold text-gray-900">{totalConversions.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Conversion Rate</p>
            <p className="text-2xl font-bold text-blue-600">{overallRate.toFixed(1)}%</p>
          </div>
        </div>

        {/* Referral Codes Table */}
        <div className="space-y-4">
          <DataTable data={codes} columns={columns} className="border-0 shadow-none" />
        </div>

        {/* How it works */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">How referrals work</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-semibold text-sm">1</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Generate Code</h4>
                <p className="text-sm text-gray-600">Create unique referral codes</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-semibold text-sm">2</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Share Links</h4>
                <p className="text-sm text-gray-600">Distribute across channels</p>
              </div>
            </div>
            <div className="text-center space-y-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-semibold text-sm">3</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">Earn Rewards</h4>
                <p className="text-sm text-gray-600">Get paid for conversions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}