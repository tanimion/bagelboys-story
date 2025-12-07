import Image from "next/image";
import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import type { ImageBox as ImageBoxType } from "@/.storyblok/types/288385469171144/storyblok-components";

const ImageBox = ({ blok }: { blok: ImageBoxType }) => {
  if (!blok.image?.filename) return null;

  const width =
    blok.width_type === "%"
      ? `${blok.width_value}%`
      : `${blok.width_value}px`;

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      style={{ width }}
      className="w-full"
    >
      <Image
        src={blok.image.filename}
        alt={blok.image.alt || ""}
        width={800}
        height={600}
        className="w-full h-auto object-cover rounded-xl"
      />
    </div>
  );
};

export default ImageBox;