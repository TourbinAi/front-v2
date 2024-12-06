"use client";

import Image from "next/image";
import { primaryFeatures } from "@/constants";
import { useTranslations } from "next-intl";
import heroPictuer from "public/assets/images/heropic.png";
import Logo from "public/assets/images/tourbinimage.png";

import { Card, CardContent } from "@/components/ui/card";

export function Hero() {
  const t = useTranslations("landingPage");

  const handleSmoothScroll = (event: React.MouseEvent<HTMLAnchorElement>) => {
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

  return (
    <div
      id="hero"
      className="relative flex h-auto w-full flex-col lg:min-h-screen"
    >
      <div className="mt-32 flex w-full flex-col items-center justify-center gap-16 px-1 pb-4 md:mt-16 lg:mt-16">
        <div className="flex gap-14">
          <div className="relative hidden items-center justify-center lg:flex">
            <div className="absolute h-[100%] w-[80%] rounded-full bg-[#EE4037]"></div>
            <Image
              src={heroPictuer}
              alt="Centered Image absolute "
              className="z-10 object-cover"
            />
          </div>
          <div className="md:pb-15 flex flex-col items-center justify-center md:justify-start">
            <Image src={Logo} alt="Centered Image" />
            <h1 className="text-gl mb-4 flex items-center justify-center text-center font-bold text-blue-900 sm:text-xl md:text-2xl lg:text-3xl">
              {t("hero.header.top")}
              <br />
              {t("hero.header.bottom")}
            </h1>
          </div>
        </div>
        <ul className="flex w-full flex-wrap items-stretch justify-center gap-x-1 gap-y-4 bg-[#FDECEC] px-2 py-2 sm:gap-x-10 sm:px-10 md:mt-6 md:flex-wrap md:gap-x-32 lg:hidden">
          {primaryFeatures.map((feature) => (
            <li key={feature.name}>
              <a
                href={feature.href}
                onClick={handleSmoothScroll}
                className="group flex flex-col flex-nowrap items-center justify-center gap-1 sm:flex-wrap"
              >
                <Card className="items-scratch flex aspect-square size-28 flex-col justify-center gap-2 border border-primary">
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
        <ul className="z-20 -mt-24 hidden w-full flex-wrap items-stretch justify-center gap-x-1 gap-y-4 bg-[#ECEDFD] px-2 py-6 sm:flex-wrap sm:gap-x-10 sm:px-10 md:gap-x-32 lg:flex">
          {primaryFeatures.map((feature) => (
            <li key={feature.name}>
              <a
                href={feature.href}
                onClick={handleSmoothScroll}
                className="group flex flex-col flex-nowrap items-center justify-center gap-8 sm:flex-wrap"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <Image
                    className="object-cover transition-all group-hover:scale-110"
                    alt={feature.name}
                    src={feature.icon}
                    width={100}
                    height={100}
                  />
                  <span className="text-nowrap font-semibold text-[#EE4037]">
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
