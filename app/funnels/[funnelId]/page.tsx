"use client";

import React from "react";
import { useMediaQuery } from "react-responsive";
import { useRouter, useSearchParams } from "next/navigation";

import { useFunnelStore } from "@/store";
import { Tabs, Tab } from "@/components/Tabs";

import FunnelSidebar from "./components/FunnelSidebar";
import { PagePreview } from "./components/PagePreview";
import { useHighlightBlock } from "@/app/components/HighlightBlockProvider";
import { useFunnelFromUrl } from "@/app/hooks/use-funnel-from-url";

type FunnelPageParams = {
  funnelId: string;
};

export default function FunnelPage() {
  const router = useRouter();
  const { funnel, page } = useFunnelFromUrl();
  const { currentBlock, highlightBlock, unhighlight } = useHighlightBlock();
  const isSmallScreen = useMediaQuery({ maxWidth: 767 });

  if (!funnel) {
    return <div>Funnel not found</div>;
  }

  const currentPage = page ?? funnel.pages[0];

  const handlePageChange = (newPageId: string) => {
    router.push(`/funnels/${funnel.id}?page=${newPageId}`);
  };

  return (
    <section className="flex flex-col md:grid md:grid-cols-3 lg:grid-cols-4 w-full">
      <section className="flex flex-col md:flex-row-reverse md:justify-center md:items-center md:col-start-2 md:col-span-2 lg:col-span-3 md:gap-8 bg-slate-50 dark:bg-slate-950 h-[100vh]">
        <header className="md:hidden px-6 py-6">
          <h1 className="text-2xl text-bold">{funnel.name}</h1>
        </header>
        <Tabs
          variant={isSmallScreen ? "horizontal" : "vertical"}
          onChange={handlePageChange}
          initialValue={page?.id ?? ""}
        >
          {funnel.pages.map((page, i) => (
            <Tab key={`funnel-${funnel.id}-page-${page.id}`} value={page.id}>
              Page {i + 1}
            </Tab>
          ))}
        </Tabs>
        <PagePreview {...currentPage} bgColor={funnel.bgColor} />
      </section>
      <FunnelSidebar funnel={funnel} page={currentPage} />
    </section>
  );
}
