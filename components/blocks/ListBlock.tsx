import Image from "next/image";
import { ListBlock, ListItem as ListItemBlockType } from "@/types";

type ListProps = Omit<ListBlock, "type">;

type ListItemProps = ListItemBlockType;

export function ListItemBlock({ src, title, description }: ListItemProps) {
  return (
    <li className="flex flex-col gap-3 items-center py-4 px-2 w-full rounded-md transition-transform transform-gpu hover:scale-105 bg-white border border-slate-200 shadow-md">
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
        <h3 className="text-lg font-bold text-blue-900 text-center">{title}</h3>
        <p className="text-gray-700 text-center">{description}</p>
      </div>
    </li>
  );
}

export function ListBlock({ id, items }: ListProps) {
  return (
    <ul className="grid grid-cols-2 gap-3">
      {items.map((item, i) => (
        <ListItemBlock key={`${id}-item-${i}`} {...item} />
      ))}
    </ul>
  );
}
