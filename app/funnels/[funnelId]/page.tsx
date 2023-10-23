"use client";
import React from "react";
import Link from "next/link";

import { useFunnelStore } from "@/app/store";
import CodeEditor from "@/app/components/CodeEditor";
import { PagePreview } from "@/app/components/PagePreview";
import { useSearchParams } from "next/navigation";

type FunnelPageParams = {
  funnelId: string;
};

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
  const { funnelId } = params;
  const query = useSearchParams();
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );

  if (!funnel) {
    return <div>Funnel not found</div>;
  }

  const pageId = query.get("page");
  const page = funnel.pages.find((p) => p.id === pageId) ?? funnel.pages[0];

  return (
    <section className="grid grid-cols-3">
      <aside className="col-span-1 height-full">
        <CodeEditor
          code={JSON.stringify(funnel, undefined, 2)}
          language="json"
          editable={false}
        />
      </aside>
      <section className="col-span-2 flex flex-row justify-center items-center gap-8 bg-slate-50 dark:bg-slate-950">
        <div
          className={`overflow-x-hidden bg-${
            `[${funnel.bgColor}]` ?? "white"
          } rounded-3xl shadow-xl max-w-sm h-[600px]`}
        >
          <PagePreview {...page} bgColor={funnel.bgColor} />
        </div>
        <nav>
          <ol className="flex flex-col gap-2">
            {funnel.pages.map((page, i) => (
              <li
                key={`funnel-${funnelId}-page-${page.id}-link`}
                className={`py-1 pl-4 ${
                  page.id === pageId ? "border-blue-500 border-l-2" : "ml-[2px]"
                }`}
              >
                <Link
                  href="/funnels/[funnelId]"
                  as={`/funnels/${funnel.id}?page=${page.id}`}
                >
                  Page {i + 1}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </section>
  );
}
