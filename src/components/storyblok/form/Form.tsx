"use client";

import {
  storyblokEditable,
  StoryblokServerComponent,
  type SbBlokData,
} from "@storyblok/react/rsc";
import { useState, useEffect } from "react";
import type { Form as FormType } from "@/.storyblok/types/288385469171144/storyblok-components";

const Form = ({ blok }: { blok: FormType }) => {
  const actionUrl = blok.action_url || "/api/forms/submit";

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();               // ⛔ Stop page reload
    const formEl = e.currentTarget;
    const formData = new FormData(formEl);

    setLoading(true);

    try {
      const res = await fetch(actionUrl, {
        method: "POST",
        body: formData,
      });

      const result = await res.json().catch(() => null);

      if (!res.ok) {
        setToast({
          type: "error",
          message: result?.error || "Something went wrong!",
        });
      } else {
        setToast({
          type: "success",
          message: "Form submitted successfully!",
        });

        formEl.reset();               // ✅ RESET FORM ON SUCCESS ONLY
      }
    } catch (err: any) {
      setToast({
        type: "error",
        message: err.message || "Submission failed!",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Toast Message */}
      {toast && (
        <div
          className={`px-5 py-3 text-left mb-4 w-full rounded-xl shadow-lg text-white text-sm animate-fade-toast
          ${toast.type === "success" ? "bg-green-600" : "bg-red-600"}`}
        >
          {toast.message}
        </div>
      )}

      {/* FORM */}
      <form
        {...storyblokEditable(blok as SbBlokData)}
        onSubmit={handleSubmit}                         // ⬅️ Important
        className="w-full max-w-full mx-auto flex flex-col gap-4"
      >
        {blok.fields?.map((field) => (
          <StoryblokServerComponent blok={field} key={field._uid} />
        ))}

        <div className="w-full md:w-auto">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center w-full md:w-auto rounded-xl cursor-pointer px-10 py-5 text-sm md:text-[18px] font-normal uppercase tracking-[0.12em] text-white transition
              ${loading ? "bg-[#A66C23]/70 cursor-not-allowed" : "bg-[#A66C23] hover:opacity-90"}
            `}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Sending...
              </div>
            ) : (
              blok.button_label || "Submit"
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;