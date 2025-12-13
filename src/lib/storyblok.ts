import { apiPlugin, storyblokInit } from "@storyblok/react/rsc";
import dynamic from "next/dynamic";
import Blog from "@/components/storyblok/blog";
import Global from "@/components/storyblok/global";

const Footer = dynamic(() => import("@/components/section/Footer"), {
	ssr: true,
});
const FooterGrid = dynamic(() => import("@/components/storyblok/footer/footer_grid"), {
		ssr: true,
});
const FooterItemBox = dynamic(() => import("@/components/storyblok/footer/footer_item_box"), {
		ssr: true,
});
const FooterItem = dynamic(() => import("@/components/storyblok/footer/footeritem"), {
		ssr: true,
});
const FooterLogoBox = dynamic(() => import("@/components/storyblok/footer/footer_logo_box"), {
		ssr: true,
});
const FooterTextGroup = dynamic(() => import("@/components/storyblok/footer/footer_text_group"), {
		ssr: true,
});
const SocialMediaLinks = dynamic(() => import("@/components/storyblok/footer/social_media_links"), {
		ssr: true,
});
const FooterContactBox = dynamic(() => import("@/components/storyblok/footer/footer_contact_box"), {
		ssr: true,
});
const SocialMediaItem = dynamic(() => import("@/components/storyblok/footer/social_media_item"), {
		ssr: true,
});
const ThreeImageShowcase = dynamic(() => import("@/components/storyblok/ThreeImageShowcase"), {
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

const SmallTextGroupGrid = dynamic(
  () => import("@/components/storyblok/SmallTextGroupGrid"),
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

const SmallTextGroup = dynamic(
  () => import("@/components/storyblok/SmallTextGroup"),
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

const Form = dynamic(() => import("@/components/storyblok/form/Form"), {
  ssr: true,
});

const FormColumns = dynamic(() => import("@/components/storyblok/form/FormColumns"), {
  ssr: true,
});

const FormInput = dynamic(
  () => import("@/components/storyblok/form/FormInput"),
  { ssr: true }
);

const FormTextarea = dynamic(
  () => import("@/components/storyblok/form/FormTextarea"),
  { ssr: true }
);

const ContactFormGrid = dynamic(
  () => import("@/components/storyblok/ContactFormGrid"),
  { ssr: true }
);

const ImageBox = dynamic(
  () => import("@/components/storyblok/ImageBox"),
  { ssr: true }
);

const ContactFormBox = dynamic(
  () => import("@/components/storyblok/ContactFormBox"),
  { ssr: true }
);

const TextBlock = dynamic(
  () => import("@/components/storyblok/TextBlock"),
  { ssr: true }
);

const AnimatedFrameBox = dynamic(
  () => import("@/components/storyblok/AnimatedFrameBox"),
  { ssr: true }
);

const AnimatedFrameItem = dynamic(
  () => import("@/components/storyblok/AnimatedFrameItem"),
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
  footer_grid: FooterGrid,
  footer_logo_box: FooterLogoBox,
  footer_item_box: FooterItemBox,
  footer_text_group: FooterTextGroup,
	social_media_links: SocialMediaLinks,
	social_media_item: SocialMediaItem,
	footer_contact_box: FooterContactBox,
	three_image_showcase: ThreeImageShowcase,
	small_text_group_grid: SmallTextGroupGrid,
	small_text_group: SmallTextGroup,
	form: Form,
	form_input: FormInput,
	form_textarea: FormTextarea,
	form_columns: FormColumns,
	contact_form_grid: ContactFormGrid,
	contact_form_box: ContactFormBox,
	image_box: ImageBox,
	text_block: TextBlock,
	animated_frame_box: AnimatedFrameBox,
	animated_frame_item: AnimatedFrameItem,
};

export const getStoryblokApi = storyblokInit({
	accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
	use: [apiPlugin],
	components,
	enableFallbackComponent: true,
});
