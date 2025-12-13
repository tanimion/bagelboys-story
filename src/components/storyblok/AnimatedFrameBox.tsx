import { type SbBlokData, storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import type { AnimatedFrameBox as AnimatedFrameBoxType } from "@/.storyblok/types/288385469171144/storyblok-components";
import AnimatedFrameItem from "./AnimatedFrameItem";

const AnimatedFrameBox = ({ blok }: { blok: AnimatedFrameBoxType }) => {
  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className="max-w-[1200px] mx-auto w-full flex justify-between items-center gap-4"
    >
      {blok.items?.map((item) => (
        <AnimatedFrameItem blok={item} key={item._uid} />
      ))}
    </section>
  );
};

export default AnimatedFrameBox;