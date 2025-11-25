import { StoryblokStory } from "@storyblok/react/rsc";
import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import type { Locale } from "@/i18n/i18n-config";
import { getStory } from "@/lib/fetchers/storyblok-fetcher";
import { generateStoryblokMetadata } from "@/lib/metadata";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ lang: Locale; slug: string[] }>;
}): Promise<Metadata> {
	const { lang, slug } = await params;
	const finalSlug = slug ? slug?.join("/").toString() : "start"; //here "start" is the root slug

	return generateStoryblokMetadata({ slug: finalSlug, lang });
}

export default async function Page({
	params,
}: Readonly<{ params: Promise<{ lang: Locale; slug: string[] }> }>) {
	const { lang, slug } = await params;
	setRequestLocale(lang);

	//Preparing Slug to match storyblok slug
	const finalSlug = slug ? slug?.join("/").toString() : "start"; //here "start" is the root slug

	const envPrefix = process.env.CURRENT_ENV as "dev" | "stage" | "prod";

	const story = await getStory(envPrefix, finalSlug, lang);

	return <StoryblokStory story={story} />;
}
