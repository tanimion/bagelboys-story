import { type SbBlokData, storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import type { IconBoxGrid as IconBoxGridType } from "@/.storyblok/types/288385469171144/storyblok-components";

const maxWidthMap: Record<string, string> = {
  default: "max-w-[1286px] mx-auto",
  wide: "max-w-[1440px] mx-auto",
  full: "w-full mx-auto",
};

const IconBoxGrid = ({ blok }: { blok: IconBoxGridType }) => {
  const maxWidthKey = typeof blok.max_width === "string" && maxWidthMap[blok.max_width] ? blok.max_width : "default";
  const maxWidthClass = maxWidthMap[maxWidthKey];

  return (
    <section
      {...storyblokEditable(blok as SbBlokData)} className="w-full bg-transparent py-[140px] px-4 relative"
      style={{
        backgroundImage: blok.bg_image?.filename
          ? `url(${blok.bg_image.filename})`
          : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {blok.top_content?.length > 0 && (
        <div className={`${maxWidthClass} mb-10`}>
          {blok.top_content.map((nested) => (
            <StoryblokServerComponent blok={nested} key={nested._uid} />
          ))}
        </div>
      )}
      <div className={`${maxWidthClass} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 justify-items-center place-items-center`}>
        {blok.items?.map((item) => (
          <StoryblokServerComponent blok={item} key={item._uid} />
        ))}
      </div>
    </section>
  );
};

export default IconBoxGrid;