import Image from "next/image";
import { ListBlock, ListItem as ListItemBlockType } from "@/types";

type ListProps = Omit<ListBlock, "type">;

type ListItemProps = ListItemBlockType;

export function ListItemBlock({ src, title, description }: ListItemProps) {
  return (
    <li className="flex flex-row gap-3 py-5 px-3 mb-5 w-full rounded-md transition-transform transform-gpu hover:scale-105 bg-white border border-blue-100">
      {src && (
        <Image
          src={src}
          alt={title}
          className="mb-3"
          width={40}
          height={40}
          priority
        />
      )}
      <div>
        <h3 className="text-lg font-medium text-gray-800 text-left">{title}</h3>
        <p className="text-gray-700">{description}</p>
      </div>
    </li>
  );
}

export function ListBlock({ id, items }: ListProps) {
  return (
    <ul>
      {items.map((item, i) => (
        <ListItemBlock key={`${id}-item-${i}`} {...item} />
      ))}
    </ul>
  );
}
