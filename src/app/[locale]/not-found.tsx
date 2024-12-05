import { useTranslations } from "next-intl";

export default function NotFoundPage() {
  const t = useTranslations("notFoundPage");

  return (
    <main className="flex size-full flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-semibold">{t("title")}</h1>
      <p className="max-w-[460px] text-3xl">{t("destination")}</p>
    </main>
  );
}
