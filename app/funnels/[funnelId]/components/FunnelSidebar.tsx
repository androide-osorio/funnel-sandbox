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
      <Tabs onChange={(tab) => handleViewChange(tab as "blocks" | "code")}>
        <Tab value="blocks">Blocks</Tab>
        <Tab value="code">Code</Tab>
      </Tabs>
      {currentView === "blocks" && (
        <section>
          <h1>Blocks</h1>
					<FunnelSummary backgroundColor={funnel.bgColor} blocks={page.blocks} />
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
