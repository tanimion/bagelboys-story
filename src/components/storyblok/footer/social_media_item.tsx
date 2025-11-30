"use client";

import Image from "next/image";
import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import type { SocialMediaItem as SocialMediaItemType } from "@/.storyblok/types/288385469171144/storyblok-components";

const SocialMediaItem = ({ blok }: { blok: SocialMediaItemType }) => {
  if (!blok.icon?.filename || !blok.url) return null;

  return (
    <a
      {...storyblokEditable(blok as SbBlokData)}
      href={blok.url.url || "#"}
      target={blok.url.target ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="w-5xl h-16 flex justify-center items-center"
    >
      <Image
        src={blok.icon.filename}
        alt="social icon"
        width={blok.icon?.width || 40}
        height={blok.icon?.height || 40}
        quality={100}
        className="w-auto h-auto"
      />
    </a>
  );
};

export default SocialMediaItem;