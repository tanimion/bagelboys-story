import {
  type SbBlokData,
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";

import type { FooterContactBox as FooterContactBoxType } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterContactBox = ({ blok }: { blok: FooterContactBoxType }) => {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="max-w-[350px] w-full flex flex-col justify-start items-start gap-8"
    >
      {blok.columns?.map((item) => (
        <StoryblokServerComponent blok={item} key={item._uid} />
      ))}
    </div>
  );
};

export default FooterContactBox;