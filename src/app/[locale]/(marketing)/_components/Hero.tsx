"use client";

import { primaryFeatures } from "@/constants";
import Image from "next/image";
import BeachImage from "public/assets/images/beachSunSet.png";
import faLogo from "public/assets/icons/Tourbin Logo-01.svg";
import enLogo from "public/assets/icons/Tourbin Logo-02.svg";
import { useLocale, useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  const t = useTranslations("landingPage");

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
    // console.log("clicked: ", event);
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    const targetId = href?.replace("#", "");
    const targetElement = document.getElementById(targetId || "");

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const locale = useLocale();
  const logo = locale === "fa" ? faLogo : enLogo;

  return (
    <div
      id="hero"
      className="relative flex h-auto min-h-screen w-full flex-col"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-[80vh]"></div>
      <div className="mt-16 flex w-full flex-col items-center justify-center pb-4">
        <Image
          src={logo}
          alt="Centered Image"
          className="h-[300px] w-3/4 object-cover md:w-[40%]"
        />
        <h1 className="text-gl mb-16 flex items-center justify-center text-center font-bold text-blue-900 sm:text-xl md:text-2xl lg:text-3xl">
          {t("hero.header.top")}
          <br />
          {t("hero.header.bottom")}
        </h1>
        <ul className="flex w-full flex-wrap items-stretch justify-center gap-x-1 gap-y-4 px-2 sm:hidden sm:flex-wrap sm:gap-x-10 sm:px-10 md:gap-x-32">
          {primaryFeatures.map((feature) => (
            <li key={feature.name}>
              <a
                href={feature.href}
                onClick={handleSmoothScroll}
                className="group flex flex-col flex-nowrap items-center justify-center gap-8 sm:flex-wrap"
              >
                <Card className="flex aspect-square h-28 w-28 flex-col items-center justify-center gap-2 border border-primary">
                  <CardContent className="flex size-full flex-col items-center justify-center gap-2 p-3">
                    <Image
                      className="transition-all group-hover:scale-110"
                      alt={feature.name}
                      src={feature.icon}
                      width={50}
                      height={50}
                    />
                    <span className="text-nowrap text-xs font-semibold text-secondary">
                      {t(`primaryFeatures.${feature.name}`)}
                    </span>
                  </CardContent>
                </Card>
              </a>
            </li>
          ))}
        </ul>
        <ul className="hidden w-full flex-wrap items-stretch justify-center gap-x-1 gap-y-4 px-2 sm:flex sm:flex-wrap sm:gap-x-10 sm:px-10 md:gap-x-32">
          {primaryFeatures.map((feature) => (
            <li key={feature.name}>
              <a
                href={feature.href}
                onClick={handleSmoothScroll}
                className="group flex flex-col flex-nowrap items-center justify-center gap-8 sm:flex-wrap"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <Image
                    className="transition-all group-hover:scale-110"
                    alt={feature.name}
                    src={feature.icon}
                    width={100}
                    height={100}
                  />
                  <span className="text-nowrap font-semibold text-secondary">
                    {t(`primaryFeatures.${feature.name}`)}
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
