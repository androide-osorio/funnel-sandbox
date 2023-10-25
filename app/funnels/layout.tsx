'use client'

import { useParams, useSearchParams } from "next/navigation";

import { AlertProvider } from "@/components/AlertProvider";
import AppBar from "@/components/AppBar";
import useFunnelStore from "@/store";

export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const query = useSearchParams();
  const funnelId = params.funnelId;
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );
  const pageId = query.get("page");
  const pageIndex = funnel?.pages.findIndex((p) => p.id === pageId) ?? 0;

  return (
    <AlertProvider>
      <AppBar title={funnel?.name ?? ''} />
			<main className="h-full flex">
				{children}
			</main>
    </AlertProvider>
  );
}
