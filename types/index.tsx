import { Block } from "@/blocks";

export type Page = {
  id: string;
  blocks: Block[];
};

export type Funnel = {
  name: string;
  bgColor?: string;
  pages: Page[];
};

export type FunnelWithId = Funnel & {
  id: string;
};
