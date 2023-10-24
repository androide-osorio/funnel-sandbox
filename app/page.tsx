"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useFunnelStore } from "@/app/store";
import FileLoader from "@/app/components/FileLoader";
import { FunnelProcessorErrors } from "./services/funnel-processor";
import { Alert } from "./components/Alert";

function getErrorText(error: FunnelProcessorErrors) {
  switch(error) {
    case FunnelProcessorErrors.FILE_PARSE_ERROR:
      return "Please upload a valid funnel file. It should be a .json file with valid JSON code.";
    case FunnelProcessorErrors.FILE_READ_ERROR:
      return "We don't have permission to read the file you uploaded. Please try again.";
    default:
      return "An unknown error occurred.";
  }
}

export default function Home() {
  const router = useRouter();
  const store = useFunnelStore();
  const [error, setError] = useState<FunnelProcessorErrors | null>(null);

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];

    try {
      const funnelId = await store.addFunnelFromFile(file);
      console.log("NEW FUNNEL ADDED:", funnelId);
      router.push(`/funnels/${funnelId}`);
    } catch (error) {
      setError(error as FunnelProcessorErrors);
    }
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
        {error && (
          <Alert title="Oops!" text={getErrorText(error)} />
        )}
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
