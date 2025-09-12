"use client";

import { Menu } from "lucide-react";
import { useUiStore } from "@/stores/uiStore";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  const { setSidebarOpen, timeRange, setTimeRange } = useUiStore();

  return (
    <header className="bg-white border-b border-gray-100 px-8 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 -ml-2"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center p-1">
              <Image
                src="/Image/Logo/advyr-top.png"
                alt="Advyr Logo"
                width={20}
                height={24}
                className="object-contain"
              />
            </div>
            <Breadcrumb />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-500">Time Range:</span>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-36 border-gray-200 rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </header>
  );
}