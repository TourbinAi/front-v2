import * as React from "react"
import { useQuery } from "@tanstack/react-query"

import type { NeshanDataItemType } from "@/types/api"

import { AttractionsAPI } from "@/lib/api"
import { ImageWithFallback } from "@/components/elementary/ImageWithFallback"
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { regionID } from "./regionIDconst"

export function CarouselSpacing({
  destination,
}: {
  destination: NeshanDataItemType[]
}) {
  const filterRegion = destination?.length
    ? regionID.find((regionItem) =>
        destination?.at(-1)?.region?.includes(regionItem.region)
      )
    : null

  const {
    data: responseData = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["attractions", filterRegion?.id],
    queryFn: async () => {
      if (!filterRegion) throw new Error("Region not found")
      const response = await AttractionsAPI(filterRegion.id)
      return response.data
    },
    enabled: !!filterRegion, // Only run the query if filterRegion is defined
  })

  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error loading data...</p>

  const filteredData = responseData.filter((item: any) => item.tag_id)

  if (!filteredData.length) {
    return null
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {filteredData.map((item: any, index: number) => (
        <div key={index} className="w-full">
          <h1 className="mb-2 mt-3 w-2/3 rounded-md bg-white text-sm md:w-1/5">
            {item.tag_id === 8
              ? `جاذبه‌های طبیعی ${filterRegion?.region} `
              : item.tag_id === 9
                ? `جاذبه‌های تاریخی فرهنگی ${filterRegion?.region} `
                : `جاذبه‌های گردشگری ${filterRegion?.region}`}
          </h1>
          <Carousel
            dir="ltr"
            className="flex w-full items-center justify-center"
          >
            <CarouselContent className="flex gap-1">
              {item.blogs.map((blog: any, blogIndex: number) => (
                <CarouselItem
                  key={blogIndex}
                  className="flex shrink-0 basis-80 flex-col items-center rounded-2xl"
                >
                  <Card className="relative h-52 w-72 cursor-pointer overflow-hidden">
                    <CardContent className="relative size-full">
                      <ImageWithFallback
                        fill
                        src={
                          process.env.NEXT_PUBLIC_BACKEND_URL + blog.card_image
                        }
                        alt={blog.place_name}
                        className="absolute inset-0 size-full object-cover"
                      />
                      <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black/50 py-2 text-center text-white">
                        {blog.place_name || "NAME PLACE"}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
          </Carousel>
        </div>
      ))}
    </div>
  )
}
