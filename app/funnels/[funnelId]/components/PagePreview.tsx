import React, { useCallback } from "react";
import { Block } from "@/blocks";
import { Page } from "@/types";
import {
  ButtonBlock,
  ImageBlock,
  ListBlock,
  TextBlock,
} from "@/blocks";
import { useHighlightBlock } from "@/app/components/HighlightBlockProvider";

type Props = Page & {
  bgColor?: string;
  highlightedBlock?: string;
};

const BLOCK_MAPPINGS: Record<string, React.ComponentType<any>> = {
  text: TextBlock,
  image: ImageBlock,
  list: ListBlock,
  button: ButtonBlock,
};

export function PagePreview({ blocks, bgColor = "white" }: Props) {
  const { currentBlock } = useHighlightBlock();
  const mapBlock = useCallback(
    (block: Block) => {
      const Component = BLOCK_MAPPINGS[block.type];
      return (
        <div
          key={block.id}
          className={
            currentBlock === block.id
              ? "ring ring-offset-8 ring-blue-500 rounded-md"
              : ""
          }
        >
          <Component {...block} />
        </div>
      );
    },
    [currentBlock],
  );

  const memoizedBlocks = React.useMemo(
    () => blocks.map(mapBlock),
    [blocks, mapBlock],
  );

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
