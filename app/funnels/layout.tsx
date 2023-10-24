'use client'

import AppBar from "@/app/components/AppBar";
import { useParams, useSearchParams } from "next/navigation";
import useFunnelStore from "../store";

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
    <>
      <AppBar title={funnel?.name ?? ''} />
			<main className="h-full flex">
				{children}
			</main>
    </>
  );
}
