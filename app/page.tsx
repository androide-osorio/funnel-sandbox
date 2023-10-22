"use client";

import { useEffect } from "react";
import { useFunnelStore } from "@/app/store";
import FileLoader from "@/app/components/FileLoader";

export default function Home() {
  const store = useFunnelStore();

  const handleFileUpload = (files: File[]) => {
    files.forEach(async (file) => {
      await store.addFunnelFromFile(file);
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
