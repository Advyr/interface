"use client";

import { AppShell } from "@/components/layout/AppShell";
import { StatCard } from "@/components/common/StatCard";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useUiStore } from "@/stores/uiStore";
import { useCampaignStore } from "@/stores/campaignStore";
import { Activity, Target, Users, Zap, MoreHorizontal, Power, User, Settings, Bot } from "lucide-react";
import Image from "next/image";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip
} from "recharts";

export default function DashboardPage() {
  const { summary, getFilteredTimeseries } = useAnalyticsStore();
  const { timeRange } = useUiStore();
  const { campaigns } = useCampaignStore();
  
  const activeCampaigns = campaigns.filter(c => c.status === "active");
  
  // Mock data for charts to ensure visibility
  const mockUserData = [
    { date: "Dec 1", users: 145 },
    { date: "Dec 2", users: 167 },
    { date: "Dec 3", users: 189 },
    { date: "Dec 4", users: 203 },
    { date: "Dec 5", users: 198 },
    { date: "Dec 6", users: 221 },
    { date: "Dec 7", users: 245 },
    { date: "Dec 8", users: 267 },
    { date: "Dec 9", users: 289 },
    { date: "Dec 10", users: 301 },
    { date: "Dec 11", users: 325 },
    { date: "Dec 12", users: 347 },
    { date: "Dec 13", users: 362 },
    { date: "Dec 14", users: 378 }
  ];

  const mockSpendData = [
    { date: "Dec 1", cpaSpend: 0.8 },
    { date: "Dec 2", cpaSpend: 0.9 },
    { date: "Dec 3", cpaSpend: 1.2 },
    { date: "Dec 4", cpaSpend: 1.4 },
    { date: "Dec 5", cpaSpend: 1.1 },
    { date: "Dec 6", cpaSpend: 1.6 },
    { date: "Dec 7", cpaSpend: 1.8 },
    { date: "Dec 8", cpaSpend: 2.1 },
    { date: "Dec 9", cpaSpend: 2.3 },
    { date: "Dec 10", cpaSpend: 2.0 },
    { date: "Dec 11", cpaSpend: 2.4 },
    { date: "Dec 12", cpaSpend: 2.7 },
    { date: "Dec 13", cpaSpend: 2.9 },
    { date: "Dec 14", cpaSpend: 3.1 }
  ];

  const currentUsers = mockUserData.reduce((sum, d) => sum + d.users, 0);

  // Mock AI agents data
  const aiAgents = [
    {
      id: 1,
      name: "Ads Agents",
      description: "this is agent for seven",
      status: "Active",
      createdAt: "7 hours ago",
      users: 0,
      resources: 0,
      workflows: 0,
      aiModel: "Coinbase Agentkit"
    }
  ];
  

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="text-sm font-medium text-gray-900">
            {label ? new Date(label).toLocaleDateString() : ''}
          </p>
          <p className="text-sm text-blue-600">
            {payload[0].value.toLocaleString()} new users
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <AppShell title="Dashboard">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Main KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          <StatCard
            variant="minimal"
            title="New Users (Last 30 days)"
            value={summary.totalValidActions.toLocaleString()}
            icon={Users}
            helperText="New users in the selected time range"
          />
          
          <StatCard
            variant="minimal"
            title="Total Campaigns"
            value={campaigns.length.toString()}
            icon={Target}
            helperText={`${activeCampaigns.length} active, ${campaigns.length - activeCampaigns.length} paused`}
          />
          
          <StatCard
            variant="minimal" 
            title="Active Workflows"
            value={activeCampaigns.length.toString()}
            icon={Zap}
            helperText={`${activeCampaigns.length} running, 0 paused`}
          />
          
          <StatCard
            variant="minimal"
            title="Total CPA Spent"
            value={`${summary.totalCpaSpent.toFixed(1)}%`}
            icon={Activity}
            helperText="Campaign utilization"
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Growth Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">User Growth</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <span className="text-sm text-gray-500">Daily Users</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockUserData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="users"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: '#3b82f6' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{currentUsers.toLocaleString()}</p>
              <p className="text-sm text-gray-500">Total Users (Last 7 Days)</p>
            </div>
          </div>

          {/* CPA Spending Chart */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">CPA Spending</h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-500">Daily Spend (ETH)</span>
              </div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockSpendData}>
                  <XAxis 
                    dataKey="date" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                            <p className="text-sm font-medium text-gray-900">
                              {label || ''}
                            </p>
                            <p className="text-sm text-green-600">
                              {payload[0].value} ETH spent
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cpaSpend"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 3, fill: '#10b981' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-center">
              <p className="text-2xl font-bold text-gray-900">{summary.totalCpaSpent.toFixed(2)} ETH</p>
              <p className="text-sm text-gray-500">Total CPA Spent</p>
            </div>
          </div>
        </div>

        {/* AI Agents Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bot className="h-6 w-6 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">AI Agents</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiAgents.map((agent) => (
              <div key={agent.id} className="bg-white rounded-2xl p-6 border border-gray-100">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">{agent.createdAt}</p>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-gray-600 text-sm mb-6">
                  {agent.description}
                </p>

                {/* Status indicators */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Power className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{agent.status}</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <User className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{agent.users} users</div>
                  </div>
                  
                  <div className="text-center p-3 bg-gray-50 rounded-lg">
                    <Settings className="h-5 w-5 text-gray-500 mx-auto mb-1" />
                    <div className="text-sm font-medium text-gray-900">{agent.resources} resources</div>
                  </div>
                </div>

                {/* AI Model and Workflows */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 relative">
                      <Image
                        src="/Image/Logo/base-logo.png"
                        alt="Base Logo"
                        width={24}
                        height={24}
                        className="object-contain rounded"
                      />
                    </div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                      {agent.aiModel}
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {agent.workflows} workflows
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