import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import Image from "next/image";
import type { BgHeroBanner } from "@/.storyblok/types/288385469171144/storyblok-components";

const BgHeroBanner = ({ blok }: { blok: BgHeroBanner }) => {
  return (
    <section {...storyblokEditable(blok as SbBlokData)} className="relative w-full h-screen overflow-hidden">
      {blok?.bg_image?.filename && (
        <Image
          src={blok.bg_image.filename}
          alt={blok.bg_image.alt || "Background image"}
          fill
          priority
          className="object-cover object-center"
        />
      )}
      {blok?.main_image?.filename && (
        <div className="relative z-10 flex items-center justify-center h-full">
          <Image
            src={blok.main_image.filename}
            alt={blok.main_image.alt || "Main image"}
            width={600}
            height={600}
            className="max-w-[600px] w-full h-auto bagel-rotations"
          />
          {blok?.animated_side_image?.filename && (
            <Image
              src={blok.animated_side_image.filename}
              alt={blok.animated_side_image.alt || "Animated side image"}
              width={400}
              height={400}
              className="max-w-[400px] w-full h-auto hero-side-image"
            />
          )}
        </div>
      )}
    </section>
  );
};

export default BgHeroBanner;