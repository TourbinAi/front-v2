"use client";

import * as Sentry from "@sentry/nextjs";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

type Props = {
  error: Error;
  reset(): void;
};

export default function Error({ error, reset }: Props) {
  const t = useTranslations("Error");

  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <main className="flex size-full flex-col items-center justify-center gap-2">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      {t.rich("description", {
        p: (chunks) => <p className="mt-4 text-2xl">{chunks}</p>,
        retry: (chunks) => (
          <Button
            variant="link"
            className="px-0 text-2xl"
            onClick={reset}
            type="button"
          >
            {chunks}
          </Button>
        ),
      })}
    </main>
  );
}
