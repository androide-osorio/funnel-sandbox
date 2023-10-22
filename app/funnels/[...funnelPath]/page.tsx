"use client";
import React from "react";

type FunnelPageParams = {
  funnelPath: [string, string];
};
import { useFunnelStore } from "@/app/store";
import CodeEditor from "@/app/components/CodeEditor";
import { PagePreview } from "@/app/components/PagePreview";

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
  console.log(params);
  const { funnelPath } = params;
  const [funnelId, pageId] = funnelPath;
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );

  if (!funnel) {
    return <div>Funnel not found</div>;
  }

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
      <section className="col-span-2 flex flex-row justify-center items-center gap-4 bg-slate-50">
        <div
          className={`overflow-x-hidden bg-[${
            funnel.bgColor ?? "white"
          }] rounded-3xl shadow-xl max-w-sm`}
        >
          <PagePreview {...page} bgColor={funnel.bgColor} />
        </div>
        <nav>
          <ol>
            {funnel.pages.map((page) => (
              <li key={`funnel-${funnelId}-page-${page.id}-link`}>
                <a href={`/funnels/${funnel.id}/${page.id}`}>{page.id}</a>
              </li>
            ))}
          </ol>
        </nav>
      </section>
    </section>
  );
}
