"use server";

import { headers } from "next/headers";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { fetchSBData } from "@/lib/fetchers/storyblok-fetcher";
import {
	getBlocksIdentityToken,
	recaptchaVarify,
	sendBlocksEmailService,
} from "@/lib/utils";

interface ContactFormResponse {
	status: string;
	status_code: number;
	message: string;
}

export async function contactFormAction(
	data: FormData,
	token: string | undefined,
	lang: Locale = i18n.defaultLocale as Locale,
): Promise<ContactFormResponse> {
	// Get current origin
	const headersList = await headers();

	//  API call
	if (token) {
		const recaptchaData = await recaptchaVarify(
			token,
			headersList.get("x-forwarded-for") ?? "",
		);

		if (!recaptchaData) {
			return {
				status: "failure",
				status_code: 400,
				message: "Recaptcha verification failed.",
			};
		}

		const identityToken = await getBlocksIdentityToken();
		if (!identityToken.success || !identityToken.access_token) {
			return {
				status: "failure",
				status_code: 500,
				message: "Failed to retrieve identity token.",
			};
		}

		const envPrefix = process.env.CURRENT_ENV as "stage" | "prod" | "dev";
		const storyDatenschutz = await fetchSBData(envPrefix, "datenschutz", lang);
		const storyGtc = await fetchSBData(envPrefix, "agb", lang);

		const sendEmail = await sendBlocksEmailService({
			access_token: identityToken.access_token,
			to: process.env.CONTACT_FORM_EMAILS?.split(",") ?? [],
			Purpose: "",
			Language: "de-DE",
			DataContext: {
				FIRMA_NAME: data.get("firmenname")?.toString() ?? "",
				RESTURANT_NAME: data.get("restaurant")?.toString() ?? "",
				USER_NAME: data.get("vorname")?.toString() ?? "",
				NAME: data.get("name")?.toString() ?? "",
				EMAIL: data.get("email")?.toString() ?? "",
				TELEFON: data.get("telefon")?.toString() ?? "",
				CONTACT_PREFERENCE:
					data.get("contact_preference")?.toString() === "contact"
						? "Ich möchte kontaktiert werden"
						: "Ich möchte nicht kontaktiert werden.",
				PRIVACY: data.get("privacy")?.toString() ?? "false",
				TERMS: data.get("terms")?.toString() ?? "false",
				DATENSCHUTZ_VERSION:
					storyDatenschutz.content.body[2].items.at(-1)?.version_number ??
					"1.0.0",
				GTC_VERSION:
					storyGtc.content.body[2].items.at(-1)?.version_number ?? "1.0.0",
			},
		});
		const confirmationEmailResult = await sendBlocksEmailService({
			access_token: identityToken.access_token,
			to: [data.get("email")?.toString() ?? ""],
			Purpose: "",
			Language: lang.toLowerCase() === "de" ? "de-DE" : "en-US",
			DataContext: {
				First_Name: data.get("vorname")?.toString() ?? "",
			},
		});

		if (sendEmail.success && confirmationEmailResult.success) {
			return {
				status: "success",
				status_code: 200,
				message: "Your message has been sent successfully.",
			};
		} else {
			return {
				status: "failure",
				status_code: 500,
				message: sendEmail.errorMessage ?? "Failed to send email.",
			};
		}
	}

	return {
		status: "failure",
		status_code: 500,
		message: "An unexpected error occurred.",
	};
}
