"use client";

import { type SbBlokData, storyblokEditable, renderRichText } from "@storyblok/react/rsc";
import parse from "html-react-parser";

import type { GoogleReviewItem as GoogleReviewItemType } from "@/.storyblok/types/288385469171144/storyblok-components";

const GoogleReviewItem = ({ blok }: { blok: GoogleReviewItemType }) => {
    const rating = blok.rating ?? 5;
    const renderStars = (rating: number = 0) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    const starsArray = [];
    for (let i = 0; i < fullStars; i++) {
      starsArray.push(
        <img
          key={`full-${i}`}
          src="/star-filled.svg"
          alt="star"
          className="w-4 h-4"
        />
      );
    }
    for (let i = 0; i < emptyStars; i++) {
      starsArray.push(
        <img
          key={`empty-${i}`}
          src="/star-empty.svg"
          alt="empty star"
          className="w-4 h-4 opacity-20"
        />
      );
    }

    return starsArray;
  };

  return (
    <article {...storyblokEditable(blok as SbBlokData)} className="bg-white rounded-[20px] p-6 min-h-[260px] flex flex-col gap-3 border border-[#E8E8E8] shadow-sm">
      {blok.name && (
        <h3 className="text-[15px] leading-[18px] font-semibold overflow-hidden text-ellipsis text-[#a66c23]">
          {blok.name}
        </h3>
      )}
      {blok.subtitle && (
        <p className="text-xs leading-4 text-[#A66C23]">
          {blok.subtitle}
        </p>
      )}
      <div className="flex items-center gap-1">
        {renderStars(blok.rating ?? 5)}
      </div>
      {blok.text && (
        <div className="text-base text-[#A66C23] leading-relaxed">
          {parse(renderRichText(blok.text) ?? "")}
        </div>
      )}
      {blok.cta_label && (
        <button className="mt-auto text-[12px] uppercase tracking-[0.12em] font-semibold text-[#A66C23] opacity-5">
          {blok.cta_label}
        </button>
      )}
    </article>
  );
};

export default GoogleReviewItem;