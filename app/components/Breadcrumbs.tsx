import React from 'react';
import { ChevronRightIcon } from "@heroicons/react/24/solid";

type Props = {
	path?: string[];
}

export function Breadcrumbs({ path }: Props) {
	return (
    <ol className="flex gap-3 flex-1 items-baseline">
      {path &&
        path.map((crumb, i) => (
          <>
            <li
              key={`breadcrumb-${i}`}
              className="font-medium text-lg flex gap-3"
            >
              {crumb}
            </li>
            {i !== path.length - 1 ? (
              <li role="presentation">
                <ChevronRightIcon className="w-4 h-4 mt-2" />
              </li>
            ) : null}
          </>
        ))}
    </ol>
  );
};
