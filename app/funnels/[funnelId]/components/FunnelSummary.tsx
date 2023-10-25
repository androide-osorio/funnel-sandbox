import React from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";

import { Block } from "@/types";
import { PropertyList } from "@/components/PropertyList";
import { CodeEditor } from "@/components/CodeEditor";
import { on } from "events";

interface FunnelSummaryProps {
  backgroundColor?: string;
  blocks: Block[];
  funnelName: string;
  funnelNumPages: number;
  onBlockChange?: (blockId: string) => void;
}

const BlockIconMap = {
  text: Bars3BottomLeftIcon,
  image: PhotoIcon,
  list: ListBulletIcon,
  button: CursorArrowRippleIcon,
};

function FunnelSummary({
  backgroundColor,
  blocks,
  funnelName,
  funnelNumPages,
  onBlockChange,
}: FunnelSummaryProps) {
  const iconForBlock = (block: Block) => {
    const Icon = BlockIconMap[block.type];
    return <Icon className="w-6 h-6" />;
  };

  const funnelData = [
    {
      type: "text",
      name: "Name",
      value: funnelName,
    },
    {
      type: "number",
      name: "Pages",
      value: funnelNumPages.toString(),
    },
    {
      type: "color",
      name: "Background Color",
      value: backgroundColor ?? '#FFFFFF',
    }
  ]

  return (
    <div className="flex flex-col gap-6">
      <PropertyList data={funnelData} />

      <section>
        <h3 className="text-xl font-medium mb-3">Blocks</h3>
        <ol className="flex flex-col gap-2">
          {blocks.map((block) => (
            <li
              key={block.id}
              className="py-3 px-6 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-lg transition transition-gpu cursor-pointer"
              onClick={() => onBlockChange?.(block.id)}
              onMouseEnter={() => onBlockChange?.(block.id)}
            >
              <details>
                <summary className="flex gap-2">
                  {iconForBlock(block)}
                  <h4 className="capitalize">{block.type}</h4>
                </summary>
                <div className="-mr-6 mt-3">
                  <CodeEditor code={JSON.stringify(block, undefined, 2)} language="json" />
                </div>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default FunnelSummary;
