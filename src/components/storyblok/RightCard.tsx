import Image from "next/image";
import { type SbBlokData, storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { RightCard as RightCardType } from "@/.storyblok/types/288385469171144/storyblok-components";

const maxWidthMap: Record<string, string> = {
  default: "max-w-[1246px] mx-auto",
  wide: "max-w-[1440px] mx-auto",
  full: "w-full",
  constrained: "max-w-[881px] mx-auto",
};

const RightCard = ({ blok }: { blok: RightCardType }) => {
  const maxWidthKey = blok.max_width && maxWidthMap[blok.max_width] ? blok.max_width : "default";
  const maxWidthClass = maxWidthMap[maxWidthKey];
  return (
    <section {...storyblokEditable(blok as SbBlokData)} className={`${maxWidthClass} w-full mx-auto lg:px-0 flex flex-col md:flex-row-reverse justify-center items-center gap-10 md:gap-[60px] bg-transparent`}>
      {blok.image?.filename && (
        <div className="max-w-[505px] w-full">
          <figure>
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || "Card image"}
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </figure>
        </div>
      )}
      <div className="max-w-[574px] w-full flex flex-col justify-start items-start gap-4">
        {blok.title && (
          <h3 className="primary-card-title">
            {blok.title}
          </h3>
        )}
        {blok.description && (
          <div className="spacious-desc">
            {parse(renderRichText(blok.description) ?? "")}
          </div>
        )}
        {blok.link?.url && blok.link_text && (
          <a href={blok.link.url} target={blok.link.target === "_blank" ? "_blank" : undefined} className="card-button mt-2">
            {blok.link_text}
          </a>
        )}
      </div>
    </section>
  );
};

export default RightCard;