'use client'

import AppBar from "@/app/components/AppBar";
import useFunnelStore from "../store";
import { useParams } from "next/navigation";

export default function FunnelsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const [funnelId, pageId] = params.funnelPath as string[];
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );
  const pageIndex = funnel?.pages.findIndex((p) => p.id === pageId) ?? 0;

  const breadcrumb = [funnel?.name ?? '', `Page ${pageIndex + 1}`];
  return (
    <>
      <AppBar breadcrumb={breadcrumb} />
			<main className="h-full flex">
				{children}
			</main>
    </>
  );
}
