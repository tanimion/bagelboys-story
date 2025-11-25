// Mock for next-intl/navigation
import React from "react";

export const useRouter = jest.fn(() => ({
	push: jest.fn(),
	replace: jest.fn(),
	back: jest.fn(),
	forward: jest.fn(),
	refresh: jest.fn(),
	prefetch: jest.fn(),
}));

export const usePathname = jest.fn(() => "/");
export const redirect = jest.fn();
export const permanentRedirect = jest.fn();
export const Link = ({ children, href, ...props }) => {
	return React.createElement("a", { href, ...props }, children);
};

export const createNavigation = jest.fn(() => ({
	Link,
	redirect,
	usePathname,
	useRouter,
}));
