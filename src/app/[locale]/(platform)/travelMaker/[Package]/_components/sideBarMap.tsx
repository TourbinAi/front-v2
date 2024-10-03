"use client";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll";
import { Skeleton } from "@/components/ui/skeleton";
import { backendUrl } from "@/constants/config";
import { PackagesPlaceRes } from "@/types/api";

import { useState, useEffect, useRef } from "react";

interface MapProps {
  packageId: number;
  ResData: PackagesPlaceRes | undefined;
}

function SideBarMap({ packageId, ResData }: MapProps) {
  const [isLoading, setLoading] = useState(true);
  const [description, setDescription] = useState("");
  const [typedDescription, setTypedDescription] = useState("");
  const [imgURL, setURL] = useState<any[]>([]);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // console.log("Travelplan received:", ResData);
    if (ResData) {
      const desc = ResData.travel_plan;
      setDescription(desc);
      const urlImages = ResData.places.map((place: any) => {
        return place;
      });
      // console.log(urlImages);
      setURL(urlImages);
      setLoading(false);
    }
  }, [ResData]);

  useEffect(() => {
    const charsArray = description.split("");

    charsArray.forEach((char, index) => {
      setTimeout(() => {
        setTypedDescription((prev) => prev + char);
      }, 20 * index);
    });
  }, [description]);

  useEffect(() => {
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = descriptionRef.current.scrollHeight;
    }
  }, [typedDescription]);

  return (
    <div className="mr-5 flex h-full flex-col flex-wrap bg-white mt-5 rounded-lg pl-4 pr-4 pt-3">
      {isLoading ? (
        <>
          <div className="flex h-48 justify-center">
            <Skeleton className="m-2 w-full bg-slate-950" />
          </div>
          <div className="flex h-1/2 flex-col flex-wrap items-center justify-center lg:flex-row">
            <Skeleton className="m-2 h-32 w-2/3 bg-slate-950 lg:w-32" />
            <Skeleton className="m-2 h-32 w-2/3 bg-slate-950 lg:w-32" />
            <Skeleton className="m-2 h-32 w-2/3 bg-slate-950 lg:w-32" />
          </div>
        </>
      ) : (
        <div className="flex flex-col">
          <ScrollArea
            ref={descriptionRef}
            className="mt-6 h-1/2 overflow-y-auto"
            style={{ maxHeight: "150px", direction: "rtl" }}
          >
            <div>
              <p className="text-sm">
                {typedDescription || "No description available"}
              </p>
            </div>
          </ScrollArea>
          <div className="mb-7 mt-10 flex h-min flex-col flex-wrap items-center justify-center gap-4 lg:flex-row">
            {imgURL?.map((url, index) => (
              <div
                key={index}
                className="flex w-4/5 flex-col items-center rounded-lg bg-white shadow-lg lg:w-2/5"
              >
                <img
                  src={backendUrl + url.first_image.slice(1, undefined)}
                  className="h-full w-full rounded-t-xl"
                  alt="location image"
                />
                <p className="text-center text-sm font-semibold">{url.name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SideBarMap;
