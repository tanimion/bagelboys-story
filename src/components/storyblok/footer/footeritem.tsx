import {
	type SbBlokData,
	StoryblokServerComponent,
	storyblokEditable,
} from "@storyblok/react/rsc";
import type { FooterItem as FooterLeftStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";

const FooterItem = ({ blok }: { blok: FooterLeftStoryblok }) => {
	return (
		<div {...storyblokEditable(blok as SbBlokData)} className="flex gap-2">
			{blok?.items?.map((item, index) => (
				<StoryblokServerComponent
					blok={item}
					key={item?._uid || `footer-item-${index}`}
				/>
			))}
		</div>
	);
};

export default FooterItem;
