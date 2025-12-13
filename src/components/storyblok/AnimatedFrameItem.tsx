import Image from "next/image";
import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import type { AnimatedFrameItem as AnimatedFrameItemType } from "@/.storyblok/types/288385469171144/storyblok-components";

const AnimatedFrameItem = ({ blok }: { blok: AnimatedFrameItemType }) => {
  const images = [
    blok.first_image,
    blok.second_image,
    blok.third_image,
    blok.fourth_image,
  ];

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="animated-box max-w-[400px] w-full"
    >
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="w-full relative">
          {images.map((image, index) => {
            if (!image?.filename) return null;

            const imageId = `${blok.title
              ?.replace(/\s+/g, "-")
              .toLowerCase()}-image-${index + 1}`;

            return (
              <figure key={imageId} className="m-0">
                <Image
                  id={imageId}
                  src={image.filename}
                  alt={image.alt || `${blok.title} image ${index + 1}`}
                  width={60}
                  height={60}
                  className="max-w-[60px] w-full h-auto animated-frame-image"
                />
              </figure>
            );
          })}
        </div>

        {blok.title && (
          <h3 className="text-lg md:text-[28px] leading-6 font-bold text-center text-white z-10">
            {blok.title}
          </h3>
        )}
      </div>
    </div>
  );
};

export default AnimatedFrameItem;