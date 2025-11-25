import { StoryblokServerComponent } from "@storyblok/react/rsc";
import type { FooterItem } from "@/.storyblok/types/288385469171144/storyblok-components";

const Footer = async ({ blok }: { blok?: FooterItem[] }) => {
	if (!blok) {
		return null; // Return null if no blok is provided
	}

	return (
		<footer className="bottom-0 flex gap-4 bg-black px-5 py-8 text-white">
			Footer
			{blok.map((item) => (
				<StoryblokServerComponent blok={item} key={item?._uid} />
			))}
		</footer>
	);
};

export default Footer;
