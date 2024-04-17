import { type GenericBlock } from "./types";

export type ImageBlock = GenericBlock & {
  type: "image";
  src: string;
};

type Props = Omit<ImageBlock, "type"> & {
  alt: string;
};

/**
 * The image block renders an image that users can view.
 */
export function ImageBlock({ src, alt }: Props) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className="rounded-lg shadow-lg" />;
}
