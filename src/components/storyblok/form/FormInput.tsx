import { storyblokEditable, type SbBlokData } from "@storyblok/react/rsc";
import type { FormInput as FormInputType } from "@/.storyblok/types/288385469171144/storyblok-components";

const FormInput = ({ blok }: { blok: FormInputType }) => {
  if (!blok.name) return null;

  const type = blok.type || "text";

  return (
    <div
      {...storyblokEditable(blok as SbBlokData)}
      className="flex flex-col gap-1 text-left"
    >
      {blok.label && (
        <label className="text-sm font-medium text-[#4B4E53]">
          {blok.label}
          {blok.required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        type={type}
        name={blok.name}
        required={!!blok.required}
        placeholder={blok.placeholder || ""}
        className="w-full rounded-xl border border-solid border-[#D6D6D6] bg-white px-4 py-5 text-base font-normal leading-6 text-[#4B4E53] outline-none focus:border-[#A66C23] placeholder:text-base placeholder:font-normal placeholder:leading-6 placeholder:text-[#4B4E53]"
      />

      {blok.help_text && (
        <p className="text-xs text-[#8D8D8D]">{blok.help_text}</p>
      )}
    </div>
  );
};

export default FormInput;