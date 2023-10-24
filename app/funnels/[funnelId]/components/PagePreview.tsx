import React from "react";
import { Block, Page } from "@/app/store/types";
import {
  ButtonBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from "@/app/components/blocks";

type Props = Page & {
  bgColor?: string;
};

const BLOCK_MAPPINGS: Record<string, React.ComponentType<any>> = {
  text: TextBlock,
  image: ImageBlock,
  list: ListBlock,
  button: ButtonBlock,
};

export function PagePreview({ blocks, bgColor = "white" }: Props) {
  const mapBlock = (block: Block) => {
    const Component = BLOCK_MAPPINGS[block.type];
    return <Component {...block} />;
  };

  const memoizedBlocks = React.useMemo(() => blocks.map(mapBlock), [blocks]);

  return (
    <div
      className="p-12 flex flex-col gap-5 min-h-full"
      style={{ backgroundColor: bgColor }}
    >
      {memoizedBlocks}
    </div>
  );
}
