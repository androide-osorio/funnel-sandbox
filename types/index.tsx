export type BlockTypes = "text" | "image" | "list" | "button";
export type Alignments = "left" | "center" | "right";

export type GenericBlock = {
  id: string;
  type: BlockTypes;
};

export type TextBlock = GenericBlock & {
  type: "text";
  text: string;
  color?: string;
  align?: Alignments;
};

export type ButtonBlock = GenericBlock & {
  type: "button";
  text: string;
  color?: string;
  bgColor?: string;
};

export type ImageBlock = GenericBlock & {
  type: "image";
  src: string;
};

export type ListBlock = GenericBlock & {
  type: "list";
  layout?: "vstack" | "hstack" | "grid";
  items: ListItem[];
};

export type Block = TextBlock | ButtonBlock | ImageBlock | ListBlock;

export type ListItem = {
  title: string;
  description?: string;
  src?: string;
};

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
