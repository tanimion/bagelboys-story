import type * as React from "react";

const SunIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="19"
		height="19"
		fill="none"
		viewBox="0 0 19 19"
		{...props}
	>
		<path
			fill={props.fill ?? "#0A0A0A"}
			fillRule="evenodd"
			d="M9.5 3.5v-3h1v3zM5.758 6.464 3.636 4.343l.707-.707 2.122 2.121zm7.777-.707 2.122-2.121.707.707-2.122 2.121zM10 5.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9M4.5 10a5.5 5.5 0 1 1 9.426 3.852l.317-.317 2.121 2.121-.707.707-2.121-2.12.316-.318A5.48 5.48 0 0 1 10 15.5c-1.5 0-2.86-.6-3.852-1.575l.316.317-2.12 2.122-.708-.708 2.121-2.12.317.316A5.48 5.48 0 0 1 4.5 10m-1 .5h-3v-1h3zm16 0h-3v-1h3zm-10 9v-3h1v3z"
			clipRule="evenodd"
		></path>
	</svg>
);

export default SunIcon;
