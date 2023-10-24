type PropertyDescription = {
  type: string;
  name: string;
  value: string;
};

type Props = {
  data: PropertyDescription[];
};

export function PropertyList({ data }: Props) {
  return (
    <dl className="py-3 grid grid-cols-2">
      {data.map((property, i) => (
        <>
          <dt
            key={`property-${i}-key`}
            className="first:-border-t-0 border-b border-slate-300 dark:border-slate-600 dark:text-slate-300 py-3"
          >
            {property.name}
          </dt>
          <dd
            key={`property-${i}-value`}
            className="first:border-t-0 border-b text-right border-slate-300  dark:text-slate-300 dark:border-slate-600 py-3 flex justify-end items-center gap-2"
          >
            {property.value}
            {property.type === "color" && (
              <span
                className="inline-block w-5 h-5 rounded"
                style={{ backgroundColor: property.value }}
                role="presentation"
              ></span>
            )}
          </dd>
        </>
      ))}
    </dl>
  );
}
