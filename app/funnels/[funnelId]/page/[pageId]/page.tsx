"use client";
import React from "react";

type FunnelPageParams = {
  funnelId: string;
  pageId: string;
};
import { useFunnelStore } from "@/app/store";
import { PagePreview } from "@/app/components/PagePreview";

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
  const { funnelId, pageId } = params;
  const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === funnelId)
  );

  if (!funnel) {
    return <div>Funnel not found</div>;
  }

	const page = funnel.pages.find((p) => p.id === pageId);

	if (!page) {
		return <div>Page not found</div>;
	}

  return (
    <PagePreview {...page} bgColor={funnel.bgColor} />
  );
}
