"use client";

import { AlertProvider } from "@/components";
import UploadFunnelPage from "./components/UploadFunnel";

export default function HomePage() {
  return (
    <AlertProvider>
      <main className="flex min-h-screen flex-col items-center p-24 gap-8">
        <UploadFunnelPage />
      </main>
    </AlertProvider>
  );
}
