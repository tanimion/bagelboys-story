import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

declare global {
	interface Window {
		grecaptcha: {
			execute: (
				siteKey: string,
				options?: { action: string },
			) => Promise<string>;
		};
		Autoblocker: {
			consent: Record<string, { name: string; consent: boolean }>;
		};
	}
}

const getConcent = async () => {
	const ucData = window.Autoblocker.consent;
	if (ucData) {
		const consentEntry = Object.entries(ucData ?? {}).find(
			([, value]) =>
				(value as { name: string; consent: boolean }).name === "reCAPTCHA",
		);
		return consentEntry ? consentEntry[1] : undefined;
	}
	return undefined;
};

export async function onReCaptchaVerify(): Promise<string> {
	const getConcentData = await getConcent();

	if (!getConcentData?.consent) {
		console.error("reCAPTCHA consent not granted");
		return "";
	}
	if (!window.grecaptcha) {
		console.error("reCAPTCHA not loaded");
		return "";
	}
	if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
		console.error("ReCAPTCHA site key is missing");
		return "";
	}

	try {
		const token = await window.grecaptcha.execute(
			process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
			{
				action: "contact_form",
			},
		);
		return token;
	} catch (error) {
		console.error("reCAPTCHA execute error:", error);
		return "";
	}
}

// Response type for the identity token endpoint
type IdentityTokenResponse = {
	access_token: string;
	token_type: string;
	expires_in: number;
	scope?: string;
	refresh_token?: string;
	ip_address?: string;
};

// Response type for the mail service (adjust based on actual API response)
type MailServiceResponse = {
	Errors: {
		IsValid: boolean;
		Errors: object;
		RuleSetsExecuted: string[] | null;
	};
	ErrorMessages?: string[];
	StatusCode: number;
	RequestUri: null;
	ExternalError: null;
	HttpStatusCode: number;
};

// Params type for sending email
type SendClientEmailParams = {
	Purpose: "";
	Language: "de-DE";
	DataContext: {
		FIRMA_NAME: string;
		RESTURANT_NAME: string;
		USER_NAME: string;
		NAME: string;
		EMAIL: string;
		TELEFON: string;
		CONTACT_PREFERENCE: string;
		PRIVACY: string;
		TERMS: string;
		DATENSCHUTZ_VERSION: string;
		GTC_VERSION: string;
	};
};

type SendConfirmationEmailParams = {
	Purpose: "";
	Language: "de-DE" | "en-US";
	DataContext: {
		First_Name: string;
	};
};

type SendEmailParams = (SendClientEmailParams | SendConfirmationEmailParams) & {
	access_token: string;
	to: string[];
};

// Utility function to get identity token
export const getBlocksIdentityToken = async (): Promise<{
	success: boolean;
	access_token?: string;
	errorMessage?: string;
}> => {
	const url = `${process.env.NEXT_PUBLIC_BLOCKS_BASE_URL}/identity/${process.env.BLOCKS_IDENTITY_VERSION}/identity/token`;

	const params = new URLSearchParams({
		grant_type: "client_credentials",
		client_id: process.env.BLOCKS_IDENTITY_CLIENT_ID ?? "",
		client_secret: process.env.BLOCKS_IDENTITY_CLIENT_SECRET ?? "",
	});

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
				Origin: process.env.BLOCKS_IDENTITY_ORIGIN ?? "",
			},
			body: params,
		});

		if (!response.ok) {
			const errorText = await response.text();
			return {
				success: false,
				errorMessage: `Request failed with status ${response.status}: ${errorText}`,
			};
		}

		const data = (await response.json()) as IdentityTokenResponse;

		if (!data?.access_token) {
			return {
				success: false,
				errorMessage: "Access token not found in response",
			};
		}

		return {
			success: true,
			access_token: data.access_token,
		};
	} catch (e) {
		return {
			success: false,
			errorMessage:
				e instanceof Error ? e.message : "An unknown error occurred",
		};
	}
};

// Utility function to send email
export const sendBlocksEmailService = async ({
	access_token,
	to,
	DataContext,
	Purpose,
	Language = "de-DE",
}: SendEmailParams): Promise<{ success: boolean; errorMessage?: string }> => {
	const url = `${process.env.NEXT_PUBLIC_BLOCKS_BASE_URL}/mailservice/${process.env.BLOCKS_EMAIL_VERSION}/MailService/MailCommand/EnqueueMail`;

	const payload = {
		To: to,
		Cc: [],
		Bcc: [],
		DataContext: { ...DataContext },
		Purpose,
		Language,
	};

	try {
		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Origin: process.env.BLOCKS_IDENTITY_ORIGIN ?? "",
				Authorization: `Bearer ${access_token}`,
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const errorText = await response.text();
			return {
				success: false,
				errorMessage: `Request failed with status ${response.status}: ${errorText}`,
			};
		}

		const data = (await response.json()) as MailServiceResponse;

		if (data?.Errors?.IsValid === false) {
			return {
				success: false,
				errorMessage: data?.ErrorMessages?.join(", ") ?? "Validation failed",
			};
		}

		return { success: true };
	} catch (e) {
		return {
			success: false,
			errorMessage: e instanceof Error ? e.message : "Failed to send email",
		};
	}
};

// Recaptcha Verify
interface CaptchaResponse {
	success: boolean;
	challenge_ts: string;
	hostname: string;
	score?: number;
	action?: string;
	error_codes?: string[];
}
export const recaptchaVarify = async (
	token: string,
	remoteip: string,
): Promise<boolean> => {
	try {
		const recaptchaUrl = new URL(process.env.RECAPTCHA_VERIFY_URL ?? "");
		recaptchaUrl.searchParams.append(
			"secret",
			process.env.RECAPTCHA_SECRET_KEY ?? "",
		);
		recaptchaUrl.searchParams.append("response", token);
		recaptchaUrl.searchParams.append("remoteip", remoteip);

		const response = await fetch(recaptchaUrl.toString(), {
			method: "POST",
			headers: {
				"Content-Type": "application/x-www-form-urlencoded",
			},
		});

		if (!response.ok) {
			console.error(
				"Recaptcha request failed:",
				response.status,
				await response.text(),
			);
			return false;
		}

		const data = (await response.json()) as CaptchaResponse;

		return data.success === true;
	} catch (error) {
		console.error("Recaptcha verification failed:", error);
		return false;
	}
};

export const isVideoFile = (filename: string): boolean => {
	return /\.(mp4|webm|mov|avi|mkv|flv|wmv|mpeg)$/i.test(filename);
};

export const isImageFile = (filename: string): boolean => {
	return /\.(jpg|jpeg|png|gif|bmp|webp|tiff|svg)$/i.test(filename);
};
