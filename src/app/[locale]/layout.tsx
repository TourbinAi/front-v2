import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";
import path from "path";

import { locales } from "@/i18n/config";
import { Toaster } from "@/components/ui/sonner";

const sans = localFont({
  src: [
    {
      path: "../../../public/assets/fonts/IRANSansX-Thin.woff",
      weight: "100",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-UltraLight.woff",
      weight: "200",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Light.woff",
      weight: "300",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Regular.woff",
      weight: "400",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Medium.woff",
      weight: "500",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-DemiBold.woff",
      weight: "600",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Bold.woff",
      weight: "700",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-ExtraBold.woff",
      weight: "800",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-Black.woff",
      weight: "900",
    },
    {
      path: "../../../public/assets/fonts/IRANSansX-ExtraBlack.woff",
      weight: "1000",
    },
  ],
  variable: "--font-ir-sans",
});

type Props = {
  children: React.ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations("localeLayout");

  return {
    title: t("title"),
  };
}

export default async function RootLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html
      lang={locale}
      className={`${sans.variable} font-sans`}
      dir={locale === "fa" ? "rtl" : "ltr"}
    >
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="h-full">{children}</div>
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
