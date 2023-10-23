import CodeEditor from "@/app/components/CodeEditor";
import { Tab, Tabs } from "@/app/components/Tabs";
import { Funnel } from "@/app/store/types";
import React, { useState } from "react";

type Props = {
  funnel: Funnel;
};
function FunnelSidebar({ funnel }: Props) {
  const [currentView, setCurrentView] = useState<"blocks" | "code">("code");

  const handleViewChange = (view: "blocks" | "code") => {
    setCurrentView(view);
  };

  return (
    <aside className="col-span-1 height-full">
      <Tabs onChange={(tab) => handleViewChange(tab as "blocks" | "code")}>
        <Tab value="blocks">Blocks</Tab>
        <Tab value="code">Code</Tab>
      </Tabs>
      {currentView === "blocks" && (
        <section>
          <h1>Blocks</h1>
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
