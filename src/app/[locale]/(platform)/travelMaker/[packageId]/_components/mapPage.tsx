"use client";

import Image from "next/image";
import Map from "../_components/map";
import { useQuery } from "@tanstack/react-query";
import { postData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import TextCard from "../_components/textCard";
import VideoPlayer from "./videoPlayer";
import ErrorMessage from "../_components/error";
import { env } from "@/env.mjs";
import { useState } from "react";
import { PackagesPlaceRes } from "@/types/api";
import PlaceHolderImage from "public/assets/images/placeholderImages.png";
import path from "path";
import { Link } from "@/i18n/navigation";
import { Card, CardContent } from "@/components/ui/card";
import ReactPlayer from "react-player";

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
    <div className="flex size-full flex-col items-stretch justify-start gap-4 overflow-scroll p-4 lg:flex-row lg:justify-end">
      {isLoading || !data?.data ? (
        <Skeleton className="size-full rounded-full" />
      ) : (
        <>
          <div className="flex flex-col items-stretch justify-stretch gap-4">
            <div className="size-full">
              <TextCard
                title="سفرساز توربین - برنامه هوشمند سفر"
                text={data?.data.travel_plan || ""}
                className="h-auto"
              />
            </div>
            <div className="flex aspect-square h-auto flex-col items-stretch justify-stretch gap-4 lg:h-1/2 lg:flex-row">
              {/* First Child: TextCard */}
              <div className="size-full">
                <TextCard
                  title="خلاصه سفر"
                  text={data?.data.summary_of_travel_plan || ""}
                  className="aspect-square h-full max-h-[300px] w-full lg:max-h-none"
                />
              </div>

              {/* Second Child: Conditional Grid/Empty State */}
              {data?.data.places.length === 0 || isLoading ? (
                <div className="flex flex-1 items-center justify-center rounded-2xl">
                  No places found
                </div>
              ) : (
                <div className="m-1 grid aspect-square w-full grid-cols-2 grid-rows-2 items-center justify-items-center gap-4">
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
          <div className="flex flex-col items-center gap-4 lg:h-full">
            <div className="aspect-square h-1/2 w-full rounded-lg border-4 border-gray-300 lg:h-2/3">
              <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
            </div>
            <div className="flex aspect-square h-1/2 items-center justify-center lg:h-1/3">
              <VideoPlayer videoUrl={`/assets/videos/pck/${packageId}.mp4`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
