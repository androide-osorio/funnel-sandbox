import { type ImageBlock } from "@/types";

type Props = Omit<ImageBlock, "type"> & {
  alt: string;
};

export function ImageBlock({ src, alt }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="rounded-lg shadow-lg" />;
}
