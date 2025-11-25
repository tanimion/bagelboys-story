import {
	renderRichText,
	type SbBlokData,
	storyblokEditable,
} from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { Hero as HeroStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";

const Hero = ({ blok }: { blok: HeroStoryblok }) => {
	return (
		<div
			{...storyblokEditable(blok as SbBlokData)}
			className="flex h-[30vh] flex-col items-center justify-center bg-gray-200"
		>
			<h1 className="mb-5 text-4xl">{blok?.Title}</h1>
			<div className="richtext">
				{parse(renderRichText(blok?.description) ?? "")}
			</div>
		</div>
	);
};

export default Hero;
