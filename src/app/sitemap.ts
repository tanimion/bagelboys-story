import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const domain = process.env.NEXT_PUBLIC_DOMAIN || process.env.DOMAIN;

	const isProdDomain =
		process.env.ENV === "PRODUCTION" ||
		process.env.NEXT_PUBLIC_ENV === "PRODUCTION";

	if (!isProdDomain) return [];

	const envPrefix = process.env.CURRENT_ENV as "stage" | "prod" | "dev";

	// Fetch dynamic module slugs
	const moduleSlugs: string[] = await fetch(
		`https://api.storyblok.com/v2/cdn/stories?starts_with=${envPrefix}/Blog/&version=published&token=${process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN}`,
		{
			next: { revalidate: 300 },
		},
	)
		.then((res) => res.json())
		.then((data) =>
			data?.stories?.map((module: { slug: string }) => module.slug),
		)
		.catch(() => []);

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: `${domain}`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en`,
					de: `${domain}/de`,
				},
			},
		},
		{
			url: `${domain}/faq`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/faq`,
					de: `${domain}/de/faq`,
				},
			},
		},
		{
			url: `${domain}/prices`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/prices`,
					de: `${domain}/de/prices`,
				},
			},
		},
		{
			url: `${domain}/trial-limitations`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/trial-limitations`,
					de: `${domain}/de/trial-limitations`,
				},
			},
		},
		{
			url: `${domain}/testphase-beantragen`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/testphase-beantragen`,
					de: `${domain}/de/testphase-beantragen`,
				},
			},
		},
		{
			url: `${domain}/modules`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/modules`,
					de: `${domain}/de/modules`,
				},
			},
		},
	];

	const dynamicModuleRoutes: MetadataRoute.Sitemap = moduleSlugs.map(
		(slug) => ({
			url: `${domain}/modules/${slug}`,
			lastModified: new Date(),
			alternates: {
				languages: {
					en: `${domain}/en/modules/${slug}`,
					de: `${domain}/de/modules/${slug}`,
				},
			},
		}),
	);

	return [...staticRoutes, ...dynamicModuleRoutes];
}
