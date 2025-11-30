import { storyblokEditable, type SbBlokData, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { FooterTextGroup as FooterTextGroupType } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterTextGroup = ({ blok }: { blok: FooterTextGroupType }) => {
  return (
    <div {...storyblokEditable(blok as SbBlokData)} className="max-w-[293px] w-full flex flex-col justify-start items-start gap-5 text-left">
      {blok.title && (
        <h3 className="text-base font-bold leading-[22px] text-[#4B4E53]">
          {blok.title}
        </h3>
      )}

      {blok.text && (
        <div className="footer-desc text-[15px] font-normal leading-[21px] text-[#4B4E53] opacity-70">
          {parse(renderRichText(blok.text) ?? "")}
        </div>
      )}
    </div>
  );
};

export default FooterTextGroup;