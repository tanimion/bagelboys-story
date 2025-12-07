import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";

import type { FormColumns as FormColumnsType } from "@/.storyblok/types/288385469171144/storyblok-components";
// Replace xxxxx with your folder ID

const columnClassMap: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
};

const FormColumns = ({ blok }: { blok: FormColumnsType }) => {
  const columns = blok.columns ?? 2; // default 2
  const columnClass = columnClassMap[columns] || columnClassMap[2];

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className={`grid grid-cols-1 ${columnClass} gap-4 w-full`}
    >
      {blok.fields?.map((field) => (
        <StoryblokServerComponent key={field._uid} blok={field} />
      ))}
    </div>
  );
};

export default FormColumns;