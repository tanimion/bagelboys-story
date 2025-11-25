// Mock for next-intl/server
export const getTranslations = jest.fn(() => Promise.resolve((key) => key));
export const getLocale = jest.fn(() => Promise.resolve("en"));
export const getMessages = jest.fn(() => Promise.resolve({}));
export const getTimeZone = jest.fn(() => Promise.resolve("UTC"));
export const getNow = jest.fn(() => Promise.resolve(new Date()));
export const getFormatter = jest.fn(() =>
	Promise.resolve({
		dateTime: jest.fn(),
		number: jest.fn(),
		relativeTime: jest.fn(),
	}),
);
