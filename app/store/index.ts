import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { FunnelWithId } from "./types";
import { FunnelProcessor, FunnelProcessorErrors, ParsedFunnel } from "@/app/services/funnel-processor";

type Data = {
  funnels: FunnelWithId[];
};

type Actions = {
  addFunnel: (funnel: FunnelWithId) => void;
  removeFunnel: (funnelId: string) => void;
  addFunnelFromFile: (file: File) => Promise<string | FunnelProcessorErrors>;
};

type State = Data & Actions;

const persistOptions: PersistOptions<State> = {
  name: "funnel-sandbox",
  getStorage: () => localStorage,
};

export const useFunnelStore = create<State>()(
  persist<State>(
    (set) => ({
      funnels: [],
      addFunnel: (funnel: FunnelWithId) =>
        set((state: State) => ({ funnels: [...state.funnels, funnel] })),
      removeFunnel: (funnelId: string) =>
        set((state: State) => ({
          funnels: state.funnels.filter((funnel) => funnel.id !== funnelId),
        })),
      addFunnelFromFile: async (file: File): Promise<string | FunnelProcessorErrors> => {
        const processor = FunnelProcessor();
        try {
          const result = await processor.readFunnelFromFile(file);
          const funnel = (result as ParsedFunnel).data;
          const id = uuidv4();
          set((state: State) => ({
            funnels: [...state.funnels, { ...funnel, id }],
          }));
          return id;
        } catch (error) {
          throw error as FunnelProcessorErrors;
        }
      },
    }),
    persistOptions
  )
);

export default useFunnelStore;
