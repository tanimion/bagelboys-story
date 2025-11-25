import { NextResponse } from "next/server";
import type { Locale } from "@/i18n/i18n-config";
import { fetchSBData } from "@/lib/fetchers/storyblok-fetcher";

export async function handleStoryblokApi(req: Request, slug: string) {
	const { searchParams } = new URL(req.url);
	const lang = (searchParams.get("lang") ?? "de") as Locale;

	const envPrefix = process.env.CURRENT_ENV as "stage" | "prod" | "dev";
	const story = await fetchSBData(envPrefix, slug, lang);

	if (!story?.content) {
		return new NextResponse("Story not found", { status: 404 });
	}

	return new NextResponse(JSON.stringify(story), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
		},
	});
}
