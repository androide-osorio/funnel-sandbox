import React from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";

import { Block } from "@/app/store/types";
import { PropertyList } from "@/app/components/PropertyList";

interface FunnelSummaryProps {
  backgroundColor?: string;
  blocks: Block[];
  funnelName: string;
  funnelNumPages: number;
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
      {/* <dl className="py-3 grid grid-cols-2 gap-y-2">
        <dt className="border-slate-300 dark:border-slate-600 dark:text-slate-300 py-2">
          Name
        </dt>
        <dd className="text-right border-slate-300  dark:text-slate-300 dark:border-slate-600 py-2">
          {funnelName}
        </dd>
        <dt className="border-t border-slate-300 dark:border-slate-600 py-2 dark:text-slate-300">
          Pages
        </dt>
        <dd className="border-t text-right border-slate-300 dark:border-slate-600 py-2 dark:text-slate-300">
          {funnelNumPages}
        </dd>
        <dt className="border-t border-slate-300 dark:border-slate-600 py-2 dark:text-slate-300">
          Background Color
        </dt>
        <dd className="border-t text-right border-slate-300 dark:border-slate-600 py-2 flex items-center gap-1 justify-end dark:text-slate-300">
          {backgroundColor}
          <span
            className="inline-block w-5 h-5 rounded"
            style={{ backgroundColor }}
          ></span>
        </dd>
      </dl> */}

      <section>
        <h3 className="text-xl font-medium mb-3">Blocks</h3>
        <ol className="flex flex-col gap-2">
          {blocks.map((block) => (
            <li
              key={block.id}
              className="py-3 px-6 bg-slate-200 dark:bg-slate-700 rounded-lg"
            >
              <details>
                <summary className="flex gap-2">
                  {iconForBlock(block)}
                  <h4 className="capitalize">{block.type}</h4>
                </summary>
                <pre>{JSON.stringify(block, undefined, 2)}</pre>
              </details>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export default FunnelSummary;
