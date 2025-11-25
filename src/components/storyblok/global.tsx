import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import type { Global as GlobalStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";

const Global = ({ blok }: { blok: GlobalStoryblok }) => {
	return (
		<div {...storyblokEditable(blok as SbBlokData)}>
			{/* render other than header and footer as they are rendering on layout. */}
			{/* {blok?.burger_menu?.map((blok) => (
        <StoryblokServerComponent blok={blok} key={blok?._uid} />
      ))}
       */}
		</div>
	);
};

export default Global;
