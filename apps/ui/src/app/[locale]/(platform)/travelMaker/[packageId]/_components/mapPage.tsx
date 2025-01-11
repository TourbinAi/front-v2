"use client"

import path from "path"

import { useState } from "react"
import Image from "next/image"
import { env } from "@/env.mjs"
import { useQuery } from "@tanstack/react-query"
import PlaceHolderImage from "public/assets/images/placeholderImages.png"

import { PackagesPlaceRes } from "@/types/api"

import { postData } from "@/lib/api"
import { Link } from "@/lib/navigation"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

import ErrorMessage from "./error"
import Map from "./map"
import TextCard from "./textCard"
import VideoPlayer from "./videoPlayer"

interface MapPageProps {
  packageId: string
}

export default function MapPageComponent({ packageId }: MapPageProps) {
  const [ResponseData, setTravelPlan] = useState<PackagesPlaceRes>()

  const { data, error, isLoading } = useQuery({
    queryKey: ["places"],
    queryFn: () => postData(Number(packageId)),
  })
  if (error) {
    return <ErrorMessage />
  }
  return (
    <>
      <div className="hidden size-full flex-col items-stretch justify-start gap-4 p-4 lg:flex lg:flex-row lg:justify-end">
        {isLoading || !data?.data ? (
          <Skeleton className="size-full rounded-full" />
        ) : (
          <>
            <div className="flex basis-2/3 flex-col items-stretch justify-stretch gap-4">
              <div className="h-full w-full">
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
                    className="h-full w-full lg:max-h-none"
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
            <div className="flex basis-1/3 flex-col items-stretch gap-4 lg:h-full">
              <div className="aspect-square h-1/3 w-full rounded-lg border-4 border-gray-300 lg:h-2/4">
                <Map
                  packageId={Number(packageId)}
                  setPlan={setTravelPlan}
                  dirction_url={data?.data?.directions_url || ""}
                />
              </div>
              {data?.data?.video_url && data?.data?.video_url !== "" ? (
                <div className="flex aspect-square h-1/3 items-center justify-stretch lg:h-2/4">
                  <VideoPlayer
                    videoUrl={path.join(
                      env.NEXT_PUBLIC_BACKEND_URL,
                      data?.data?.video_url
                    )}
                  />
                </div>
              ) : (
                <div className="border-2 border-gray-300 rounded-md flex aspect-square h-1/3 items-center justify-center lg:h-2/4">
                  there is no video
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* responsive */}
      <div className="m-2 flex flex-col gap-2 lg:hidden">
        <div className="aspect-square h-1/3 w-full rounded-lg border-4 border-gray-300 lg:h-2/4">
          <Map
            packageId={Number(packageId)}
            setPlan={setTravelPlan}
            dirction_url={data?.data?.directions_url || ""}
          />
        </div>
        <div className="h-full w-full">
          <TextCard
            title="سفرساز توربین - برنامه هوشمند سفر"
            text={data?.data.travel_plan || ""}
            className="h-full w-full"
          />
        </div>
        <div className="grid grid-rows-2 gap-2">
          {data?.data?.video_url && data?.data?.video_url !== "" ? (
            <div className="flex h-full items-center lg:h-2/4">
              <VideoPlayer
                videoUrl={path.join(
                  env.NEXT_PUBLIC_BACKEND_URL || "",
                  data?.data?.video_url || ""
                )}
              />
            </div>
          ) : (
            <div className="border-2 border-gray-300 rounded-md flex h-full items-center justify-center lg:h-2/4">
              there is no video
            </div>
          )}
          <div className="w-full">
            <TextCard
              title="خلاصه سفر"
              text={data?.data.summary_of_travel_plan || ""}
              className="h-fit w-full"
            />
          </div>
        </div>
        {data?.data.places.length === 0 || isLoading ? (
          <div className="flex items-center justify-center rounded-2xl">
            No places found
          </div>
        ) : (
          <Carousel className="size-full" dir="ltr">
            <CarouselContent className="">
              {data?.data.places.slice(0, 4).map((place) => (
                <CarouselItem
                  key={place.id}
                  className="flex shrink-0 flex-col items-center rounded-2xl border-none bg-none transition-transform md:basis-1/3"
                >
                  <Link
                    className=""
                    key={place.id}
                    href={`blog/${place.name}/?blogtype=1&blogid=${place.id}`}
                  >
                    <Card className="relative size-[96vw] cursor-pointer overflow-hidden md:size-56">
                      <CardContent className="flex aspect-square items-center justify-center">
                        <Image
                          fill
                          src={path.join(
                            env.NEXT_PUBLIC_BACKEND_URL,
                            place.first_image || PlaceHolderImage.src
                          )}
                          alt={place.name}
                          className="absolute size-full object-cover"
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
  )
}
