import type { SanityImageSource } from "@sanity/image-url";
import Image, { type ImageProps } from "next/image";

import { urlForImage } from "@/sanity/lib/image";

type SanityImageProps = Omit<ImageProps, "src"> & {
  src: SanityImageSource;
};

export function SanityImage({
  src,
  alt,
  width,
  height,
  ...props
}: SanityImageProps) {
  let imageUrl = urlForImage(src).width(2400).auto("format").fit("max");
  const previewUrl = urlForImage(src)
    .width(48)
    .quality(28)
    .blur(32)
    .auto("format")
    .url();

  if (typeof width === "number") imageUrl = imageUrl.width(width);
  if (typeof height === "number") imageUrl = imageUrl.height(height);

  return (
    <Image
      {...props}
      src={imageUrl.url()}
      alt={alt}
      width={width}
      height={height}
      placeholder={props.placeholder ?? "blur"}
      blurDataURL={props.blurDataURL ?? previewUrl}
    />
  );
}
