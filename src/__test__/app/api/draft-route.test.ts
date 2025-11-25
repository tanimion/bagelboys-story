// Mock next/headers
const mockDraftMode = {
	enable: jest.fn(),
};

jest.mock("next/headers", () => ({
	draftMode: jest.fn(() => Promise.resolve(mockDraftMode)),
}));

// Mock i18n navigation
jest.mock("@/i18n/navigation", () => ({
	redirect: jest.fn(),
}));

// Mock i18n config
jest.mock("@/i18n/i18n-config", () => ({
	i18n: {
		defaultLocale: "de",
		locales: ["de", "en"],
	},
}));

import type { NextRequest } from "next/server";
import { redirect } from "@/i18n/navigation";
import { GET } from "../../../app/api/draft/route";

const mockRedirect = redirect as jest.MockedFunction<typeof redirect>;

describe("Draft API Route", () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	const createMockRequest = (url: string): NextRequest => {
		return {
			url,
		} as NextRequest;
	};

	it("should handle slug without locale prefix", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=dev/prices",
		);

		await GET(request);

		expect(mockDraftMode.enable).toHaveBeenCalled();
		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=dev%2Fprices",
			locale: "de", // default locale
		});
	});

	it("should extract locale from slug and remove it from path", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=en/dev/prices",
		);

		await GET(request);

		expect(mockDraftMode.enable).toHaveBeenCalled();
		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=en%2Fdev%2Fprices",
			locale: "en", // extracted from slug
		});
	});

	it("should handle slug with locale but no environment segment", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=en/prices",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=en%2Fprices",
			locale: "en",
		});
	});

	it("should filter out dev, stage, and prod segments", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=en/stage/products/dev/item",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/products/item?slug=en%2Fstage%2Fproducts%2Fdev%2Fitem",
			locale: "en",
		});
	});

	it("should handle empty slug", async () => {
		const request = createMockRequest("http://localhost:3000/api/draft?slug=");

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/?slug=",
			locale: "de",
		});
	});

	it("should handle slug with quotes", async () => {
		const request = createMockRequest(
			'http://localhost:3000/api/draft?slug="en/dev/prices"',
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=%22en%2Fdev%2Fprices%22",
			locale: "en",
		});
	});

	it("should handle slug with leading slash", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=/en/dev/prices",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=%2Fen%2Fdev%2Fprices",
			locale: "en",
		});
	});

	it("should use locale parameter when slug doesn't contain locale", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=dev/prices&locale=en",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=dev%2Fprices&locale=en",
			locale: "en",
		});
	});

	it("should prioritize locale from slug over locale parameter", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=de/dev/prices&locale=en",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/prices?slug=de%2Fdev%2Fprices&locale=en",
			locale: "de", // extracted from slug, not from parameter
		});
	});

	it("should handle invalid locale in slug", async () => {
		const request = createMockRequest(
			"http://localhost:3000/api/draft?slug=fr/dev/prices",
		);

		await GET(request);

		expect(mockRedirect).toHaveBeenCalledWith({
			href: "/fr/prices?slug=fr%2Fdev%2Fprices",
			locale: "de", // default locale since 'fr' is not valid
		});
	});
});
