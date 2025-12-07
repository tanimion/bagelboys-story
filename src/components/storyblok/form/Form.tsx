"use client";

import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";
import type { Form as FormType } from "@/.storyblok/types/288385469171144/storyblok-components";

const Form = ({ blok }: { blok: FormType }) => {
  const actionUrl = blok.action_url || "/api/forms/submit";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); // prevent page reload

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    // Silent submit — no messages, no field reset
    await fetch(actionUrl, {
      method: "POST",
      body: formData,
    });
  }

  return (
    <form
      {...storyblokEditable(blok as SbBlokData)}
      onSubmit={handleSubmit}
      className="w-full max-w-full mx-auto flex flex-col gap-4"
    >
      {blok.fields?.map((field) => (
        <StoryblokServerComponent blok={field} key={field._uid} />
      ))}

      {/* Wrap the button inside div w-auto */}
      <div className="w-auto">
        <button
          type="submit"
          className="flex items-center justify-center rounded-xl px-10 py-5 text-[18px] font-normal uppercase tracking-[0.12em] bg-[#A66C23] text-white hover:opacity-90 transition"
        >
          {blok.button_label || "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;