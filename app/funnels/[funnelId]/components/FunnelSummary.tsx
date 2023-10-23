import React from 'react';
import { PhotoIcon } from "@heroicons/react/24/solid";
import { Bars3BottomLeftIcon } from "@heroicons/react/24/solid";
import { ListBulletIcon } from "@heroicons/react/24/solid";
import { CursorArrowRippleIcon } from "@heroicons/react/24/solid";

import { Block } from '@/app/store/types';

interface FunnelSummaryProps {
	backgroundColor?: string;
	blocks: Block[];
}

const BlockIconMap = {
	text: Bars3BottomLeftIcon,
	image: PhotoIcon,
	list: ListBulletIcon,
	button: CursorArrowRippleIcon,
};

const FunnelSummary: React.FC<FunnelSummaryProps> = ({ backgroundColor, blocks }) => {
	const iconForBlock = (block: Block) => {
		const Icon = BlockIconMap[block.type];
		return <Icon className="w-6 h-6" />;
	}

	return (
		<div className={`p-4 bg-${backgroundColor}`}>
			<ol className="flex flex-col gap-2">
				{blocks.map((block, index) => (
					<li key={index} className="py-3 px-6 border-slate-400 border rounded-lg flex gap-2">
						{iconForBlock(block)}
						<h4 className="capitalize">{block.type}</h4>
					</li>
				))}
			</ol>
		</div>
	);
};

export default FunnelSummary;
