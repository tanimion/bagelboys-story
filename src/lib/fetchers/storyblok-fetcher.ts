import { draftMode } from "next/headers";
import { getStoryblokApi } from "@/lib/storyblok";
import { i18n, type Locale } from "../../i18n/i18n-config";

export async function fetchSBData(
	envPrefix: "dev" | "stage" | "prod",
	slug: string,
	lang: Locale = i18n.defaultLocale as Locale,
) {
	const { isEnabled } = await draftMode();
	const storyblokApi = getStoryblokApi();
	const route = `${envPrefix}/${slug}`;

	const response = await storyblokApi?.getStory(
		route,
		{
			version:
				process.env.NODE_ENV === "development" || isEnabled
					? "draft"
					: "published",
			language: lang?.toLowerCase(),
		},
		{
			next: {
				revalidate: 300, // Cache for 5 minutes
				tags: [`story-${route}-lang-${lang}`], // Cache tags for invalidation
			},
		},
	);

	return response?.data?.story;
}

export const getStory = fetchSBData;
