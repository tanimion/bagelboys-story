import type { Metadata } from "next";
import type { Locale } from "@/i18n/i18n-config";
import { getStory } from "@/lib/fetchers/storyblok-fetcher";

interface MetadataOptions {
	slug: string;
	lang: Locale;
}

export async function generateStoryblokMetadata({
	slug,
	lang,
}: MetadataOptions): Promise<Metadata> {
	const envPrefix = process.env.CURRENT_ENV as "dev" | "stage" | "prod";
	const story = await getStory(envPrefix, slug, lang);
	const seoData = story.content.seo_metadata;
	const robots = story?.content?.robots?.[0];

	const isProdDomain =
		process.env.ENV === "PRODUCTION" ||
		process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

	const baseMetadata: Metadata = {
		title: seoData?.title ?? "Bagelboys",
		description: seoData?.description ?? "",
		openGraph: {
			title: seoData?.og_title ?? "",
			description: seoData?.og_description ?? "",
			images: seoData?.og_image ? [seoData.og_image] : [],
		},
		twitter: {
			title: seoData?.twitter_title ?? "",
			description: seoData?.twitter_description ?? "",
			images: seoData?.twitter_image ? [seoData.twitter_image] : [],
		},
		robots: {
			index: robots?.index ?? false,
			follow: robots?.follow ?? false,
		},
	};

	// Add alternates for production domain
	if (isProdDomain) {
		baseMetadata.alternates = {
			canonical: `https://kraak.ch/${lang}/${slug.toLowerCase()}`,
			languages: {
				en: `https://kraak.ch/en/${slug.toLowerCase()}`,
				de: `https://kraak.ch/de/${slug.toLowerCase()}`,
			},
		};
	}

	return baseMetadata;
}
