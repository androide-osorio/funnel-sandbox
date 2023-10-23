import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

import { FunnelWithId } from "./types";
import { FunnelProcessor } from "@/app/services/funnel-processor";

type Data = {
  funnels: FunnelWithId[];
};

type Actions = {
  addFunnel: (funnel: FunnelWithId) => void;
  removeFunnel: (funnelId: string) => void;
  addFunnelFromFile: (file: File) => Promise<string | null>;
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
      addFunnelFromFile: async (file: File): Promise<string | null> => {
        const processor = FunnelProcessor();
        try {
          const { data: funnel } = await processor.readFunnelFromFile(file);
          const id = uuidv4();
          set((state: State) => ({
            funnels: [...state.funnels, { ...funnel, id }],
          }));
          return id;
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          return null;
        }
      },
    }),
    persistOptions
  )
);

export default useFunnelStore;
