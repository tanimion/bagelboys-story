import { useTheme } from "next-themes";
import type * as React from "react";

const CrossIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	const { theme } = useTheme();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props?.width ?? 32}
			height={props?.height ?? 32}
			viewBox="0 0 16 14"
			fill="none"
			{...props}
		>
			<g>
				<path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M7.85355 7.56066L1.70711 13.7071L1 13L7.14645 6.85355L1 0.707107L1.70711 0L7.85355 6.14645L14 0L14.7071 0.707107L8.56066 6.85355L14.7071 13L14 13.7071L7.85355 7.56066Z"
					fill={theme === "dark" ? "white" : "black"}
				/>
			</g>
		</svg>
	);
};
export default CrossIcon;
