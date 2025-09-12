"use client";

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { useAnalyticsStore } from "@/stores/analyticsStore";
import { useUiStore } from "@/stores/uiStore";

export function UsersSpendChart() {
  const { getFilteredTimeseries } = useAnalyticsStore();
  const { timeRange } = useUiStore();
  
  const data = getFilteredTimeseries(timeRange);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const date = new Date(label).toLocaleDateString();
      
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-900 mb-2">{date}</p>
          {payload.map((entry: any) => (
            <p key={entry.dataKey} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.dataKey === "users" 
                ? entry.value.toLocaleString() 
                : `${entry.value.toFixed(2)} ETH`
              }
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        Users & CPA Spend Over Time
      </h3>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="date" 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => new Date(value).toLocaleDateString('en', { 
                month: 'short', 
                day: 'numeric' 
              })}
            />
            <YAxis 
              yAxisId="users"
              orientation="left"
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              yAxisId="spend"
              orientation="right"
              stroke="#64748b"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            
            <Area
              yAxisId="users"
              type="monotone"
              dataKey="users"
              name="Users"
              fill="#0ea5e9"
              fillOpacity={0.1}
              stroke="#0ea5e9"
              strokeWidth={2}
            />
            
            <Line
              yAxisId="spend"
              type="monotone"
              dataKey="cpaSpend"
              name="CPA Spend (ETH)"
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}