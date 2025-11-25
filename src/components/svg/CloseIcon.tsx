import type * as React from "react";

const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="14"
		height="14"
		fill="none"
		viewBox="0 0 14 14"
		{...props}
	>
		<path
			fill={props.fill ?? "#0A0A0A"}
			fillRule="evenodd"
			d="m7.854 8.56-6.147 6.147L1 14l6.146-6.146L1 1.707 1.707 1l6.147 6.146L14 1l.707.707-6.146 6.147L14.707 14l-.707.707z"
			clipRule="evenodd"
		></path>
	</svg>
);

export default CloseIcon;
