import React, { useState } from "react";

import { CodeEditor } from "@/components/CodeEditor";
import { Tab, Tabs } from "@/components/Tabs";
import { Funnel, Page } from "@/types";

import FunnelSummary from "./FunnelSummary";

type Props = {
  funnel: Funnel;
  page: Page;
  onInspectBlock?: (blockId: string) => void;
};

function FunnelSidebar({ funnel, page, onInspectBlock }: Props) {
  const [currentView, setCurrentView] = useState<"inspector" | "code">(
    "inspector",
  );

  const handleViewChange = (view: "inspector" | "code") => {
    setCurrentView(view);
  };

  return (
    <aside className=" md:block md:col-start-1 md:row-start-1 md:height-full md:overflow-y-auto">
      <header className="px-5 border-b border-b-slate-200 dark:border-b-slate-600">
        <Tabs
          onChange={(tab) => handleViewChange(tab as "inspector" | "code")}
          initialValue="inspector"
        >
          <Tab value="inspector">Inspect</Tab>
          <Tab value="code">Code</Tab>
        </Tabs>
      </header>
      {currentView === "inspector" && (
        <section className="px-5 py-4">
          <FunnelSummary
            backgroundColor={funnel.bgColor}
            blocks={page.blocks}
            funnelName={funnel.name}
            funnelNumPages={funnel.pages.length}
          />
        </section>
      )}
      {currentView === "code" && (
        <section>
          <CodeEditor
            code={JSON.stringify(funnel, undefined, 2)}
            language="json"
            editable={false}
          />
        </section>
      )}
    </aside>
  );
}

export default FunnelSidebar;
