import {
	type SbBlokData,
	StoryblokServerComponent,
	storyblokEditable,
} from "@storyblok/react/rsc";
import type { Menu } from "@/.storyblok/types/288385469171144/storyblok-components";

const SBMenu = ({ blok }: { blok: Menu }) => {
	return (
		<div {...storyblokEditable(blok as SbBlokData)}>
			{blok?.items?.map((blok) => (
				<StoryblokServerComponent blok={blok} key={blok?._uid} />
			))}
		</div>
	);
};

export default SBMenu;
