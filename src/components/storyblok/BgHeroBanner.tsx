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
            width={500}
            height={500}
            className="w-full max-w-[400px] h-auto"
          />
        </div>
      )}
    </section>
  );
};

export default BgHeroBanner;