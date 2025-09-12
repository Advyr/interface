import { create } from "zustand";
import { ReferralCode } from "@/types";
import { referralCodesMock } from "@/mocks/referrals";

interface ReferralStore {
  codes: ReferralCode[];
  generateCode: () => void;
}

const generateRandomCode = (): string => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "ADVYR-";
  for (let i = 0; i < 4; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const useReferralStore = create<ReferralStore>((set) => ({
  codes: referralCodesMock,
  generateCode: () =>
    set((state) => ({
      codes: [
        ...state.codes,
        {
          id: `ref-${Date.now()}`,
          code: generateRandomCode(),
          clicks: 0,
          signups: 0,
          conversions: 0
        }
      ]
    }))
}));