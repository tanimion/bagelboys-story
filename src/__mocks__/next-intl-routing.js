// Mock for next-intl/routing
import React from "react";

export const routing = {
	locales: ["en", "de"],
	defaultLocale: "en",
};

export const defineRouting = jest.fn(() => routing);

export const createLocalizedPathnamesNavigation = jest.fn(() => ({
	Link: ({ children, href, ...props }) =>
		React.createElement("a", { href, ...props }, children),
	redirect: jest.fn(),
	usePathname: jest.fn(() => "/"),
	useRouter: jest.fn(() => ({
		push: jest.fn(),
		replace: jest.fn(),
		back: jest.fn(),
		forward: jest.fn(),
		refresh: jest.fn(),
		prefetch: jest.fn(),
	})),
}));
