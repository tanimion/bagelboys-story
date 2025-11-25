import type * as React from "react";

const MenuIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="13"
		fill="none"
		viewBox="0 0 16 13"
		{...props}
	>
		<path
			fill={props.fill ?? "#0A0A0A"}
			fillRule="evenodd"
			d="M16 2.5H0v-1h16zm0 6H0v-1h16zm0 6H0v-1h16z"
			clipRule="evenodd"
		></path>
	</svg>
);

export default MenuIcon;
