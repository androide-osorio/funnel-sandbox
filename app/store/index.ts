import { create } from "zustand";
import { persist, PersistOptions } from "zustand/middleware";

import { FunnelWithId } from "./types";

type Data = {
  funnels: FunnelWithId[];
};

type Actions = {
  addFunnel: (funnel: FunnelWithId) => void;
  removeFunnel: (funnelId: string) => void;
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
    }),
    persistOptions
  )
);

export default useFunnelStore;
