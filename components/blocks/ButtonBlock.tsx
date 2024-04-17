import { type ButtonBlock } from "@/types";

type Props = Omit<ButtonBlock, "type">;

/**
 * The button block renders a call to action that users can interact with to perform an action or navigate to a different page.
 */
export function ButtonBlock({ id, text, color, bgColor }: Props) {
  return (
    <button
      id={id}
      style={{ backgroundColor: bgColor, color: color }}
      className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-4 rounded w-full"
    >
      {text}
    </button>
  );
}
