// Mock for next-intl
import React from "react";

export const useTranslations = jest.fn(() => (key) => key);
export const useLocale = jest.fn(() => "en");
export const useMessages = jest.fn(() => ({}));
export const useTimeZone = jest.fn(() => "UTC");
export const useNow = jest.fn(() => new Date());
export const useFormatter = jest.fn(() => ({
	dateTime: jest.fn(),
	number: jest.fn(),
	relativeTime: jest.fn(),
}));

export const NextIntlClientProvider = ({ children }) => {
	return React.createElement("div", {}, children);
};
