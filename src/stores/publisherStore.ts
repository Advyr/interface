import { create } from "zustand";
import { Publisher } from "@/types";
import { publishersMock } from "@/mocks/publishers";

interface PublisherStore {
  publishers: Publisher[];
  addPublisher: (publisher: Omit<Publisher, "id" | "trafficViews" | "ctr">) => void;
}

export const usePublisherStore = create<PublisherStore>((set) => ({
  publishers: publishersMock,
  addPublisher: (publisherData) =>
    set((state) => ({
      publishers: [
        ...state.publishers,
        {
          ...publisherData,
          id: `pub-${Date.now()}`,
          trafficViews: 0,
          ctr: 0
        }
      ]
    }))
}));