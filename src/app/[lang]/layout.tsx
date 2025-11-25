import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import type { Global } from "@/.storyblok/types/288385469171144/storyblok-components";
import { StoryblokProvider } from "@/components/storyblokProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { getStory } from "@/lib/fetchers/storyblok-fetcher";
import "../globals.css";
const Header = dynamic(() => import("@/components/section/Header"));
const Footer = dynamic(() => import("@/components/section/Footer"));

export const revalidate = 300; // 5 minutes

export const metadata: Metadata = {
	title: "YOUR PROJECT",
};

export async function generateStaticParams() {
	return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function PageLayout({
	children,
	params,
}: Readonly<{
	children: ReactNode;
	params: Promise<{ lang: Locale }>;
}>) {
	const { lang } = await params;
	setRequestLocale(lang);

	const envPrefix = process.env.CURRENT_ENV as "dev" | "stage" | "prod";

	const global_story = await getStory(envPrefix, "global", lang);
	const globalStory = global_story?.content as Global;

	return (
		<html lang={lang}>
			<head>
				{/* Add any required meta tags or other head elements here */}
			</head>

			<body>
				<NextIntlClientProvider>
					<StoryblokProvider>
						<ThemeProvider attribute="class" defaultTheme="light" enableSystem>
							<main>
								<Header
									burger_menu={globalStory?.burger_menu}
									header_logo={globalStory?.header_logo}
								/>

								{children}

								<Footer blok={globalStory?.footer} />
							</main>
						</ThemeProvider>
					</StoryblokProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
