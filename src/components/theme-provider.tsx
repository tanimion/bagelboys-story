"use client";

import {
	ThemeProvider as NextThemeProvider,
	type ThemeProviderProps,
} from "next-themes";
import { useEffect, useState } from "react";

interface CustomThemeProviderProps extends ThemeProviderProps {
	children: React.ReactNode;
}
export function ThemeProvider({
	children,
	...props
}: Readonly<CustomThemeProviderProps>) {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <>{children}</>; // Render children immediately before the theme provider applies
	}

	return (
		<NextThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem
			{...props}
		>
			{children}
		</NextThemeProvider>
	);
}
