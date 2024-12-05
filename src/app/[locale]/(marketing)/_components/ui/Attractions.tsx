"use client";

import path from "path";
import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { env } from "@/env.mjs";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";

import { AttractionsLanding } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

export function Attractions() {
  const t = useTranslations("landingPage.tourismPlaces");

  const { data: responseData, isLoading } = useQuery({
    queryKey: ["attractions"],
    queryFn: async () => {
      const response = await AttractionsLanding(10);
      return response.data;
    },
  });

  const attractionCategories = ["طبیعی", "تاریخی", "فرهنگی", "تفریحی"];

  return (
    <div
      id="tourismPlaces"
      className="my-10 flex flex-col items-center justify-center space-y-6"
    >
      <div className="w-full space-y-2">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mt-3 rounded-md p-5 text-xl font-semibold">
            {t("title")}
          </h1>
          <div className="flex gap-1">
            {attractionCategories.map((category, categoryIndex) => (
              <p
                key={categoryIndex}
                className="rounded-lg bg-[#ECEDFD] px-4 py-2"
              >
                {category}
              </p>
            ))}
          </div>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          dir="ltr"
          className="w-full bg-[#ECEDFD]"
        >
          {isLoading ? (
            <CarouselContent className="mx-10 my-5 gap-1">
              {attractionCategories.map((_, categoryIndex) => (
                <CarouselItem
                  key={categoryIndex}
                  className="flex shrink-0 flex-col items-center transition-transform hover:scale-105"
                >
                  <Skeleton className="bg-gray-400" />
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <CarouselContent className="my-4 flex gap-1">
              {responseData &&
                Object.values(responseData).map((blog, blogIndex) => (
                  <CarouselItem
                    key={blogIndex}
                    className="flex flex-shrink-0 basis-80 flex-col items-center rounded-2xl"
                  >
                    <Card className="relative h-72 w-72 cursor-pointer overflow-hidden">
                      <CardContent className="relative h-full w-full">
                        <Image
                          fill
                          src={path.join(
                            env.NEXT_PUBLIC_BACKEND_URL,
                            blog.card_image
                          )}
                          alt={blog.place_name}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                        <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black bg-opacity-50 py-2 text-center text-white">
                          {blog.place_name || "NAME PLACE"}
                        </span>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                ))}
            </CarouselContent>
          )}
          <CarouselPrevious className="absolute left-0 size-8 w-8 border border-[#A4A7F7]" />
          <CarouselNext className="absolute right-0 size-8 w-8 border border-[#A4A7F7]" />
        </Carousel>
      </div>
    </div>
  );
}
