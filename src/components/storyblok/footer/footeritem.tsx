import {
  type SbBlokData,
  StoryblokServerComponent,
  storyblokEditable,
} from "@storyblok/react/rsc";
import type { FooterItem as FooterItemType } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterItem = ({ blok }: { blok: FooterItemType }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} className="flex flex-col justify-start items-start gap-5">
      {blok.title && (
        <h3 className="text-base font-bold leading-[22px] text-[#4B4E53]">
          {blok.title}
        </h3>
      )}

      <div className="max-w-[152px] min-w-[152px] w-full footer-item flex flex-col justify-start items-start gap-4 text-sm font-normal leading-[19px] text-[#4B4E53] opacity-70">
        {blok?.items?.map((item, index) => (
          <StoryblokServerComponent
            blok={item}
            key={item?._uid || `footer-item-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

export default FooterItem;