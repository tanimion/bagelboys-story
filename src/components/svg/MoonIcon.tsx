import type * as React from "react";

const MoonIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="16"
		fill="none"
		viewBox="0 0 16 16"
		{...props}
	>
		<path
			stroke={props.stroke ?? "#000"}
			strokeLinejoin="bevel"
			d="M15 8.714A7.015 7.015 0 0 1 8.02 15a7.02 7.02 0 0 1-.734-14 5.48 5.48 0 0 0-1.482 3.736 5.46 5.46 0 0 0 5.46 5.46A5.43 5.43 0 0 0 15 8.714Z"
		></path>
	</svg>
);

export default MoonIcon;
