import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
	const domain = process.env.NEXT_PUBLIC_DOMAIN || process.env.DOMAIN;
	const isProdDomain =
		process.env.ENV === "PRODUCTION" ||
		process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

	return {
		rules: {
			userAgent: "*",
			allow: isProdDomain ? "/" : "",
			...(!isProdDomain && { disallow: "/" }),
		},
		sitemap: isProdDomain ? `${domain}/sitemap.xml` : undefined,
	};
}
