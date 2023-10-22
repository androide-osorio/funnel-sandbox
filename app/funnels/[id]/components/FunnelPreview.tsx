import React from "react";
import {
  Block,
  ButtonBlock,
  ImageBlock,
  ListBlock,
  Page,
  TextBlock,
} from "@/app/store/types";

type Props = Page & {
  // other props
};

const TextComponent: React.FC<TextBlock> = ({ text }) => {
  return <p>{text}</p>;
};

const ImageComponent: React.FC<ImageBlock> = ({ src }) => {
  return <img src={src} alt="image" />;
};

const ListComponent: React.FC<ListBlock> = ({ id, items }) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={`${id}-item-${i}`}>
          <p>{item.title}</p>
          <p>{item.description}</p>
          {item.src}
        </li>
      ))}
    </ul>
  );
};

const ButtonComponent: React.FC<ButtonBlock> = ({ text, color, bgColor }) => {
  return <button>{text}</button>;
};

const BLOCK_MAPPINGS: Record<string, React.ComponentType<any>> = {
  text: TextComponent,
  image: ImageComponent,
  list: ListComponent,
  button: ButtonComponent,
};

export function FunnelPagePreview({ blocks }: Props) {
  const mapBlock = (block: Block) => {
    const Component = BLOCK_MAPPINGS[block.type];
    return <Component {...block} />;
  };

  return <>{blocks.map((block) => mapBlock(block))}</>;
}
