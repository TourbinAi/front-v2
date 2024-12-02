"use client";

import Image from "next/image";

import Map from "../_components/map";
import TravelPlane from "../_components/travelplane";
import { useQuery } from "@tanstack/react-query";
import { postData } from "@/lib/api";
import { Skeleton } from "@/components/ui/skeleton";
import TextCard from "../_components/textCard";
import VideoPlayer from "@/components/share/videoPlayer";
import ErrorMessage from "../_components/error";
import { env } from "@/env.mjs";
import { useState } from "react";
import { PackagesPlaceRes } from "@/types/api";

interface MapPageProps {
  packageId: string;
}

export default function MapPageComponent({ packageId }: MapPageProps) {
  const [ResponseData, setTravelPlan] = useState<PackagesPlaceRes>();

  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => postData(101),
  });

  console.log(data?.data.video_url);
  if (error) {
    return <ErrorMessage />;
  }

  return (
    <div className="grid size-full grid-cols-3 gap-4 overflow-scroll p-6">
      {isLoading || !data?.data ? (
        <Skeleton className="size-full rounded-full" />
      ) : (
        <>
          <Map packageId={Number(packageId)} setPlan={setTravelPlan} />
          <TextCard
            title="title"
            text={data?.data.travel_plan || ""}
            className="col-span-2"
          />
          <TravelPlane />
          <div className="m-1 grid grid-cols-2 justify-items-center gap-4">
            {data?.data || isLoading ? (
              <Skeleton className="size-full rounded-full" />
            ) : (
              data?.data.places.map((place) => (
                <Image
                  className="aspect-square h-48 w-full rounded-2xl object-cover xl:h-56"
                  key={place.id}
                  src={place.first_image}
                  alt={place.name}
                  width={100}
                  height={100}
                />
              ))
            )}
          </div>
          {!data?.data || isLoading ? (
            <Skeleton className="size-40 rounded-full" />
          ) : (
            <div className="m-3 flex w-1/2 items-center justify-center">
              <VideoPlayer
                videoUrl={
                  `${env.NEXT_PUBLIC_BACKEND_URL}/${data?.data.video_url}` || ""
                }
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}
