import { useTheme } from "next-themes";
import type * as React from "react";

const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
	const { theme } = useTheme();

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={props?.width ?? 38}
			height={props?.height ?? 24}
			viewBox="0 0 38 24"
			fill="none"
			{...props}
		>
			<path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M17.7109 12.7129L0.32616 12.7129L0.326162 10.7129L17.7109 10.7129H19.7109L37.0957 10.7129L37.0957 12.7129L19.7109 12.7129H17.7109Z"
				fill={theme === "dark" ? "white" : "black"}
			/>
		</svg>
	);
};
export default MinusIcon;
