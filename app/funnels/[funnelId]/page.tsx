"use client";
import React from "react";
import Link from "next/link";

import { useFunnelStore } from "@/app/store";
import CodeEditor from "@/app/components/CodeEditor";
import { PagePreview } from "@/app/components/PagePreview";
import { useSearchParams } from "next/navigation";
import FunnelSidebar from "./components/FunnelSidebar";

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
    <section className="flex flex-col-reverse md:grid md:grid-cols-3 w-full">
      <section className="flex flex-col md:flex-row-reverse md:justify-center md:items-center md:col-start-2 md:col-span-2 md:gap-8 bg-slate-50 dark:bg-slate-950 h-[100vh]">
        <header className="md:hidden px-6 py-6">
          <h1 className="text-2xl text-bold">{funnel.name}</h1>
        </header>
        <nav aria-controls="funnel-preview">
          <ol className="flex md:flex-col justify-center gap-2">
            {funnel.pages.map((page, i) => (
              <li
                key={`funnel-${funnelId}-page-${page.id}-link`}
                className={`py-2 px-4 ${
                  page.id === pageId
                    ? "border-blue-500 border-b-2 md:border-b-0 md:border-l-2"
                    : "md:ml-[2px]"
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
        <div
          id="funnel-preview"
          aria-live="assertive"
          className={`overflow-x-hidden bg-${
            `[${funnel.bgColor}]` ?? "white"
          } md:rounded-3xl shadow-xl max-w-sm md:h-[600px]`}
        >
          <PagePreview {...page} bgColor={funnel.bgColor} />
        </div>
      </section>
      <aside className="hidden md:block md:col-start-1 md:row-start-1 height-full">
        <FunnelSidebar funnel={funnel} page={page} />
      </aside>
    </section>
  );
}
