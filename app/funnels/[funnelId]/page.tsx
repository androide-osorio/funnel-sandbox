"use client";
import React from "react";

type FunnelPageParams = {
  funnelId: string;
};
import { useFunnelStore } from "@/app/store";
import CodeEditor from "@/app/components/CodeEditor";
import { PagePreview } from "@/app/components/PagePreview";

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
  const { funnelId } = params;
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );

  if (!funnel) {
    return <div>Funnel not found</div>;
  }

  return (
    <>
      <section>
        <h1>Hello funnel {funnel.name}</h1>
        <div>
          {funnel.pages.map((page) => (
            <a
              href={`/funnels/${funnel.id}/page/${page.id}`}
              key={`funnel-${funnelId}-page-${page.id}-link`}
            >
              {page.id}
            </a>
          ))}
        </div>
        <PagePreview {...funnel.pages[0]} bgColor={funnel.bgColor} />
      </section>
      <aside>
        <CodeEditor
          code={JSON.stringify(funnel, undefined, 2)}
          language="json"
          editable={false}
        />
      </aside>
    </>
  );
}
