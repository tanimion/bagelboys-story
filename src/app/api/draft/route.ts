import { draftMode } from "next/headers";
import type { NextRequest } from "next/server";
import { i18n } from "@/i18n/i18n-config";
import { redirect } from "@/i18n/navigation";

export const GET = async (request: NextRequest) => {
	const { searchParams } = new URL(request.url);

	let slug = searchParams.get("slug") ?? "";
	slug = slug?.toLocaleLowerCase();
	const locale = searchParams.get("locale") ?? i18n.defaultLocale;

	// Sanitize slug
	slug = slug.replace(/^(['"])(.*)\1$/, "$2"); // Remove quotes if present
	slug = slug.startsWith("/") ? slug.slice(1) : slug;

	// Split slug into parts
	const slugParts = slug.split("/").filter((part) => part.length > 0);

	// Check if first part is a locale and extract it
	let extractedLocale = locale;
	let filteredParts = slugParts;

	const isValidLocale = (
		value: string,
	): value is (typeof i18n.locales)[number] => {
		return i18n.locales.includes(value as (typeof i18n.locales)[number]);
	};

	if (slugParts.length > 0 && isValidLocale(slugParts[0])) {
		extractedLocale = slugParts[0];
		filteredParts = slugParts.slice(1); // Remove locale from slug parts
	}

	// Remove 'dev', 'stage', or 'prod' segments from remaining slug parts
	filteredParts = filteredParts.filter(
		(part) => !["dev", "stage", "prod"].includes(part.toLowerCase()),
	);

	// Reconstruct slug without locale prefix
	slug = filteredParts.join("/");

	// Enable draft mode
	const draft = await draftMode();
	draft.enable();

	const remainingParams = searchParams.toString();

	let finalURL = `/${slug}`;
	if (remainingParams) {
		finalURL += `?${remainingParams}`;
	}

	return redirect({ href: finalURL, locale: extractedLocale });
};
