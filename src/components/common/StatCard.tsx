import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  helperText?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "minimal";
}

export function StatCard({
  title,
  value,
  icon: Icon,
  helperText,
  trend,
  className,
  variant = "default"
}: StatCardProps) {
  if (variant === "minimal") {
    return (
      <div className={cn("space-y-2", className)}>
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <Icon className="h-3 w-3 text-white" />
          </div>
          <h3 className="text-sm font-medium text-gray-700">{title}</h3>
        </div>
        
        <div className="space-y-1">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {helperText && (
            <p className="text-xs text-gray-500">{helperText}</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cn(
      "bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow",
      className
    )}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
          
          <div className="flex items-center space-x-2">
            {helperText && (
              <p className="text-sm text-gray-500">{helperText}</p>
            )}
            {trend && (
              <span
                className={cn(
                  "text-sm font-medium",
                  trend.isPositive ? "text-green-600" : "text-red-600"
                )}
              >
                {trend.isPositive ? "+" : ""}{trend.value}%
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center">
            <Icon className="h-6 w-6 text-sky-600" />
          </div>
        </div>
      </div>
    </div>
  );
}