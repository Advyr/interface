import { create } from "zustand";
import { Campaign } from "@/types";
import { campaignsMock } from "@/mocks/campaigns";

interface CampaignStore {
  campaigns: Campaign[];
  createCampaign: (campaign: Omit<Campaign, "id" | "spent" | "autoPayoutsDone" | "validActions">) => void;
}

export const useCampaignStore = create<CampaignStore>((set) => ({
  campaigns: campaignsMock,
  createCampaign: (campaignData) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...campaignData,
          id: `campaign-${Date.now()}`,
          spent: 0,
          autoPayoutsDone: 0,
          validActions: 0
        }
      ]
    }))
}));