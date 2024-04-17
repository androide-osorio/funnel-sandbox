import { useId } from "react";

type PropertyDescription = {
  type: string;
  name: string;
  value: string;
};

type Props = {
  data: PropertyDescription[];
};

/**
 * The property list component displays a list of key-value pairs with defined types.
 */
export function PropertyList({ data }: Props) {
  const id = useId();
  return (
    <dl className="py-3">
      {data.map((property, i) => (
        <div key={`proplist-${id}-property-${i}`} className="grid grid-cols-2">
          <dt className="first:-border-t-0 border-b border-slate-300 dark:border-slate-600 dark:text-slate-300 py-3">
            {property.name}
          </dt>
          <dd className="first:border-t-0 border-b text-right border-slate-300  dark:text-slate-300 dark:border-slate-600 py-3 flex justify-end items-center gap-2">
            {property.value}
            {property.type === "color" && (
              <span
                className="inline-block w-5 h-5 rounded"
                style={{ backgroundColor: property.value }}
                role="presentation"
              ></span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
