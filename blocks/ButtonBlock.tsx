import { type GenericBlock } from "./types";

export type ButtonBlock = GenericBlock & {
  /**
   * The block's type
   */
  type: "button";
  /**
   * The button's text
   */
  text: string;
  /**
   * The button's color
   * @default "white"
   */
  color?: string;
  /**
   * The button's background color
   * @default "blue-700"
   */
  bgColor?: string;
};

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
