import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { StoryblokProvider } from "@/components/storyblokProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { i18n, type Locale } from "@/i18n/i18n-config";
import { getStory } from "@/lib/fetchers/storyblok-fetcher";
import "../globals.css";

// Ensure `dynamic` is imported from `next/dynamic`
import dynamic from "next/dynamic"; 

// Dynamically import the Header and Footer components
const Header = dynamic(() => import("@/components/section/Header"));
const Footer = dynamic(() => import("@/components/section/Footer"));

export const revalidate = 300; // 5 minutes

export const metadata = {
  title: "YOUR PROJECT",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export default async function PageLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ lang: Locale }> }>) {
  const { lang } = await params;
  setRequestLocale(lang);

  const envPrefix = process.env.CURRENT_ENV as "dev" | "stage" | "prod";

  const global_story = await getStory(envPrefix, "global", lang);
  const globalStory = global_story?.content;

  return (
    <html lang={lang}>
      <body>
        <NextIntlClientProvider>
          <StoryblokProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <main>
                <Header
                  burger_menu={globalStory?.burger_menu}
                  header_logo={globalStory?.header_logo}
                />
                {children}
                <Footer blok={globalStory?.footer} />
              </main>
            </ThemeProvider>
          </StoryblokProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
