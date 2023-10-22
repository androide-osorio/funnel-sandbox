import React from 'react';

import Image from 'next/image';

const AppBar = () => {
	return (
		<header className="flex justify-between items-center bg-white px-6 py-4 sticky z-10 border-b-gray-100 border-b">
			<Image src="/perspective-logo.png" alt="Perspective.io" width={32} height={32} />
			<h1 className="text-xl">Funnel Builder</h1>
			<nav className="flex gap-4">
				<a href="/funnels">Funnels</a>
				<a href="/funnels/new">New Funnel</a>
			</nav>
		</header>
	);
};

export default AppBar;
