import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";
import type { Form as FormType } from "@/.storyblok/types/288385469171144/storyblok-components";

const Form = ({ blok }: { blok: FormType }) => {
  const method = (blok.method && blok.method.toLowerCase()) === "get" ? "get" : "post";
  const actionUrl = blok.action_url || "/api/forms/submit";

  return (
    <form
      {...storyblokEditable(blok as SbBlokData)}
      className="w-full max-w-[640px] mx-auto flex flex-col gap-6"
      action={actionUrl}
      method={method}
    >
      {blok.fields?.map((field) => (
        <StoryblokServerComponent blok={field} key={field._uid} />
      ))}

      <button
        type="submit"
        className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] bg-[#A66C23] text-white hover:opacity-90 transition"
      >
        {blok.button_label || "Submit"}
      </button>
    </form>
  );
};

export default Form;