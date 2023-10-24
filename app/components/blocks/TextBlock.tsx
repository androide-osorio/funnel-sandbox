import { TextBlock } from "../../store/types";

type Props = Omit<TextBlock, "type">;

export function TextBlock({ id, text, color, align }: Props) {
  return (
    <p id={id} style={{ color: color, textAlign: align }}>
      {text}
    </p>
  );
}
