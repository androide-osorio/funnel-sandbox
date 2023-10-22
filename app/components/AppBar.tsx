import React from 'react';

import Image from 'next/image';

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
      <ol className="flex gap-4 flex-1">
        {breadcrumb &&
          breadcrumb.map((crumb, i) =>
            i === breadcrumb.length - 1 ? (
              <li key={`breadcrumb-${i}`}>{crumb}</li>
            ) : (
              <li key={`breadcrumb-${i}`}>
                <span>{crumb}</span>
                <span>&gt;</span>
              </li>
            )
          )}
      </ol>
      <h1 className="text-xl">Funnel Previewer</h1>
    </header>
  );
};
