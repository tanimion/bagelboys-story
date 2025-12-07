import Image from "next/image";
import {
  StoryblokServerComponent,
  storyblokEditable,
  type SbBlokData,
} from "@storyblok/react/rsc";

import type { ContactFormGrid as ContactFormGridType } from "@/.storyblok/types/288385469171144/storyblok-components";

const maxWidthMap: Record<string, string> = {
  default: "max-w-[1286px] mx-auto",
  wide: "max-w-[1440px] mx-auto",
  full: "w-full mx-auto",
};

const alignMap: Record<string, string> = {
  left: "justify-start text-left",
  center: "justify-center text-center",
  right: "justify-end text-right",
};

const ContactFormGrid = ({ blok }: { blok: ContactFormGridType }) => {
  const maxWidthClass =
    (blok.max_width && maxWidthMap[blok.max_width]) || maxWidthMap.default;

  const alignClass = blok.align ? alignMap[blok.align] : alignMap.left;

  const borderRadius =
    typeof blok.border_radius === "number"
      ? `${blok.border_radius}px`
      : undefined;

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)}
      className={`${maxWidthClass} relative w-full rounded-4xl p-4 md:p-10`}
      style={{
        backgroundColor: blok.bg_color || "transparent",
        borderColor: blok.border_color || "transparent",
        borderStyle: "solid",
        borderWidth: blok.border_color ? "1px" : "0px",
        borderRadius,
      }}
    >
      {/* --- Background Image --- */}
      {blok.bg_image?.filename && (
        <Image
          src={blok.bg_image.filename}
          alt={blok.bg_image.alt || "Background"}
          fill
          className="absolute inset-0 object-cover object-center -z-10"
          style={{ borderRadius }}
        />
      )}

      {/* --- FLEX WRAPPER --- */}
      <div
        className={`relative z-10 flex flex-col md:flex-row w-full md:w-auto flex-wrap md:flex-nowrap gap-6 items-center ${alignClass}`}
      >
        {blok.columns?.map((col) => (
          <div
            key={col._uid}
            className="flex flex-col w-full md:w-1/2"
          >
            <StoryblokServerComponent blok={col} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ContactFormGrid;