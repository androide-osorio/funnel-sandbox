import { ButtonBlock } from "../../store/types";

type Props = Omit<ButtonBlock, "type">;

export function ButtonBlock({ id, text, color, bgColor }: Props) {
  return (
    <button
      id={id}
      style={{ backgroundColor: bgColor, color: color }}
      className={`bg-blue-500 text-white py-4 px-4 rounded`}
    >
      {text}
    </button>
  );
}
