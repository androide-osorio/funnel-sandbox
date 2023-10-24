"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useFunnelStore } from "@/app/store";
import FileLoader from "@/app/components/FileLoader";
import { FunnelProcessorErrors } from "./services/funnel-processor";
import { Alert } from "./components/Alert";
import { getErrorText } from "./utils/error-texts";

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
    let timer: NodeJS.Timeout;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 10000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center p-24 gap-8">
        <header className="flex flex-col gap-3 items-center">
          <Image
            src="/perspective-logo.png"
            alt="Perspective"
            width={56}
            height={56}
          />
          <h1 className="text-4xl font-bold">Funnel inspector</h1>
          <p>Please upload a funnel to preview...</p>
        </header>
        {error && <Alert title="Oops!" text={getErrorText(error)} />}
        <section>
          <FileLoader
            onFileUpload={handleFileUpload}
            accept="application/json"
          />
        </section>
        <footer>
          <p>
            Don&apos;t have a funnel file? use this{" "}
            <a href="/funnel.json" className="text-blue-500" target="_blank">
              sample file
            </a>.
          </p>
        </footer>
      </main>
    </>
  );
}
