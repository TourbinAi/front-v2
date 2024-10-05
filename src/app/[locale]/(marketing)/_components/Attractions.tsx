"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AttractionsAPI, AttractionsLanding } from "@/lib/api";
import { useTranslations } from "next-intl";
import { AttractionsLandingRes } from "@/types/api";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";

export function Attractions() {
  const [responseData, setData] = useState<AttractionsLandingRes>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const t = useTranslations("landingPage.tourismPlaces");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await AttractionsLanding(10);
        // console.log("response: ", response);
        setData(response.data);
      } catch (err) {
        // console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="my-10 flex flex-col items-center justify-center space-y-6">
        <div className="w-full">
          <h1 className="mb-2 mt-3 rounded-md p-5 text-xl font-semibold">
            {t("title")}
          </h1>
          <Carousel
            dir="ltr"
            className="flex min-h-20 w-full items-center justify-center"
          >
            {loading ? (
              <CarouselContent className="mx-10 my-5 gap-1">
                {[0, 1, 2, 3, 4].map((ind) => (
                  <CarouselItem
                    key={ind}
                    className="flex flex-shrink-0 basis-80 flex-col items-center rounded-2xl border-none bg-none transition-transform hover:scale-105"
                  >
                    <Skeleton className="h-72 w-72 bg-gray-400" />
                  </CarouselItem>
                ))}
              </CarouselContent>
            ) : (
              <CarouselContent className="mx-10 my-5 flex gap-1">
                {responseData.map((blog, blogIndex) => (
                  <CarouselItem
                    onClick={() =>
                      router.push(
                        `/blog/${blog.title}/?blogtype=1&blogid=${blog.id}`
                      )
                    }
                    key={blogIndex}
                    className="flex flex-shrink-0 basis-80 flex-col items-center rounded-2xl border-none bg-none transition-transform hover:scale-105"
                  >
                    <Card className="relative h-72 w-72 cursor-pointer overflow-hidden">
                      <CardContent className="relative h-full w-full">
                        <Image
                          fill
                          src={
                            process.env.NEXT_PUBLIC_BACKEND_URL +
                            blog.card_image
                          } //removing the first "/" because it is in the backendUrl
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
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
          </Carousel>
        </div>
      </div>
    </>
  );
}
