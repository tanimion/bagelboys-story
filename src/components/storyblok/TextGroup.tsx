import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { TextGroup as TextGroupType } from "@/.storyblok/types/288385469171144/storyblok-components";

const TextGroup = ({ blok }: { blok: TextGroupType }) => {
  return (
    <div {...storyblokEditable(blok)} className="max-w-[704px] w-full flex flex-col justify-center items-center gap-4 text-center mx-auto mb-[60px]" >
      {blok.title && (
        <h2 className="primary-card-title">
          {blok.title}
        </h2>
      )}
      {blok.description && (
        <div className="spacious-desc">
          {parse(renderRichText(blok.description) ?? "")}
        </div>
      )}
    </div>
  );
};

export default TextGroup;
