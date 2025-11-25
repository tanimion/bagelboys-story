import { z } from "zod";

export const contactFormSchema = z.object({
	firmenname: z.string().min(1, "Bitte firmenname angeben"),
	restaurant: z.string().optional(),
	vorname: z.string().min(1, "Bitte vorname angeben"),
	name: z.string().min(1, "Bitte name angeben"),
	email: z
		.string()
		.email("Bitte eine gültige E-Mail-Adresse angeben")
		.min(1, "Bitte E-Mail angeben"),
	telefon: z.string().optional(),
	contact_preference: z.enum(["contact", "no_contact"], {
		required_error: "Bitte eine Kontaktpräferenz auswählen",
	}),
	privacy: z.boolean().refine((val) => val === true, {
		message: "Bitte die Datenschutzerklärung akzeptieren",
	}),
	terms: z.boolean().refine((val) => val === true, {
		message: "Bitte die AGBs akzeptieren",
	}),
});

export type ContactFormSchema = z.infer<typeof contactFormSchema>;
export const requiredFields = Object.entries(contactFormSchema.shape)
	.filter(([, schema]) => !schema.isOptional())
	.map(([key]) => key);
export const contactFormDefaultValues: Partial<ContactFormSchema> = {
	firmenname: "",
	restaurant: "",
	vorname: "",
	name: "",
	email: "",
	telefon: "",
	contact_preference: undefined,
	privacy: false,
	terms: false,
};
