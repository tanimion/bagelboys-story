import {
  type SbBlokData,
  storyblokEditable,
  renderRichText,
} from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { SmallTextGroup as SmallTextGroupType } from "@/.storyblok/types/288385469171144/storyblok-components";

const SmallTextGroup = ({ blok }: { blok: SmallTextGroupType }) => {
  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="max-w-full lg:max-w-[400px] w-full flex flex-col justify-start items-start gap-3 text-left"
    >
      {blok.title && (
        <h3 className="primary-card-title">
          {blok.title}
        </h3>
      )}

      {blok.description && (
        <div className="spacious-desc text-left">
          {parse(renderRichText(blok.description) ?? "")}
        </div>
      )}
    </div>
  );
};

export default SmallTextGroup;