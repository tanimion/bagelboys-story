import {
	renderRichText,
	type SbBlokData,
	storyblokEditable,
} from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { Blog as BlogStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";

const Blog = ({ blok }: { blok: BlogStoryblok }) => {
	return (
		<div
			{...storyblokEditable(blok as SbBlokData)}
			className="flex flex-col items-center justify-center bg-gray-200"
		>
			<h1 className="text-4xl">{blok?.title}</h1>
			<div className="richtext">
				{parse(renderRichText(blok?.description) ?? "")}
			</div>
		</div>
	);
};

export default Blog;
