import { type SbBlokData, storyblokEditable } from "@storyblok/react/rsc";
import type { MenuItem } from "@/.storyblok/types/288385469171144/storyblok-components";
import { Link } from "@/i18n/navigation";

const SBMenuItem = ({ blok }: { blok: MenuItem }) => {
	return (
		<div {...storyblokEditable(blok as SbBlokData)} className="">
			<div className="">
				{blok?.link?.url ? (
					<Link
						tabIndex={0}
						href={blok?.link?.url}
						target={blok.link?.target ?? "_self"}
						className="no-underline"
					>
						<h1 className="">{blok?.title}</h1>
					</Link>
				) : (
					<button tabIndex={-1} type="button">
						<h1 className="">{blok?.title}</h1>
					</button>
				)}
				<div className="" />
			</div>

			{/* SubItems */}
			<div className="">
				{blok?.SubItems?.map((subitem) => (
					<Link
						href={subitem.link?.url ?? "#"}
						target={subitem.link?.target ?? "_self"}
						key={subitem._uid}
						className=""
					>
						{subitem.title}
					</Link>
				))}
			</div>
		</div>
	);
};

export default SBMenuItem;
