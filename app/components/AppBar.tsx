import React, { useEffect } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

import useFunnelStore from "@/app/store";
import { Breadcrumbs } from "./Breadcrumbs";
import { FunnelProcessorErrors } from "../services/funnel-processor";
import { getErrorText } from "../utils/error-texts";
import { Alert } from "./Alert";

type Props = {
  breadcrumb?: string[];
};

export default function AppBar({ breadcrumb }: Props) {
  const store = useFunnelStore();
  const router = useRouter();
  const [error, setError] = React.useState<FunnelProcessorErrors | null>(null);
  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (event: any) => {
      const selectedFile = event.target.files[0];

      try {
        const funnelId = await store.addFunnelFromFile(selectedFile);
        router.push(`/funnels/${funnelId}`);
      } catch (error) {
        setError(error as FunnelProcessorErrors);
      }
    };
    input.click();
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
    <header className="shadow-lg flex gap-4 justify-between items-center bg-white dark:bg-slate-800 px-6 py-4 sticky z-10 border-b-gray-100 dark:border-b-slate-600 border-b">
      <Image
        src="/perspective-logo.png"
        alt="Perspective.io"
        width={32}
        height={32}
      />
      <div className="hidden md:block flex-1">
        <Breadcrumbs path={breadcrumb} />
      </div>
      <button
        className="rounded-lg bg-blue-500 hover:bg-blue-700 px-4 py-3 text-white flex items-center gap-2"
        onClick={handleFileSelect}
      >
        Preview funnel
        <ArrowUpTrayIcon className="w-4 h-4 inline-block" />
      </button>
      {error && (
        <div className="absolute">
          <Alert title="Oops!" text={getErrorText(error)} />
        </div>
      )}
    </header>
  );
}
