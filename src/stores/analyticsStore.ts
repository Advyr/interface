import { create } from "zustand";
import { AnalyticsSummary, ActionBreakdown, TimeseriesPoint, TimeRange } from "@/types";
import { analyticsSummaryMock, actionBreakdownMock, timeseriesMock } from "@/mocks/analytics";

interface AnalyticsStore {
  summary: AnalyticsSummary;
  breakdown: ActionBreakdown;
  timeseries: TimeseriesPoint[];
  getFilteredTimeseries: (timeRange: TimeRange) => TimeseriesPoint[];
}

const filterTimeseriesData = (data: TimeseriesPoint[], timeRange: TimeRange): TimeseriesPoint[] => {
  const now = new Date();
  let daysBack = 30;

  if (timeRange === "7d") {
    daysBack = 7;
  } else if (timeRange === "custom") {
    daysBack = 30;
  }

  const cutoffDate = new Date(now.getTime() - daysBack * 24 * 60 * 60 * 1000);
  return data.filter(point => new Date(point.date) >= cutoffDate);
};

export const useAnalyticsStore = create<AnalyticsStore>((set, get) => ({
  summary: analyticsSummaryMock,
  breakdown: actionBreakdownMock,
  timeseries: timeseriesMock,
  getFilteredTimeseries: (timeRange) => {
    const { timeseries } = get();
    return filterTimeseriesData(timeseries, timeRange);
  }
}));