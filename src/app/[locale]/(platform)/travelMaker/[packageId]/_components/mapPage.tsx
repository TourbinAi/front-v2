"use client";

import Image from "next/image";

import Map from "../_components/map";
import { useQuery } from "@tanstack/react-query";
import { postData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import TextCard from "../_components/textCard";
import VideoPlayer from "@/components/share/videoPlayer";
import ErrorMessage from "../_components/error";
import { env } from "@/env.mjs";
import { useState } from "react";
import { PackagesPlaceRes } from "@/types/api";
import PlaceHolderImage from "public/assets/images/placeholderImages.png";
import path from "path";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface MapPageProps {
  packageId: string;
}

export default function MapPageComponent({ packageId }: MapPageProps) {
  const [ResponseData, setTravelPlan] = useState<PackagesPlaceRes>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => postData(Number(packageId)),
  });

  console.log("image: ", data?.data.places[0].first_image);

  console.log(data?.data.video_url);
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="flex size-full flex-col items-stretch justify-stretch gap-4 overflow-scroll p-4 lg:flex-row">
      {isLoading || !data?.data ? (
        <Skeleton className="size-full rounded-full" />
      ) : (
        <>
          <div className="flex flex-col items-stretch justify-stretch gap-4">
            <TextCard
              title="سفرساز توربین - برنامه هوشمند سفر"
              text={data?.data.travel_plan || ""}
              className="h-1/2"
            />
            <div className="flex aspect-square h-1/2 flex-col items-stretch justify-stretch lg:flex-row">
              {/* First Child: TextCard */}
              <TextCard
                title="خلاصه سفر"
                text={data?.data.summary_of_travel_plan || ""}
                className="aspect-square h-full max-h-[300px] flex-1 lg:max-h-none"
              />

              {/* Second Child: Conditional Grid/Empty State */}
              {data?.data.places.length === 0 || isLoading ? (
                <div className="flex flex-1 items-center justify-center rounded-2xl">
                  No places found
                </div>
              ) : (
                <div className="m-1 grid aspect-square grid-cols-2 grid-rows-2 items-center justify-items-center gap-4">
                  {data?.data.places.slice(0, 4).map((place) => (
                    <Link
                      className="size-full"
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
          <div className="flex h-full flex-col gap-4">
            <div className="aspect-square h-1/2 rounded-lg border-4 border-gray-300">
              <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
            </div>
            {!data?.data.video_url || isLoading ? (
              <Skeleton className="size-40 h-1/2 rounded-full" />
            ) : (
              <div className="flex aspect-square h-1/2 items-center justify-center">
                <VideoPlayer
                  videoUrl={path.join(
                    env.NEXT_PUBLIC_BACKEND_URL,
                    data.data.video_url
                  )}
                />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
