import { create } from "zustand";
import { TimeRange } from "@/types";

interface UiStore {
  sidebarOpen: boolean;
  timeRange: TimeRange;
  setSidebarOpen: (open: boolean) => void;
  setTimeRange: (range: TimeRange) => void;
}

export const useUiStore = create<UiStore>((set) => ({
  sidebarOpen: true,
  timeRange: "30d",
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  setTimeRange: (range) => set({ timeRange: range })
}));