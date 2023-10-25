'use client'

import { AlertProvider } from "@/components/AlertProvider";
import AppBar from "@/components/AppBar";

import { useFunnelFromUrl } from "../hooks/use-funnel-from-url";

export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { funnel } = useFunnelFromUrl();

  return (
    <AlertProvider>
      <AppBar title={funnel?.name ?? ''} />
			<main className="h-full flex">
				{children}
			</main>
    </AlertProvider>
  );
}
