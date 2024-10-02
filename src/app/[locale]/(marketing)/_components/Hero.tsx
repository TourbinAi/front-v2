"use client";

import { primaryFeatures } from "@/constants";
import Image from "next/image";
import BeachImage from "public/assets/images/beachSunSet.png";
import Logo from "public/assets/images/logo.png";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { SyntheticEvent } from "react";

export function Hero() {
  const t = useTranslations("landingPage");
  return (
    <div
      id="hero"
      className="relative flex h-auto min-h-screen w-full flex-col"
    >
      <div className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-[80vh] bg-gradient-to-t from-[#faf8f1] to-transparent"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 [mask-image:linear-gradient(to_bottom,white_40%,transparent)]">
        <Image
          src={BeachImage}
          alt="Main Background"
          className="h-[80vh] w-full object-cover"
        />
      </div>
      sm:basis-80
      <div className="mt-32 flex w-full flex-col items-center justify-center gap-16 pb-4">
        <Image src={Logo} alt="Centered Image" className="w-1/2 md:w-[20%]" />
        <h1 className="text:gl flex items-center justify-center text-center font-bold text-blue-900 sm:text-xl md:text-2xl lg:text-3xl">
          {t("hero.header.top")}
          <br />
          {t("hero.header.bottom")}
        </h1>
        <ul
          onClick={(event: SyntheticEvent) => {
            event.preventDefault();
            const target = event.target as HTMLAnchorElement;
            const id = target.getAttribute("href");
            const element = document.getElementById(String(id));
            element?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="flex w-full flex-nowrap items-stretch justify-center gap-x-2 gap-y-4 px-2 sm:flex-wrap sm:gap-x-10 sm:px-10 md:gap-x-32"
        >
          {primaryFeatures.map((feature) => (
            <li>
              <a
                key={feature.name}
                href={feature.href}
                className="group flex flex-col flex-nowrap items-center justify-center gap-8 sm:flex-wrap"
              >
                <Card className="block aspect-square border border-primary sm:hidden">
                  <CardContent className="flex size-full flex-col items-center justify-center gap-2 p-3">
                    <Image
                      className="transition-all group-hover:scale-110"
                      alt={feature.name}
                      src={feature.icon}
                      width={50}
                      height={50}
                    />
                  </CardContent>
                </Card>
                <div className="hidden sm:block">
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
