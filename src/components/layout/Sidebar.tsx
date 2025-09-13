"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Home, Megaphone, Users, Gift, Bot, Settings, X, BarChart3, Shield, Wallet } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Agents", href: "/agents", icon: Bot },
  { name: "Create Ads", href: "/ads", icon: Megaphone },
  { name: "Referrals", href: "/referrals", icon: Gift },
  { name: "Analytics & Insights", href: "/analytics-insights", icon: BarChart3 },
  { name: "CPA Verification", href: "/cpa-verification", icon: Shield },
  { name: "Finance & Escrow", href: "/finance-escrow", icon: Wallet },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useUiStore();

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden",
          sidebarOpen ? "block" : "hidden"
        )}
        onClick={() => setSidebarOpen(false)}
      >
        <div className="absolute inset-0 bg-gray-600 opacity-75" />
      </div>

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-60 bg-gray-50 border-r border-gray-200 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 flex flex-col",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center h-20 px-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-7 h-5 relative">
              <Image
                src="/Image/Logo/advyr-top.png"
                alt="Advyr Logo"
                width={20}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-gray-900">Advyr</span>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden ml-auto p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                  isActive
                    ? "text-blue-500 font-semibold bg-blue-50"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white"
                )}
              >
                <Icon
                  className={cn(
                    "mr-4 h-5 w-5",
                    isActive
                      ? "text-blue-500"
                      : "text-gray-400 group-hover:text-gray-600"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Bottom spacing */}
        <div className="h-6" />
      </div>
    </>
  );
}
