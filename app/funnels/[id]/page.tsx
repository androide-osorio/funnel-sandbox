import React from 'react';

type FunnelPageParams = {
	id: string;
}

export default function FunnelPage({ params }: { params: FunnelPageParams }) {
  return (
		<>
			<section>
				<h1>Hello funnel {params.id}</h1>
				<p>preview will be here</p>
			</section>
			<aside>
				funnel code will be here
			</aside>
		</>
	);
}