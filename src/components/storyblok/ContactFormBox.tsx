import {
  StoryblokServerComponent,
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";

import type { ContactFormBox as ContactFormBoxType } from "@/.storyblok/types/288385469171144/storyblok-components";

const paddingMap: Record<string, string> = {
  none: "p-0",
  large: "p-4 md:p-[72px]",
};

const ContactFormBox = ({ blok }: { blok: ContactFormBoxType }) => {
  const width =
    blok.width_type === "%"
      ? `${blok.width_value}%`
      : `${blok.width_value}px`;

  const padding = paddingMap[blok.padding || "none"];

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={`${padding} bg-transparent flex flex-col justify-start items-start gap-6 w-full`}
      style={{ width }}
    >
      {blok.children?.map((child) => (
        <StoryblokServerComponent blok={child} key={child._uid} />
      ))}
    </div>
  );
};

export default ContactFormBox;