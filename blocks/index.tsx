import { type ButtonBlock } from "./ButtonBlock";
import { type ImageBlock } from "./ImageBlock";
import { type ListBlock } from "./ListBlock";
import { type TextBlock } from "./TextBlock";

export * from "./ButtonBlock";
export * from "./ImageBlock";
export * from "./ListBlock";
export * from "./TextBlock";

// generic types
export type Block = TextBlock | ButtonBlock | ImageBlock | ListBlock;
export * from './types'
