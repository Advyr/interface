"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const COLORS = {
  swap: "#0ea5e9",
  stake: "#10b981", 
  mint: "#f59e0b",
  walletConnect: "#8b5cf6"
};

export function CpaBreakdownChart() {
  const { breakdown } = useAnalyticsStore();
  const [showByActionType, setShowByActionType] = useState(true);

  const data = Object.entries(breakdown).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
    value,
    color: COLORS[key as keyof typeof COLORS]
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sky-600">
            {data.value.toLocaleString()} actions
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Onchain CPA Breakdown</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowByActionType(!showByActionType)}
          className="text-sm"
        >
          {showByActionType ? "Hide" : "Show"} by Action Type
        </Button>
      </div>

      {showByActionType && (
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry) => (
                  <span style={{ color: entry.color }} className="font-medium">
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 mt-6">
        {data.map((item) => (
          <div key={item.name} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{item.name}</p>
              <p className="text-gray-500 text-xs">{item.value.toLocaleString()} actions</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}