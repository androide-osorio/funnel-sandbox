export type BlockTypes = "text" | "image" | "list" | "button";
export type Alignments = "left" | "center" | "right";

export type GenericBlock = {
  id: string;
  type: BlockTypes;
};
