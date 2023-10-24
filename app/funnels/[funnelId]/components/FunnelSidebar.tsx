import CodeEditor from "@/app/components/CodeEditor";
import { Tab, Tabs } from "@/app/components/Tabs";
import { Funnel, Page } from "@/app/store/types";
import React, { useState } from "react";
import FunnelSummary from "./FunnelSummary";

type Props = {
  funnel: Funnel;
  page: Page;
};

function FunnelSidebar({ funnel, page }: Props) {
  const [currentView, setCurrentView] = useState<"inspector" | "code">("inspector");

  const handleViewChange = (view: "inspector" | "code") => {
    setCurrentView(view);
  };

  return (
    <aside className="hidden md:block md:col-start-1 md:row-start-1 height-full overflow-y-auto">
      <header className="px-5 border-b border-b-slate-200 dark:border-b-slate-600">
        <Tabs onChange={(tab) => handleViewChange(tab as "inspector" | "code")} initialValue="inspector">
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
