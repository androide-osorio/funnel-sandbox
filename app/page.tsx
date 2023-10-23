"use client";

import { useEffect } from "react";
import Image from "next/image";

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
    <>
      <main className="flex min-h-screen flex-col items-center justify-between p-24 gap-8">
        <header className="flex flex-col gap-3 items-center">
          <Image
            src="/perspective-logo.png"
            alt="Perspective"
            width={56}
            height={56}
          />
          <h1 className="text-4xl font-bold">
            Funnel inspector
          </h1>
          <p>Please upload a funnel to preview...</p>
        </header>
        <section>
          <FileLoader
            onFileUpload={handleFileUpload}
            accept="application/json"
          />
        </section>
      </main>
    </>
  );
}
