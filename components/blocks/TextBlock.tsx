import { type TextBlock } from "@/types";

type Props = Omit<TextBlock, "type">;

/**
 * The text block renders a paragraph of text.
 */
export function TextBlock({ id, text, color, align }: Props) {
  return (
    <p id={id} style={{ color: color, textAlign: align }}>
      {text}
    </p>
  );
}
