'use client'

import { AlertProvider } from "@/components/AlertProvider";
import { AppBar } from "../components/AppBar";

import { useFunnelFromUrl } from "../hooks/use-funnel-from-url";
import { HighlightBlockProvider } from "@/app/components/HighlighBlockProvider";

export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { funnel } = useFunnelFromUrl();

  return (
    <AlertProvider>
      <HighlightBlockProvider>
        <AppBar title={funnel?.name ?? ''} />
        <main className="h-full flex">
          {children}
        </main>
      </HighlightBlockProvider>
    </AlertProvider>
  );
}
