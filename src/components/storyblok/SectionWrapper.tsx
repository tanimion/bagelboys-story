import Image from "next/image";
import { type SbBlokData, storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import type { SectionWrapper as SectionWrapperType } from "@/.storyblok/types/288385469171144/storyblok-components";

const gapMap: Record<string, string> = {
  "extra-small": "gap-[80px] md:gap-6",
  small: "gap-[40px] md:gap-[60px] lg:gap-[80px]",
  medium: "gap-[60px] md:gap-[80px] lg:gap-[120px]",
  large: "gap-[80px] md:gap-[120px] lg:gap-[160px]",
};

const SectionWrapper = ({ blok }: { blok: SectionWrapperType }) => {
  const gapKey = blok.gap_size && gapMap[blok.gap_size] ? blok.gap_size : "medium";
  const gapClass = gapMap[gapKey];

  return (
    <section {...storyblokEditable(blok as SbBlokData)} className="relative w-full bg-cover bg-center bg-no-repeat">
      {blok?.bg_image?.filename && (
        <Image
          src={blok.bg_image.filename}
          alt={blok.bg_image.alt || "Background"}
          fill
          className="object-cover object-center"
          priority={false}
        />
      )}
      <div className={`relative z-10 max-w-full w-full mx-auto px-4 flex flex-col ${gapClass} py-[120px] md:py-20 sm:py-[60px]`}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper;