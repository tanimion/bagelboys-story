// app/api/revalidate/route.ts
import { revalidatePath, updateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	try {
		const body = await req.json();
		const fullSlug: string | undefined = body?.full_slug;

		if (!fullSlug) {
			return NextResponse.json(
				{ message: "No slug found in payload" },
				{ status: 400 },
			);
		}

		// revalidate both English and German paths
		const slugParts = fullSlug.split("/");
		const normalizedSlug = slugParts
			.slice(1)
			.map((part) => part.toLowerCase())
			.join("/");
		const pathsToRevalidate = [
			`/de/${normalizedSlug}`,
			`/en/${normalizedSlug}`,
		];

		for (const path of pathsToRevalidate) {
			revalidatePath(path);
			console.log("🔁 Revalidating:", path);
		}

		// revalidating the tag for the story
		const fullSlugLowerCase = fullSlug.toLowerCase();

		const tagsToRevalidate = [
			`story-${fullSlugLowerCase}-lang-de`,
			`story-${fullSlugLowerCase}-lang-en`,
		];
		for (const tag of tagsToRevalidate) {
			updateTag(tag);
			console.log("🔁 Revalidating tag:", tag);
		}

		return NextResponse.json({
			revalidated: true,
			originalSlug: fullSlug,
			revalidatedPaths: pathsToRevalidate,
			time: new Date().toISOString(),
		});
	} catch (error) {
		console.error("❌ Webhook error:", error);
		return NextResponse.json(
			{ message: "Error parsing payload", error },
			{ status: 500 },
		);
	}
}
