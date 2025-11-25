"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import { useEffect, useRef, useTransition } from "react";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./select";

interface LanguageSwitcherProps {
	className?: string;
}

const languages = i18n.locales.map((locale) => locale.toUpperCase());

const LanguageSwitcher = ({ className }: LanguageSwitcherProps) => {
	const params = useParams();
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();
	const [isPending, startTransition] = useTransition();

	const currentLanguage = useLocale().toUpperCase() as Locale;
	const paramsObject = Object.fromEntries(searchParams.entries());

	const containerRef = useRef<HTMLDivElement>(null);
	const langRefs = useRef<(HTMLButtonElement | null)[]>([]);

	const orderedLanguages = [
		currentLanguage,
		...languages.filter((l) => l !== currentLanguage),
	];

	useEffect(() => {
		langRefs.current = langRefs.current.slice(0, orderedLanguages.length);
	}, [orderedLanguages.length]);

	/* ---------- locale change ---------- */
	const handleLocaleChange = (newLocale: Locale) => {
		if (newLocale.toLowerCase() === params.lang) {
			return;
		}

		startTransition(() => {
			router.replace({ pathname, query: paramsObject }, { locale: newLocale });
		});
	};

	return (
		<div ref={containerRef} className={cn("relative inline-flex", className)}>
			<Select
				aria-label="Select Language"
				value={currentLanguage}
				onValueChange={(value) =>
					handleLocaleChange(value.toLowerCase() as Locale)
				}
			>
				<SelectTrigger className="w-[180px]">
					<SelectValue placeholder="Select a language" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Choose your language</SelectLabel>
						{orderedLanguages.map((lang) => (
							<SelectItem key={lang} value={lang}>
								{lang}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>

			{/* Screen reader announcements */}
			<div aria-live="polite" aria-atomic="true" className="sr-only">
				{isPending && "Switching language..."}
			</div>
		</div>
	);
};

export default LanguageSwitcher;
