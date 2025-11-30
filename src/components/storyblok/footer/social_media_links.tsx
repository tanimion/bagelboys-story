import {
  StoryblokServerComponent,
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";
import type { SocialMediaLinks as SocialMediaLinksType } from "@/.storyblok/types/288385469171144/storyblok-components";

const SocialMediaLinks = ({ blok }: { blok: SocialMediaLinksType }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} className="max-w-full md:max-w-[350px] w-full flex justify-start items-center gap-[30px]">
      {blok.links?.map((item) => (
        <StoryblokServerComponent blok={item} key={item._uid} />
      ))}
    </div>
  );
};

export default SocialMediaLinks;