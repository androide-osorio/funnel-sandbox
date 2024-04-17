import React, { useEffect } from "react";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";

import { useAlert } from "@/components/alert-provider/AlertProvider";
import { FunnelProcessorErrors } from "@/services/funnel-processor";
import useFunnelStore from "@/store";
import { getErrorText } from "@/utils/error-texts";

type Props = {
  title?: string;
};

export function AppBar({ title }: Props) {
  const store = useFunnelStore();
  const router = useRouter();
  const { showAlert } = useAlert();

  const handleFileSelect = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.onchange = async (event: any) => {
      const selectedFile = event.target.files[0];

      try {
        const funnelId = await store.addFunnelFromFile(selectedFile);
        router.push(`/funnels/${funnelId}`);
      } catch (error) {
        showAlert({
          title: "Oops!",
          message: getErrorText(error as FunnelProcessorErrors),
        });
      }
    };
    input.click();
  };

  return (
    <header className="shadow-lg flex gap-4 justify-between items-center bg-white dark:bg-slate-800 px-6 py-4 sticky z-10 border-b-gray-100 dark:border-b-slate-600 border-b">
      <Link href="/">
        <Image
          src="/sales-funnel.png"
          alt="funnel preview"
          width={32}
          height={32}
        />
      </Link>
      <div className="hidden md:block flex-1">
        <h2 className="font-medium text-lg">{title}</h2>
      </div>
      <button
        className="rounded-lg bg-blue-500 hover:bg-blue-700 px-4 py-3 text-white flex items-center gap-2"
        onClick={handleFileSelect}
      >
        Preview funnel
        <ArrowUpTrayIcon className="w-4 h-4 inline-block" />
      </button>
    </header>
  );
}
