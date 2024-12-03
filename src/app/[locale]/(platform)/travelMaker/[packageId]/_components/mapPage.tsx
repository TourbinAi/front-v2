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
    <div className="grid size-full grid-cols-1 gap-4 overflow-scroll p-6 lg:grid-cols-3">
      {isLoading || !data?.data ? (
        <Skeleton className="size-full rounded-full" />
      ) : (
        <>
          <TextCard
            title="سفرساز توربین - برنامه هوشمند سفر"
            text={data?.data.travel_plan || ""}
            className="col-span-2 size-full"
          />
          <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
          <TextCard
            title="خلاصه سفر"
            text={data?.data.summary_of_travel_plan || ""}
            className="size-full"
          />
          {data?.data.places.length === 0 || isLoading ? (
            <div className="flex size-full items-center justify-center rounded-2xl border-4 border-gray-300">
              No places found
            </div>
          ) : (
            <div className="m-1 grid grid-cols-2 grid-rows-2 justify-items-center gap-4">
              {data?.data.places.slice(0, 4).map((place) => (
                <Link
                  className="size-full"
                  href={`blog/${place.name}/?blogtype=1&blogid=${place.id}`}
                >
                  <Card className="relative aspect-square size-full cursor-pointer overflow-hidden">
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
          {!data?.data.video_url || isLoading ? (
            <Skeleton className="size-40 rounded-full" />
          ) : (
            <div className="m-3 flex items-center justify-center">
              <VideoPlayer
                videoUrl={path.join(
                  env.NEXT_PUBLIC_BACKEND_URL,
                  data.data.video_url
                )}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
