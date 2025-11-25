import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import type { Links as LinksStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";
import { Link } from "@/i18n/navigation";

const Links = ({ blok }: { blok: LinksStoryblok }) => {
	return (
		<Link
			{...storyblokEditable(blok as SbBlokData)}
			className="text-white"
			href={blok?.link?.url ?? ""}
			target={blok?.link?.target ?? "_self"}
		>
			{blok?.text}
		</Link>
	);
};

export default Links;
