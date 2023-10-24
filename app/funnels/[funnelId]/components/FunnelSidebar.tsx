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
  const [currentView, setCurrentView] = useState<"blocks" | "code">("code");

  const handleViewChange = (view: "blocks" | "code") => {
    setCurrentView(view);
  };

  return (
    <>
      <header className="px-5">
        <Tabs onChange={(tab) => handleViewChange(tab as "blocks" | "code")} initialValue="code">
          <Tab value="blocks">Blocks</Tab>
          <Tab value="code">Code</Tab>
        </Tabs>
      </header>
      {currentView === "blocks" && (
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
    </>
  );
}

export default FunnelSidebar;
