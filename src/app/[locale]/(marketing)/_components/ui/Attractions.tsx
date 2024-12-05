"use client"

import path from "path"

import * as React from "react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { env } from "@/env.mjs"
import { useTranslations } from "next-intl"

import { AttractionsLandingRes } from "@/types/api"

import { AttractionsLanding } from "@/lib/api"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Skeleton } from "@/components/ui/skeleton"

export function Attractions() {
  const [responseData, setData] = useState<AttractionsLandingRes>([])
  const [loading, setLoading] = useState<boolean>(false)

  const t = useTranslations("landingPage.tourismPlaces")

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await AttractionsLanding(10)
        // console.log("response: ", response);
        setData(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
  return (
    <div
      id="tourismPlaces"
      className="my-10 flex flex-col items-center justify-center space-y-6 "
    >
      <div className="w-full">
        <div>
          <h1 className="mb-2 mt-3 rounded-md p-5 text-xl font-semibold">
            {t("title")}
          </h1>
        </div>
        <div className="flex my-2 gap-1">
          <p className="bg-[#ECEDFD] px-4 py-2 rounded-lg">طبیعی </p>
          <p className="bg-[#ECEDFD] px-4 py-2 rounded-lg">تاریخی </p>
          <p className="bg-[#ECEDFD] px-4 py-2 rounded-lg">فرهنگی </p>
          <p className="bg-[#ECEDFD] px-4 py-2 rounded-lg">تفریحی </p>
          <p className="bg-[#ECEDFD] px-4 py-2 rounded-lg">همه </p>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          dir="ltr"
          className="w-full  bg-[#ECEDFD]"
        >
          {loading ? (
            <CarouselContent className="mx-10 my-5 gap-1">
              {[0, 1, 2, 3, 4].map((ind) => (
                <CarouselItem
                  key={ind}
                  className="flex shrink-0 flex-col items-center transition-transform hover:scale-105 "
                >
                  <Skeleton className=" bg-gray-400" />
                </CarouselItem>
              ))}
            </CarouselContent>
          ) : (
            <CarouselContent className="mx-10 my-5 flex gap-1">
              {Object.values(responseData).map((blog, blogIndex) => (
                <CarouselItem
                  key={blogIndex}
                  className="flex p-0 shrink-0 md:basis-1/2 lg:basis-1/4 flex-col items-center border-none bg-none transition-transform hover:scale-105"
                >
                  <Link
                    href={`blog/${blog.title}/?blogtype=1&blogid=${blog.id}`}
                  >
                    <Card className="relative size-96 cursor-pointer overflow-hidden">
                      <CardContent className="relative w-full h-full">
                        <Image
                          fill
                          src={path.join(
                            env.NEXT_PUBLIC_BACKEND_URL,
                            blog.card_image
                          )}
                          alt={blog.place_name}
                          className="absolute w-full h-full object-cover"
                        />
                        <span className="absolute bottom-0 left-0 w-full bg-black/50 py-3 text-center text-white">
                          {blog.place_name || "NAME PLACE"}
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
          )}
          <CarouselPrevious className="absolute left-0 size-96 w-8 border border-[#A4A7F7]  " />
          <CarouselNext className="absolute right-0 size-96 w-8 border border-[#A4A7F7] " />
        </Carousel>
      </div>
    </div>
  )
}
