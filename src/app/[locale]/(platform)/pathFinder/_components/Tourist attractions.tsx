import * as React from "react";
import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AttractionsAPI } from "@/lib/api";

export function CarouselSpacing({ destination }: { destination: any[] }) {
  const [destinationInfo, setInfo] = useState<any[]>([]);
  const [responseData, setData] = useState<any[]>([]);
  const [regionID, setId] = useState([
    { region: "مازندران", id: 1 },
    { region: "گیلان", id: 2 },
  ]);
  const [filterRegionState, setFilter] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!destination || destination.length === 0) return;

      setInfo(destination);
      // console.log(destination.at(-1));

      const filterRegion = regionID.find((regionItem) =>
        destination?.at(-1)?.region?.includes(regionItem.region)
      );
      if (!filterRegion) return;
      setFilter(filterRegion);
      // console.log(filterRegion);

      try {
        const response = await AttractionsAPI(filterRegion.id);
        // console.log(response);
        setData(response.data);
      } catch (err) {
        // console.log(err);
      }
    };

    fetchData();
  }, [destination]);

  const filteredData = responseData.filter((item: any) => item.tag_id);

  if (!filteredData.length) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-6">
      {filteredData.map((item: any, index: number) => (
        <div key={index} className="w-full">
          <h1 className="mb-2 mt-3 w-2/3 rounded-md bg-white text-sm md:w-1/5">
            {item.tag_id === 8
              ? `جاذبه‌های طبیعی ${filterRegionState?.region} `
              : item.tag_id === 9
                ? `جاذبه‌های تاریخی فرهنگی ${filterRegionState?.region} `
                : `جاذبه‌های گردشگری ${filterRegionState?.region}`}
          </h1>
          <Carousel
            dir="ltr"
            className="flex w-full items-center justify-center"
          >
            <CarouselContent className="flex gap-1">
              {item.blogs.map((blog: any, blogIndex: number) => (
                <CarouselItem
                  key={blogIndex}
                  className="flex flex-shrink-0 basis-80 flex-col items-center rounded-2xl"
                >
                  <div className="relative">
                    <img
                      src={
                        process.env.NEXT_PUBLIC_BACKEND_URL + blog.card_image
                      }
                      alt={blog.place_name}
                      className="h-48 w-80 rounded-2xl"
                    />
                    <span className="absolute bottom-0 left-0 w-full rounded-b-2xl bg-black bg-opacity-50 py-2 text-center text-white">
                      {blog.place_name || "NAME PLACE"}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-1" />
            <CarouselNext className="absolute right-1" />
          </Carousel>
        </div>
      ))}
    </div>
  );
}
