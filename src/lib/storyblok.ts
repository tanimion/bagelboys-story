import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import dynamic from "next/dynamic";
import Blog from "@/components/storyblok/blog";
import Global from "@/components/storyblok/global";

const Footer = dynamic(() => import("@/components/section/Footer"), {
	ssr: true,
});

const FooterItem = dynamic(() => import("@/components/storyblok/footer/footeritem"), {
		ssr: true,
});
const Section = dynamic(() => import("@/components/storyblok/section"), {
	ssr: true,
});
const Hero = dynamic(() => import("@/components/storyblok/hero"), {
	ssr: true,
});

const Links = dynamic(() => import("@/components/storyblok/links"), {
	ssr: true,
});

const SBMenu = dynamic(() => import("@/components/storyblok/menu"), {
	ssr: true,
});
const SBMenuItem = dynamic(() => import("@/components/storyblok/menu_item"), {
	ssr: true,
});
const pageContent = dynamic(
	() => import("@/components/storyblok/pageContent"),
	{
		ssr: true,
	},
);

const BgHeroBanner = dynamic(
  () => import("@/components/storyblok/BgHeroBanner"),
  { ssr: true }
);

const SectionWrapper = dynamic(
  () => import("@/components/storyblok/SectionWrapper"),
  { ssr: true }
);

const LeftCard = dynamic(
  () => import("@/components/storyblok/LeftCard"),
  { ssr: true }
);

const RightCard = dynamic(
  () => import("@/components/storyblok/RightCard"),
  { ssr: true }
);

const IconBoxGrid = dynamic(
  () => import("@/components/storyblok/IconBoxGrid"),
  { ssr: true }
);

const IconBoxItem = dynamic(
  () => import("@/components/storyblok/IconBoxItem"),
  { ssr: true }
);

const TextGroup = dynamic(
  () => import("@/components/storyblok/TextGroup"),
  { ssr: true }
);

const GoogleReviewSlider = dynamic(
  () => import("@/components/storyblok/GoogleReviewSlider"),
  { ssr: true }
);

const GoogleReviewItem = dynamic(
  () => import("@/components/storyblok/GoogleReviewItem"),
  { ssr: true }
);

const components = {
	hero: Hero,
	footer: Footer,
	footer_item: FooterItem,
	links: Links,
	menu: SBMenu,
	menu_item: SBMenuItem,
	page: pageContent,
	Section: Section,
	blog: Blog,
	global: Global,
	bg_hero_banner: BgHeroBanner,
	section_wrapper: SectionWrapper,
	left_card: LeftCard,
	right_card: RightCard,
	icon_box_grid: IconBoxGrid,
	icon_box_item: IconBoxItem,
	text_group: TextGroup,
	google_reviews_slider: GoogleReviewSlider,
  google_review_item: GoogleReviewItem,
};

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components,
	enableFallbackComponent: true,
});
