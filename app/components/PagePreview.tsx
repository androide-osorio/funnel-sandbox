import React from "react";
import Image from "next/image";
import {
	Block,
	ButtonBlock,
	ImageBlock,
	ListBlock,
	Page,
	TextBlock,
} from "@/app/store/types";

type Props = Page & {
	bgColor?: string;
};

const TextComponent: React.FC<TextBlock> = ({ id, text, color, align }) => {
	return (
    <p id={id} style={{ color: color, textAlign: align }}>
      {text}
    </p>
  );
};

const ImageComponent: React.FC<ImageBlock> = ({ src }) => {
	return <img src={src} alt="image" className="rounded-lg" />;
};

const ListComponent: React.FC<ListBlock> = ({ id, items }) => {
	return (
    <ul>
      {items.map((item, i) => (
        <li
          key={`${id}-item-${i}`}
          className="flex flex-row gap-3 py-5 px-3 mb-5 w-full rounded-md transition-transform transform-gpu hover:-translate-x-1 bg-slate-100"
        >
          <Image
            src={item.src}
            alt={item.title}
            className="mb-3"
            width={40}
            height={40}
            priority
          />
          <div>
            <h3 className="text-lg font-medium text-gray-800 text-left">
              {item.title}
            </h3>
            <p>{item.description}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

const ButtonComponent: React.FC<ButtonBlock> = ({ text, color, bgColor }) => {
	return (
		<button
		style={{ backgroundColor: bgColor, color: color }}
			className={`bg-blue-500 text-white py-4 px-4 rounded`}
		>
			{text}
		</button>
	);
};

const BLOCK_MAPPINGS: Record<string, React.ComponentType<any>> = {
	text: TextComponent,
	image: ImageComponent,
	list: ListComponent,
	button: ButtonComponent,
};

export function PagePreview({ blocks, bgColor = 'white' }: Props) {
	const mapBlock = (block: Block) => {
		const Component = BLOCK_MAPPINGS[block.type];
		return <Component {...block} />;
	};

	return <div className="p-12 flex flex-col gap-5 min-h-full" style={{ backgroundColor: bgColor }}>{blocks.map((block) => mapBlock(block))}</div>;
}
