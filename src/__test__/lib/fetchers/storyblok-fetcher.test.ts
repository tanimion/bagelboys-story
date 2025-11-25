// Mock environment variables first
const originalEnv = process.env;

// Mock the storyblok API
const mockGetStory = jest.fn();
jest.mock("@/lib/storyblok", () => ({
	getStoryblokApi: jest.fn(() => ({
		getStory: mockGetStory,
	})),
}));

// Mock next/headers
jest.mock("next/headers", () => ({
	draftMode: jest.fn(),
}));

import { draftMode } from "next/headers";
import type { Locale } from "next-intl";
import { fetchSBData, getStory } from "@/lib/fetchers/storyblok-fetcher";
import { getStoryblokApi } from "@/lib/storyblok";

const mockDraftMode = draftMode as jest.MockedFunction<typeof draftMode>;
const mockGetStoryblokApi = getStoryblokApi as jest.MockedFunction<
	typeof getStoryblokApi
>;

describe("storyblok-fetcher", () => {
	beforeEach(() => {
		jest.resetAllMocks();
		// Reset environment variables
		process.env = {
			...originalEnv,
			NODE_ENV: "production",
		};

		// Default mock implementations
		mockDraftMode.mockResolvedValue({ isEnabled: false });
		mockGetStoryblokApi.mockReturnValue({
			getStory: mockGetStory,
		});
	});

	afterAll(() => {
		process.env = originalEnv;
	});

	const mockStoryResponse = {
		data: {
			story: {
				content: {
					_uid: "story-123",
					component: "page",
					title: "Test Story",
					body: [],
				},
				id: 123,
				uuid: "test-uuid",
				slug: "test-story",
				name: "Test Story",
				created_at: "2023-01-01T00:00:00.000Z",
				published_at: "2023-01-01T00:00:00.000Z",
				alternates: [],
				default_full_slug: "test-story",
				sort_by_date: null,
				tag_list: [],
				is_startpage: false,
				parent_id: null,
				meta_data: null,
				group_id: "test-group",
				first_published_at: "2023-01-01T00:00:00.000Z",
				release_id: null,
				lang: "default",
				path: null,
				translated_slugs: null,
			},
		},
	};

	describe("fetchSBData", () => {
		describe("successful story retrieval", () => {
			it("should fetch story with default parameters", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				const result = await fetchSBData("dev", "test-story");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					{
						version: "published",
						language: "de",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-dev/test-story-lang-de"],
						},
					},
				);
				expect(result).toBe(mockStoryResponse.data.story);
			});

			it("should fetch story with specified language", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				const result = await fetchSBData("stage", "test-story", "en");

				expect(mockGetStory).toHaveBeenCalledWith(
					"stage/test-story",
					{
						version: "published",
						language: "en",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-stage/test-story-lang-en"],
						},
					},
				);
				expect(result).toBe(mockStoryResponse.data.story);
			});

			it("should work with different environment prefixes", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("prod", "startpage", "de");

				expect(mockGetStory).toHaveBeenCalledWith(
					"prod/startpage",
					{
						version: "published",
						language: "de",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-prod/startpage-lang-de"],
						},
					},
				);
			});
		});

		describe("draft mode handling", () => {
			it("should use draft version when in development", async () => {
				process.env.NODE_ENV = "development";
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					{
						version: "draft",
						language: "de",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-dev/test-story-lang-de"],
						},
					},
				);
			});

			it("should use draft version when draft mode is enabled", async () => {
				process.env.NODE_ENV = "production";
				mockDraftMode.mockResolvedValue({ isEnabled: true });
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					{
						version: "draft",
						language: "de",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-dev/test-story-lang-de"],
						},
					},
				);
			});

			it("should use published version in production when draft mode is disabled", async () => {
				process.env.NODE_ENV = "production";
				mockDraftMode.mockResolvedValue({ isEnabled: false });
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("prod", "test-story");

				expect(mockGetStory).toHaveBeenCalledWith(
					"prod/test-story",
					{
						version: "published",
						language: "de",
					},
					{
						next: {
							revalidate: 300,
							tags: ["story-prod/test-story-lang-de"],
						},
					},
				);
			});
		});

		describe("language handling", () => {
			it("should convert language to lowercase", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story", "EN");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					expect.objectContaining({
						language: "en",
					}),
					expect.any(Object),
				);
			});

			it("should handle undefined language gracefully", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story", undefined);

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					expect.objectContaining({
						language: "de", // Should use default locale
					}),
					expect.any(Object),
				);
			});

			it("should handle null language gracefully", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story", null as unknown as Locale);

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/test-story",
					expect.objectContaining({
						language: undefined, // null?.toLowerCase() returns undefined
					}),
					expect.any(Object),
				);
			});
		});

		describe("caching configuration", () => {
			it("should set correct cache tags for different environments and languages", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("stage", "about-us", "en");

				expect(mockGetStory).toHaveBeenCalledWith(
					"stage/about-us",
					expect.any(Object),
					{
						next: {
							revalidate: 300,
							tags: ["story-stage/about-us-lang-en"],
						},
					},
				);
			});

			it("should set 5-minute revalidation time", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "test-story");

				expect(mockGetStory).toHaveBeenCalledWith(
					expect.any(String),
					expect.any(Object),
					{
						next: {
							revalidate: 300, // 5 minutes
							tags: expect.any(Array),
						},
					},
				);
			});
		});

		describe("error handling", () => {
			it("should handle API errors gracefully", async () => {
				const apiError = new Error("Storyblok API error");
				mockGetStory.mockRejectedValue(apiError);

				await expect(fetchSBData("dev", "test-story")).rejects.toThrow(
					"Storyblok API error",
				);
			});

			it("should handle null API response", async () => {
				mockGetStory.mockResolvedValue(null);

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});

			it("should handle response without data", async () => {
				mockGetStory.mockResolvedValue({});

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});

			it("should handle response with null data", async () => {
				mockGetStory.mockResolvedValue({ data: null });

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});

			it("should handle response with data but no story", async () => {
				mockGetStory.mockResolvedValue({ data: {} });

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});

			it("should handle missing storyblok API", async () => {
				mockGetStoryblokApi.mockReturnValue(null);

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});

			it("should handle undefined storyblok API", async () => {
				mockGetStoryblokApi.mockReturnValue(undefined);

				const result = await fetchSBData("dev", "test-story");

				expect(result).toBeUndefined();
			});
		});

		describe("route construction", () => {
			it("should construct route correctly with different slugs", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "complex/nested/slug");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/complex/nested/slug",
					expect.any(Object),
					expect.any(Object),
				);
			});

			it("should handle empty slug", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/",
					expect.any(Object),
					expect.any(Object),
				);
			});

			it("should handle slug with special characters", async () => {
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await fetchSBData("dev", "story-with-dashes_and_underscores");

				expect(mockGetStory).toHaveBeenCalledWith(
					"dev/story-with-dashes_and_underscores",
					expect.any(Object),
					expect.any(Object),
				);
			});
		});

		describe("draft mode edge cases", () => {
			it("should handle draft mode promise rejection", async () => {
				mockDraftMode.mockRejectedValue(new Error("Draft mode error"));
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await expect(fetchSBData("dev", "test-story")).rejects.toThrow(
					"Draft mode error",
				);
			});

			it("should handle draft mode returning invalid data", async () => {
				mockDraftMode.mockResolvedValue(null as unknown);
				mockGetStory.mockResolvedValue(mockStoryResponse);

				await expect(fetchSBData("dev", "test-story")).rejects.toThrow();
			});
		});
	});

	describe("getStory alias", () => {
		it("should be an alias for fetchSBData", () => {
			expect(getStory).toBe(fetchSBData);
		});

		it("should work the same as fetchSBData", async () => {
			mockGetStory.mockResolvedValue(mockStoryResponse);

			const result = await getStory("dev", "test-story", "en");

			expect(mockGetStory).toHaveBeenCalledWith(
				"dev/test-story",
				{
					version: "published",
					language: "en",
				},
				{
					next: {
						revalidate: 300,
						tags: ["story-dev/test-story-lang-en"],
					},
				},
			);
			expect(result).toBe(mockStoryResponse.data.story);
		});
	});

	describe("integration scenarios", () => {
		it("should handle complete workflow in development", async () => {
			process.env.NODE_ENV = "development";
			mockDraftMode.mockResolvedValue({ isEnabled: false });
			mockGetStory.mockResolvedValue(mockStoryResponse);

			const result = await fetchSBData("dev", "startpage", "de");

			expect(mockDraftMode).toHaveBeenCalled();
			expect(mockGetStoryblokApi).toHaveBeenCalled();
			expect(mockGetStory).toHaveBeenCalledWith(
				"dev/startpage",
				{
					version: "draft", // Should be draft in development
					language: "de",
				},
				{
					next: {
						revalidate: 300,
						tags: ["story-dev/startpage-lang-de"],
					},
				},
			);
			expect(result).toBe(mockStoryResponse.data.story);
		});

		it("should handle complete workflow in production with draft enabled", async () => {
			process.env.NODE_ENV = "production";
			mockDraftMode.mockResolvedValue({ isEnabled: true });
			mockGetStory.mockResolvedValue(mockStoryResponse);

			const result = await fetchSBData("prod", "about", "en");

			expect(mockDraftMode).toHaveBeenCalled();
			expect(mockGetStoryblokApi).toHaveBeenCalled();
			expect(mockGetStory).toHaveBeenCalledWith(
				"prod/about",
				{
					version: "draft", // Should be draft when enabled
					language: "en",
				},
				{
					next: {
						revalidate: 300,
						tags: ["story-prod/about-lang-en"],
					},
				},
			);
			expect(result).toBe(mockStoryResponse.data.story);
		});

		it("should handle complete workflow in production with draft disabled", async () => {
			process.env.NODE_ENV = "production";
			mockDraftMode.mockResolvedValue({ isEnabled: false });
			mockGetStory.mockResolvedValue(mockStoryResponse);

			const result = await fetchSBData("prod", "contact", "de");

			expect(mockDraftMode).toHaveBeenCalled();
			expect(mockGetStoryblokApi).toHaveBeenCalled();
			expect(mockGetStory).toHaveBeenCalledWith(
				"prod/contact",
				{
					version: "published", // Should be published in production
					language: "de",
				},
				{
					next: {
						revalidate: 300,
						tags: ["story-prod/contact-lang-de"],
					},
				},
			);
			expect(result).toBe(mockStoryResponse.data.story);
		});
	});
});
