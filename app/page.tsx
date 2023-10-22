"use client";

import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useFunnelStore } from "@/app/store";
import FileLoader from "@/app/components/FileLoader";

import { Funnel } from "./store/types";

export default function Home() {
  const store = useFunnelStore();

  const handleFileUpload = (files: File[]) => {
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        try {
          const funnel = JSON.parse(content) as Funnel;
          const id = uuidv4();
          store.addFunnel({ ...funnel, id });
        } catch (error) {
          console.error(error);
        }
      };
      reader.readAsText(file);
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
