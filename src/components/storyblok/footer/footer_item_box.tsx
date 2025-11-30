import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";

import type { FooterItemBox as FooterItemBoxType, } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterItemBox = ({ blok }: { blok: FooterItemBoxType }) => {
  return (
    <section {...storyblokEditable(blok as SbBlokData)} className="w-full">
      <div className="w-full flex flex-col md:flex-row justify-start items-start gap-6 md:gap-8">
        {blok.columns?.map((column) => (
          <StoryblokServerComponent blok={column} key={column._uid} />
        ))}
      </div>
    </section>
  );
};

export default FooterItemBox;
