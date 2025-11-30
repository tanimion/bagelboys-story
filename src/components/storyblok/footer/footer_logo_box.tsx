import {
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";

import Image from "next/image";
import type { FooterLogoBox as FooterLogoBoxType } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterLogoBox = ({ blok }: { blok: FooterLogoBoxType }) => {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="flex flex-col items-start gap-3 w-full"
    >
      {(blok.title_1 || blok.title_2 || blok.title_3) && (
        <h3 className="px-4 py-1 rounded-[10px] bg-[#A66B23] text-xs font-normal leading-6 text-white uppercase flex justify-start items-center gap-1">
          <span className="inline-block size-3 bg-[#1D9955] rounded-full ring-1 mr-1"></span>
          {blok.title_1 && (
            <span className="text-xs font-normal leading-6 text-white uppercase">
              {blok.title_1}
            </span>
          )}

          {blok.title_2 && (
            <span className="text-base font-bold leading-6 text-white">
              {blok.title_2}
            </span>
          )}

          {blok.title_3 && (
            <span className="text-xs font-normal leading-6 text-white">
              {blok.title_3}
            </span>
          )}
        </h3>
      )}

      {blok.logo?.filename && (
        <figure className="max-w-[180px] w-full">
          <Image
            src={blok.logo.filename}
            alt={blok.logo.alt || "Footer logo"}
            width={200}
            height={80}
            className="w-full h-auto object-contain"
          />
        </figure>
      )}
    </div>
  );
};

export default FooterLogoBox;
