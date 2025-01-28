import "@/styles/globals.css"

import { Metadata } from "next"
import { notFound } from "next/navigation"
import posthog from "posthog-js"

import { LayoutProps } from "@/types/next"

import { fontSans } from "@/lib/fonts"
import { setupLibraries } from "@/lib/general-helpers"
import { locales } from "@/lib/i18n"
import { cn } from "@/lib/styles"
import { TailwindIndicator } from "@/components/elementary/TailwindIndicator"
import { AnalyticsProvider } from "@/components/providers/AnalyticsProvider"
import { ClientProviders } from "@/components/providers/ClientProviders"
import { ServerProviders } from "@/components/providers/ServerProviders"
import { Toaster } from "@/components/ui/sonner"

setupLibraries()

export async function generateMetadata({
  params,
}: LayoutProps): Promise<Metadata> {
  const messages = (await import(`@/../../locales/${params.locale}.json`))
    .default
  const metadata = messages.metadata

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    themeColor: metadata.themeColor,
    icons: {
      icon: metadata.logo,
    },
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      images: [metadata.ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.title,
      description: metadata.description,
      images: [metadata.ogImage],
    },
  }
}

export default async function RootLayout({ children, params }: LayoutProps) {
  if (!locales.includes(params.locale)) {
    notFound()
  }
  
  return (
    <html
      lang={params.locale}
      className={`${fontSans.variable} font-sans`}
      dir={params.locale === "fa" ? "rtl" : "ltr"}
      suppressHydrationWarning
    >
      <AnalyticsProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ServerProviders params={params}>
            <ClientProviders>
              {children}
              <TailwindIndicator />
              <Toaster />
            </ClientProviders>
          </ServerProviders>
        </body>
      </AnalyticsProvider>
    </html>
  )
}
