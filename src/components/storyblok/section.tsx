import {
	renderRichText,
	type SbBlokData,
	storyblokEditable,
} from "@storyblok/react/rsc";
import parse from "html-react-parser";
import type { Section as SectionStoryblok } from "@/.storyblok/types/288385469171144/storyblok-components";

const Section = ({ blok }: { blok: SectionStoryblok }) => {
	return (
		<section
			{...storyblokEditable(blok as SbBlokData)}
			className="flex h-[30vh] flex-col items-center"
		>
			<h2 className="mt-4">{blok?.title}</h2>
			<div className="w-full">
				<div className="richtext mt-10 px-5">
					{parse(renderRichText(blok?.description) ?? "")}
				</div>
				{blok?.action_btn_link?.url && (
					<div className="">
						<a
							className=""
							href={blok?.action_btn_link?.url}
							target={blok?.action_btn_link?.target ?? "_self"}
						>
							<span className="">{blok?.action_btn_text}</span>
						</a>
					</div>
				)}
			</div>
		</section>
	);
};

export default Section;
