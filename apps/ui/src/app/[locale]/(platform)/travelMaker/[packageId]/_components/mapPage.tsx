"use client";

import Image from "next/image";
import Map from "./map";
import { useQuery } from "@tanstack/react-query";
import { postData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import TextCard from "./textCard";
import VideoPlayer from "./videoPlayer"
import ErrorMessage from "./error";
import { env } from "@/env.mjs";
import { useState } from "react";
import { PackagesPlaceRes } from "@/types/api";
import PlaceHolderImage from "public/assets/images/placeholderImages.png";
import path from "path";
import { Link } from "@/lib/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

interface MapPageProps {
  packageId: string;
}

export default function MapPageComponent({ packageId }: MapPageProps) {
  const [ResponseData, setTravelPlan] = useState<PackagesPlaceRes>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => postData(Number(packageId)),
  });

  if (error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <div className="hidden lg:flex size-full flex-col items-stretch justify-start gap-4 p-4 lg:flex-row lg:justify-end ">
        {isLoading || !data?.data ? (
          <Skeleton className="size-full rounded-full" />
        ) : (
          <>
            <div className="flex flex-col basis-2/3 items-stretch justify-stretch gap-4 ">
              <div className="w-full h-full ">
                <TextCard
                  title="سفرساز توربین - برنامه هوشمند سفر"
                  text={data?.data.travel_plan || ""}
                  className="h-full w-full"
                />
              </div>
              <div className="flex h-full flex-col items-stretch justify-stretch gap-4 lg:h-1/2 lg:flex-row">
                {/* First Child: TextCard */}
                <div className="w-full">
                  <TextCard
                    title="خلاصه سفر"
                    text={data?.data.summary_of_travel_plan || ""}
                    className=" h-full w-full lg:max-h-none"
                  />
                </div>

                {/* Second Child: Conditional Grid/Empty State */}
                {data?.data.places.length === 0 || isLoading ? (
                  <div className="flex flex-1 items-center justify-center rounded-2xl">
                    No places found
                  </div>
                ) : (
                  <div className="m-1 flex aspect-square w-full flex-col items-center justify-items-center gap-4 lg:grid lg:grid-cols-2 lg:grid-rows-2">
                    {data?.data.places.slice(0, 4).map((place) => (
                      <Link
                        className="size-full"
                        key={place.id}
                        href={`blog/${place.name}/?blogtype=1&blogid=${place.id}`}
                      >
                        <Card className="relative size-full cursor-pointer overflow-hidden">
                          <CardContent className="relative h-full w-full">
                            <Image
                              fill
                              src={path.join(
                                env.NEXT_PUBLIC_BACKEND_URL,
                                place.first_image || PlaceHolderImage.src
                              )}
                              alt={place.name}
                              className="absolute inset-0 h-full w-full object-cover"
                            />
                            <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black bg-opacity-50 py-2 text-center text-white">
                              {place.name || "NAME PLACE"}
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-stretch gap-4 lg:h-full basis-1/3">
              <div className="aspect-square h-1/3 w-full rounded-lg border-4 border-gray-300 lg:h-2/4">
                <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
              </div>
              <div className="flex aspect-square h-1/3 items-center justify-stretch lg:h-2/4">
                <VideoPlayer videoUrl={`/assets/videos/pck/${packageId}.mp4`} />
              </div>
            </div>
          </>
        )}


      </div>

      {/* responsive */}
      <div className="m-2 flex flex-col lg:hidden gap-2">
        <div className="aspect-square h-1/3 w-full rounded-lg border-4 border-gray-300 lg:h-2/4">
          <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
        </div>
        <div className="w-full h-full">
          <TextCard
            title="سفرساز توربین - برنامه هوشمند سفر"
            text={data?.data.travel_plan || ""}
            className="h-full w-full"
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex h-full items-center  lg:h-2/4">
            <VideoPlayer videoUrl={`/assets/videos/pck/${packageId}.mp4`} />
          </div>
          <div className="w-full">
            <TextCard
              title="خلاصه سفر"
              text={data?.data.summary_of_travel_plan || ""}
              className=" w-full h-fit"
            />
          </div>
        </div>
        {data?.data.places.length === 0 || isLoading ? (
          <div className="flex  items-center justify-center rounded-2xl ">
            No places found
          </div>
        ) : (
          <Carousel
            className="size-full "
            dir="ltr"
          >
            <CarouselContent className="">
              {data?.data.places.slice(0, 4).map((place) => (
                <CarouselItem
                className="flex shrink-0 flex-col items-center rounded-2xl border-none bg-none transition-transform md:basis-1/3"
                >
                  <Link
                    className=""
                    key={place.id}
                    href={`blog/${place.name}/?blogtype=1&blogid=${place.id}`}
                  >
                    <Card className="relative size-[96vw] md:size-56 cursor-pointer overflow-hidden">
                      <CardContent className=" flex aspect-square items-center justify-center ">
                        <Image
                          fill
                          src={path.join(
                            env.NEXT_PUBLIC_BACKEND_URL,
                            place.first_image || PlaceHolderImage.src
                          )}
                          alt={place.name}
                          className="absolute  size-full object-cover"
                        />
                        <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black bg-opacity-50 py-2 text-center text-white">
                          {place.name || "NAME PLACE"}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>

              ))}
            </CarouselContent>
          </Carousel>
        )}
      </div>

    </>
  );
}
