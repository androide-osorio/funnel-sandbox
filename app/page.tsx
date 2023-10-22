"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFunnelStore } from "@/app/store";
import FileLoader from "@/app/components/FileLoader";

import { FunnelProcessor } from "./services/funnel-processor";

export default function Home() {
  const store = useFunnelStore();

  const handleFileUpload = (files: File[]) => {
    const funnelProcesor = FunnelProcessor();

    files.forEach(async (file) => {
      try {
        const { data: funnel } = await funnelProcesor.readFunnelFromFile(file);
        const id = uuidv4();
        store.addFunnel({ ...funnel, id });
      } catch (error) {
        console.error(`Error processing file ${file.name}:`, error);
      }
    });
  };

  useEffect(() => {
    console.log("Funnels in storage:", store.funnels);
  }, [store]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Funnel inspector</h1>
      <p>check user files in indexed DB. If there are funnels, show a list</p>
      <p>if there are no funnels, show an upload area</p>
      <FileLoader onFileUpload={handleFileUpload} accept="application/json" />
    </main>
  );
}
