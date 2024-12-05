import { Pathnames, LocalePrefix } from "next-intl/routing";
import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

export const defaultLocale = "fa" as const;
export const locales = ["en", "fa"] as const;

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fa: "/masir",
  },
};

export const localePrefix: LocalePrefix<typeof locales> = "always";

export const port = process.env.PORT || 3000;
export const host = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : `http://localhost:${port}`;

export default getRequestConfig(async ({ locale }: { locale: string }) => {
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    messages: (
      await (locale === "en"
        ? // When using Turbopack, this will enable HMR for `en`
          import("../../messages/en.json")
        : import(`../../messages/${locale}.json`))
    ).default,
    timeZone: "Europe/Prague",
  };
});
