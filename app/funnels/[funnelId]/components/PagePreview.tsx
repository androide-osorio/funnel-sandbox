import React from "react";
import { Block, Page } from "@/types";
import {
  ButtonBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from "@/components/blocks";

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
      id="funnel-preview"
      aria-live="assertive"
      className="overflow-x-hidden md:rounded-3xl shadow-xl md:max-w-sm max-h-[600px] md:h-[600px]"
    >
      <div
        className="p-12 flex flex-col gap-5 min-h-full"
        style={{ backgroundColor: bgColor }}
      >
        {memoizedBlocks}
      </div>
    </div>
  );
}
