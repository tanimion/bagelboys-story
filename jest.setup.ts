// jest.setup.ts
/** biome-ignore-all lint/suspicious/noExplicitAny: false-positive */
import "@testing-library/jest-dom";
import { URL, URLSearchParams } from "node:url";

// Polyfill timer functions for Jest environment
global.setTimeout = global.setTimeout || setTimeout;
global.clearTimeout = global.clearTimeout || clearTimeout;
global.setInterval = global.setInterval || setInterval;
global.clearInterval = global.clearInterval || clearInterval;

// Polyfill Web APIs for Next.js API routes testing
Object.defineProperty(global, "Request", {
	value: class Request {
		constructor(
			public url: string,
			public init?: RequestInit,
		) {}
	},
	writable: true,
});

Object.defineProperty(global, "Response", {
	value: class Response {
		constructor(
			public body?: unknown,
			public init?: ResponseInit,
		) {}
		static redirect(url: string, status?: number) {
			return new Response(null, {
				status: status || 302,
				headers: { Location: url },
			});
		}
	},
	writable: true,
});

// Use Node.js URL implementation for better compatibility
Object.defineProperty(global, "URL", {
	value: URL,
	writable: true,
});

Object.defineProperty(global, "URLSearchParams", {
	value: URLSearchParams,
	writable: true,
});

// Also ensure they're available on window object
Object.defineProperty(window, "setTimeout", {
	value: global.setTimeout,
	writable: true,
});
Object.defineProperty(window, "clearTimeout", {
	value: global.clearTimeout,
	writable: true,
});
Object.defineProperty(window, "setInterval", {
	value: global.setInterval,
	writable: true,
});
Object.defineProperty(window, "clearInterval", {
	value: global.clearInterval,
	writable: true,
});

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
	observe() {
		return null;
	}
	disconnect() {
		return null;
	}
	unobserve() {
		return null;
	}
};

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
	writable: true,
	value: jest.fn().mockImplementation((query: string) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

// Mock sessionStorage
const sessionStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
Object.defineProperty(window, "sessionStorage", {
	value: sessionStorageMock,
});

// Mock localStorage
const localStorageMock = {
	getItem: jest.fn(),
	setItem: jest.fn(),
	removeItem: jest.fn(),
	clear: jest.fn(),
};
Object.defineProperty(window, "localStorage", {
	value: localStorageMock,
});

// Suppress React DOM warnings in tests but allow important errors
const originalError = console.error;

// Store the original console.error for tests that need to mock it
(global as any).__originalConsoleError = originalError;

beforeAll(() => {
	console.error = (...args) => {
		if (
			typeof args[0] === "string" &&
			(args[0].includes("React does not recognize") ||
				args[0].includes("Invalid DOM property") ||
				args[0].includes("Unknown event handler property") ||
				args[0].includes("Received `") ||
				args[0].includes("for a non-boolean attribute") ||
				args[0].includes(
					'An empty string ("") was passed to the src attribute',
				) ||
				args[0].includes("In HTML, <html> cannot be a child of <div>") ||
				(args[0].includes("An update to") &&
					args[0].includes("inside a test was not wrapped in act")))
		) {
			return;
		}
		// Allow all other error messages including "Route Error:" to pass through
		originalError.call(console, ...args);
	};
});

afterAll(() => {
	console.error = originalError;
});
