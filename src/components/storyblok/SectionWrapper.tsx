import Image from "next/image";
import { type SbBlokData, storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import type { SectionWrapper as SectionWrapperType } from "@/.storyblok/types/288385469171144/storyblok-components";

const gapMap: Record<string, string> = {
  "extra-small": "gap-[80px] md:gap-6",
  small: "gap-[40px] md:gap-[60px] lg:gap-[80px]",
  medium: "gap-[60px] md:gap-[80px] lg:gap-[120px]",
  large: "gap-[80px] md:gap-[120px] lg:gap-[160px]",
};

const overflowMap: Record<string, string> = {
  hidden: "overflow-hidden",
  visible: "overflow-visible",
};

const SectionWrapper = ({ blok }: { blok: SectionWrapperType }) => {
  const gapKey = blok.gap_size && gapMap[blok.gap_size] ? blok.gap_size : "medium"; // Default to "medium"
  const gapClass = gapMap[gapKey];

  const paddingClass = blok.padding || 'px-4';
  const overflowClass = overflowMap[blok.overflow ?? "hidden"];

  return (
    <section {...storyblokEditable(blok as SbBlokData)} className={`relative w-full bg-cover bg-center bg-no-repeat ${overflowClass}`}>
      {blok?.bg_image?.filename && (
        <Image
          src={blok.bg_image.filename}
          alt={blok.bg_image.alt || "Background"}
          fill
          className="object-cover object-center"
          priority={false}
        />
      )}
      <div className={`relative z-10 max-w-full w-full mx-auto ${paddingClass} flex flex-col ${gapClass} py-[120px] md:py-20 sm:py-[60px]`}>
        {blok.body?.map((nestedBlok) => (
          <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper;