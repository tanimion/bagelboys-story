import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";
import type { SmallTextGroupGrid as SmallTextGroupGridType } from "@/.storyblok/types/288385469171144/storyblok-components";

const SmallTextGroupGrid = ({ blok }: { blok: SmallTextGroupGridType }) => {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className="w-full flex justify-center px-4"
    >
      <div
        className="
          max-w-[980px] w-full 
          flex flex-wrap
          justify-start items-start
          gap-y-20
          gap-x-20
          lg:gap-x-[180px]
        "
      >
        {blok.items?.map((nested) => (
          <StoryblokServerComponent blok={nested} key={nested._uid} />
        ))}
      </div>
    </section>
  );
};

export default SmallTextGroupGrid;