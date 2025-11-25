import Image from "next/image";
import { storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";

import type { IconBoxItem as IconBoxItemType } from "@/.storyblok/types/288385469171144/storyblok-components";

const IconBoxItem = ({ blok }: { blok: IconBoxItemType }) => {
  return (
    <div
      {...storyblokEditable(blok)}
      className="w-full flex flex-col flex-1 h-full justify-center items-center gap-3 p-6 border border-solid border-[#5F6931] rounded-3xl bg-[#5f69310d]">
      {blok.image?.filename && (
        <div className="max-w-[72px] w-full mb-2">
          <figure>
            <Image
              src={blok.image.filename}
              alt={blok.image.alt || "Icon"}
              width={72}
              height={72}
              className="w-full h-auto object-cover rounded-full"
            />
          </figure>
        </div>
      )}
      {blok.title && (
        <h3 className="text-[20px] font-normal leading-normal text-center uppercase text-[#4B4E53]">
          {blok.title}
        </h3>
      )}
      {blok.description && (
        <div className="text-sm font-normal leading-6 text-center text-[#4B4E53]">
          {parse(renderRichText(blok.description) ?? "")}
        </div>
      )}
    </div>
  );
};

export default IconBoxItem;