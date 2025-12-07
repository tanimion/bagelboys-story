import { storyblokEditable, type SbBlokData, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { TextBlock as TextBlockType } from "@/.storyblok/types/288385469171144/storyblok-components"; 
// ← replace xxxxx with your folder ID

const alignmentMap: Record<string, string> = {
  left: "text-left items-start",
  center: "text-center items-center",
  right: "text-right items-end",
};

const TextBlock = ({ blok }: { blok: TextBlockType }) => {
  const alignKey = blok.align && alignmentMap[blok.align] ? blok.align : "left";
  const alignClass = alignmentMap[alignKey];

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={`flex flex-col gap-4 ${alignClass} w-full`}
    >
      {/* Title */}
      {blok.title && (
        <h2 className="text-[42px] font-normal leading-12 uppercase text-[#4B4E53]">
          {blok.title}
        </h2>
      )}

      {/* Description */}
      {blok.description && (
        <div className="text-base font-normal leading-6 text-[#868686]">
          {parse(renderRichText(blok.description) ?? "")}
        </div>
      )}
    </div>
  );
};

export default TextBlock;