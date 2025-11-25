"use client";

import { type SbBlokData, storyblokEditable, StoryblokServerComponent } from "@storyblok/react/rsc";
import type { GoogleReviewsSlider as GoogleReviewsSliderType } from "@/.storyblok/types/288385469171144/storyblok-components";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

const GoogleReviewSlider = ({ blok }: { blok: GoogleReviewsSliderType }) => {
  return (
    <section {...storyblokEditable(blok as SbBlokData)} className="w-full bg-transparent py-[70px] px-4">
      <div className="max-w-[1286px] mx-auto">
        {(blok.title || blok.rating_label || blok.reviews_note) && (
          <div className="flex justify-center flex-wrap items-center gap-2 mb-10 text-[#A66C23]">
            {blok.title && (
              <h2 className="text-3xl text-[#4B4E53] tracking-[0.2em] uppercase font-medium">
                {blok.title}
              </h2>
            )}

            {blok.rating_label && (
              <span className="text-3xl uppercase font-medium">
                {blok.rating_label}
              </span>
            )}

            {blok.reviews_note && (
              <span className="text-sm uppercase font-light tracking-wider">
                {blok.reviews_note}
              </span>
            )}
          </div>
        )}

        {/* SLIDER WITH ARROWS */}
        <div className="relative">
          <div className="review-arrows swiper-button-prev !left-0 !translate-x-[-50%] hidden md:flex items-center justify-center rounded-full bg-[#888888] shadow-md border border-[#888888] text-white"></div>
          <div className="review-arrows swiper-button-next !right-0 !translate-x-[50%] hidden md:flex items-center justify-center rounded-full bg-[#888888] shadow-md border border-[#888888] text-white"></div>
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            loop={true}
            speed={650}
            spaceBetween={24} // identical to design
            breakpoints={{
              0: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-6"
          >
            {blok.reviews?.map((review) => (
              <SwiperSlide key={review._uid}>
                <StoryblokServerComponent blok={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviewSlider;
