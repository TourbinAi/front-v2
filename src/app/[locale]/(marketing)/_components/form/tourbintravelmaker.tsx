"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import arrowY from "public/assets/icons/Polygon 1.png";
import Image from "next/image";

export const Tourbintravelmaker = () => {
  const t = useTranslations("landingPage.featureDetails.travelMaker");

  return (
    <div className="flex flex-col gap-2">
      <Button
        href="/travelMaker"
        className="hidden w-full justify-between p-7 text-white lg:flex"
      >
        {t("fillTheForm")}
        <Image src={arrowY} alt={""} />
      </Button>
    </div>
  );
};
