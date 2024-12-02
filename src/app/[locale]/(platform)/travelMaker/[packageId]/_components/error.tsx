"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RefreshCw, TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/dist/client/components/navigation";

const ErrorMessage = () => {
  const t = useTranslations("travelMaker.package");

  const router = useRouter();

  return (
    <div className="flex size-full items-center justify-center">
      <Card className="max-w-96">
        <CardHeader className="flex w-full flex-col items-center justify-center">
          <CardTitle className="flex pb-2">
            <TriangleAlert className="size-10 text-destructive" />
            <span className="">{t("error")} </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex size-full flex-col items-center justify-center">
          <Button
            className="flex lg:hidden"
            variant="outline"
            onClick={() => router.refresh()}
          >
            <RefreshCw />
            {t("tryAgain")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ErrorMessage;
