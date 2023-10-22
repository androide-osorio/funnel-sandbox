import React from "react";

import Image from "next/image";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

type Props = {
  breadcrumb?: string[];
};

export default function AppBar({ breadcrumb }: Props) {
  return (
    <header className="flex gap-4 justify-between items-center bg-white px-6 py-4 sticky z-10 border-b-gray-100 border-b">
      <Image
        src="/perspective-logo.png"
        alt="Perspective.io"
        width={32}
        height={32}
      />
      <ol className="flex gap-3 flex-1 items-baseline">
        {breadcrumb &&
          breadcrumb.map((crumb, i) => (
            <>
              <li
                key={`breadcrumb-${i}`}
                className="font-medium text-lg flex gap-3"
              >
                {crumb}
              </li>
              {i !== breadcrumb.length - 1 ? (
                <li role="presentation">
                  <ChevronRightIcon className="w-4 h-4 mt-2" />
                </li>
              ) : null}
            </>
          ))}
      </ol>
      <button className="rounded-lg bg-blue-500 hover:bg-blue-700 px-4 py-3 text-white flex items-center gap-2">
        Preview funnel
        <ArrowUpTrayIcon className="w-4 h-4 inline-block" />
      </button>
    </header>
  );
}
