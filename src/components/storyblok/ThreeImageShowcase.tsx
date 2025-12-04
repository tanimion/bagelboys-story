import Image from "next/image";
import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import type { ThreeImageShowcase } from "@/.storyblok/types/288385469171144/storyblok-components";

// Tailwind maps for Storyblok options
const gapMap: Record<string, string> = {
  small: "gap-3",
  medium: "gap-5",
  large: "gap-8",
};

const radiusMap: Record<string, string> = {
  small: "rounded-lg",
  medium: "rounded-2xl",
  large: "rounded-[34px]",
};

const ThreeImageShowcaseComponent = ({ blok }: { blok: ThreeImageShowcase }) => {
  const gapClass = gapMap[blok.gap_size ?? "large"];
  const radiusClass = radiusMap[blok.radius_size ?? "large"];

  if (!blok.images || blok.images.length === 0) return null;

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className="max-w-full w-full mx-auto"
    >
      <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${gapClass}`}>
        {blok.images.map((img, index) => (
          <div
            key={img.filename || index}
            className={`${radiusClass} ${index === 0 ? "lg:-ml-12" : "lg:ml-0"} ${index === 2 ? "lg:-mr-12" : "lg:mr-0"} overflow-hidden p-3 border-2 border-solid border-[#A66C23] rounded-[42px]`}
          >
            <Image
              src={img.filename}
              alt={img.alt || `Image ${index + 1}`}
              width={480}
              height={400}
              className="w-full h-full object-cover rounded-[34px]"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ThreeImageShowcaseComponent;