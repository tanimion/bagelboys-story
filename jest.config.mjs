// jest.config.mjs
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
	dir: "./",
});

const customJestConfig = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	testEnvironment: "jest-environment-jsdom",
	testTimeout: 30000,
	moduleDirectories: ["node_modules", "<rootDir>/"],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"^next-intl/navigation$": "<rootDir>/src/__mocks__/next-intl-navigation.js",
		"^next-intl/routing$": "<rootDir>/src/__mocks__/next-intl-routing.js",
		"^next-intl/server$": "<rootDir>/src/__mocks__/next-intl-server.js",
		"^next-intl/middleware$": "<rootDir>/src/__mocks__/next-intl-middleware.js",
		"^next-intl$": "<rootDir>/src/__mocks__/next-intl.js",
		"^swiper/css$": "identity-obj-proxy",
		"^swiper/css/(.*)$": "identity-obj-proxy",
	},
	testMatch: ["**/*.(test|spec).(ts|tsx)"],
	collectCoverage: true,
	collectCoverageFrom: [
		"src/app/**/*.{ts,tsx}",
		"src/components/**/*.{ts,tsx}",
		"src/lib/**/*.{ts,tsx}",
		"!**/*.d.ts",
		"!**/node_modules/**",
	],
	// If coverage drops below 80%, the push will fail.
	// coverageThreshold: {
	//   global: {
	//     branches: 80,
	//     functions: 80,
	//     lines: 80,
	//     statements: 80,
	//   },
	// },
	// 👇 add this to transform ESM-only packages
	transformIgnorePatterns: [
		"node_modules/(?!(next-intl|@storyblok/react|use-intl|swiper|dom7|ssr-window)/)",
	],
	coverageDirectory: "coverage",
};

export default createJestConfig(customJestConfig);
