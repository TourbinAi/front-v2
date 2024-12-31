import { notFound } from "next/navigation"
import { LocalePrefix, Pathnames } from "next-intl/routing"
import { getRequestConfig } from "next-intl/server"

export const locales = ["en", "fa"] as const
export const defaultLocale = "fa"

export const pathnames: Pathnames<typeof locales> = {
  "/": "/",
  "/pathnames": {
    en: "/pathnames",
    fa: "/masir",
  },
}

const localePrefix: LocalePrefix<typeof locales> = "always"
