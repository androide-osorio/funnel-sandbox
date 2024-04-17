import { useMemo } from "react";
import Image from "next/image";
import { type GenericBlock } from "./types";

export type ListItem = {
  title: string;
  description?: string;
  src?: string;
};

export type ListBlock = GenericBlock & {
  type: "list";
  layout?: "vstack" | "hstack" | "grid";
  items: ListItem[];
};

type ListProps = Omit<ListBlock, "type">;
type ListItemProps = ListItem;

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

/**
 * The list block renders a list of items that can showcase an arbitrary image, a title and a description, and supports multiple layouts. Use them primarily with icons.
 */
export function ListBlock({ id, items, layout = 'grid' }: ListProps) {
  const gridLayout = "grid grid-cols-2 gap-3"
  const vstackLayout = "flex flex-col gap-3"
  const hstackLayout = "flex gap-3"

  const listLayoutClasses = useMemo(() => {
    switch (layout) {
      case "vstack":
        return vstackLayout;
      case "hstack":
        return hstackLayout;
      default:
        return gridLayout;
    }
  }, [layout]);

  return (
    <ul className={listLayoutClasses}>
      {items.map((item, i) => (
        <ListItemBlock key={`${id}-item-${i}`} {...item} />
      ))}
    </ul>
  );
}
