import type * as React from "react";

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="16"
		height="14"
		fill="none"
		viewBox="0 0 16 14"
		{...props}
	>
		<path
			fill={props.fill ?? "#0A0A0A"}
			d="M14.157 8.3H0V7.243h14.181L7.816 1H9.29L16 7.759l-6.71 6.759H7.816z"
		></path>
	</svg>
);

export default ArrowIcon;
