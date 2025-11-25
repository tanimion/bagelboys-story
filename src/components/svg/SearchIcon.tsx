import { useTheme } from "next-themes";
import type * as React from "react";

const SearchIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	const { theme } = useTheme();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props?.width ?? 32}
			height={props?.height ?? 32}
			viewBox="0 0 32 32"
			fill="none"
			{...props}
		>
			<g clipPath="url(#clip0_5615_1427)">
				<path
					d="M24.58 23.16C26.72 20.7 28 17.5 28 14C28 6.26 21.72 0 14 0C6.28 0 0 6.26 0 14C0 21.74 6.26 28 14 28C17.5 28 20.7 26.72 23.16 24.58L30.58 32L32 30.58L24.58 23.16ZM21.74 23.16C19.66 24.94 16.96 26 14 26C7.38 26 2 20.62 2 14C2 7.38 7.38 2 14 2C20.62 2 26 7.38 26 14C26 16.96 24.94 19.66 23.16 21.74C22.74 22.26 22.26 22.74 21.74 23.16Z"
					fill={theme === "dark" ? "white" : "black"}
				/>
			</g>
			<defs>
				<clipPath id="clip0_5615_1427">
					<rect width={32} height={32} />
				</clipPath>
			</defs>
		</svg>
	);
};
export default SearchIcon;
