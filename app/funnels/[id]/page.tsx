'use client'
import React from 'react';

type FunnelPageParams = {
	id: string;
}
import { useFunnelStore } from "@/app/store";
import CodeEditor from '@/app/components/CodeEditor';
import { FunnelPagePreview } from './components/FunnelPreview';

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
	const { id } = params;
	const funnel = useFunnelStore((state) =>
    state.funnels.find((f) => f.id === id)
  );

	if (!funnel) {
		return <div>Funnel not found</div>;
	}

	return (
    <>
      <section>
        <h1>Hello funnel {funnel.name}</h1>
        <FunnelPagePreview {...funnel.pages[0]} bgColor={funnel.bgColor} />
      </section>
			<aside>
    	  <CodeEditor code={JSON.stringify(funnel, undefined, 2)} language="json" />
			</aside>
    </>
  );
}