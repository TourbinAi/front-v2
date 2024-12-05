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
    <main className="size-full flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl font-semibold">{t("title")}</h1>
      {t.rich("description", {
        p: (chunks) => <p className="mt-4 text-2xl">{chunks}</p>,
        retry: (chunks) => (
          <Button
            variant="link"
            className="text-2xl px-0"
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
