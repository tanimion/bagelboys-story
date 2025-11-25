import { type NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { i18n } from "./i18n/i18n-config";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export function proxy(request: NextRequest) {
	const pathname = request.nextUrl.pathname;

	const isProdDomain =
		process.env.ENV === "PRODUCTION" ||
		process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

	// ✅ Skip middleware for robots.txt and sitemap.xml for production
	if (
		isProdDomain &&
		(pathname === "/robots.txt" || pathname === "/sitemap.xml")
	) {
		return NextResponse.next();
	}

	// ⛔ TEMPORARY REDIRECT FROM ROOT, /de, /en, /coming-soon, or /[locale]/coming-soon to /[locale]/start
	if (
		pathname === "/" ||
		pathname.endsWith("/coming-soon") ||
		i18n.locales.includes(pathname.slice(1) as (typeof i18n.locales)[number])
	) {
		// Redirect root and /coming-soon to default locale start
		return NextResponse.redirect(new URL(`/start`, request.url), 301);
	}
	// ✅ Run next-intl middleware (default language detection etc.)
	return handleI18nRouting(request);
}

export const config = {
	matcher: [
		"/((?!api|trpc|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|.*\\..*).*)",
	],
};
