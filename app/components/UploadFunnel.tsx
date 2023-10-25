"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useFunnelStore } from "@/store";
import { FileLoader } from "@/components/FileLoader";
import { useAlert } from "@/components/AlertProvider";

import { FunnelProcessorErrors } from "../../services/funnel-processor";
import { getErrorText } from "../../utils/error-texts";

export default function UploadFunnelPage() {
  const router = useRouter();
  const { showAlert } = useAlert();
  const store = useFunnelStore();

  const handleFileUpload = async (files: File[]) => {
    const file = files[0];

    try {
      const funnelId = await store.addFunnelFromFile(file);
      router.push(`/funnels/${funnelId}`);
    } catch (error) {
      showAlert({
        title: "Oops!",
        message: getErrorText(error as FunnelProcessorErrors),
      });
    }
  };

  return (
    <>
      <header className="flex flex-col gap-3 items-center">
        <Image
          src="/perspective-logo.png"
          alt="Perspective"
          width={56}
          height={56}
        />
        <h1 className="text-4xl font-bold text-center">Funnel inspector</h1>
        <p className="text-center">Please upload a funnel to preview...</p>
      </header>
      <section>
        <FileLoader onFileUpload={handleFileUpload} accept="application/json" />
      </section>
      <footer className="text-center">
        <p>
          Don&apos;t have a funnel file? use this{" "}
          <a href="/funnel.json" className="text-blue-500" target="_blank">
            sample file
          </a>
          .
        </p>
      </footer>
    </>
  );
}
