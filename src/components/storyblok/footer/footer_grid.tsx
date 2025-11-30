import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";

import type { FooterGrid as FooterGridType, } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterGrid = ({ blok }: { blok: FooterGridType }) => {
  return (
    <section {...storyblokEditable(blok as SbBlokData)} className="w-full bg-cover bg-center bg-no-repeat px-4 py-8 flex- flex-col justify-start items-start gap-14"
      style={{backgroundImage: blok.bg_image?.filename ? `url(${blok.bg_image.filename})` : undefined,}}>
      <div className="max-w-[1272px] mx-auto w-full flex flex-col md:flex-row justify-start items-start gap-6 md:gap-[100px] lg:gap-[200px] pt-14 pb-8">
        {blok.columns?.map((column) => (
          <StoryblokServerComponent blok={column} key={column._uid} />
        ))}
      </div>
      {blok.copyright_text && (
        <div className="max-w-[1272px] mx-auto w-full">
          <p className="text-xs font-normal leading-4 text-[#8D8D8D] text-center md:text-left">
            {blok.copyright_text}
          </p>
        </div>
      )}
    </section>
  );
};

export default FooterGrid;
