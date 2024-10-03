"use client";
// app/[locale]/travel-maker/map/page.tsx
import { useParams } from "next/navigation";
import Map from "./map";
import SideBarMap from "./sideBarMap";
import { useEffect, useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/Drawer";
import { useTranslations } from "next-intl";
import { PackagesPlaceRes } from "@/types/api";
import { ScrollArea } from "@/components/ui/scroll";

export default function MapPageComp() {
  const route = useParams();
  const packageId = Number(route.Package);
  const [ResponseData, setTravelPlan] = useState<PackagesPlaceRes>();
  const t = useTranslations("travelMaker.package");
  // useEffect(() => {
  //   // console.log(ResponseData);
  // }, [ResponseData]);

  return (
    <>
      <div className="hidden h-screen flex-col md:flex-row lg:flex">
        <div className="w-full md:w-1/3">
          <SideBarMap packageId={packageId} ResData={ResponseData} />
        </div>
        <div className="ml-0 mr-0 w-full md:ml-6 md:mr-4 md:w-3/4">
          <Map packageId={packageId} setPlan={setTravelPlan} />
        </div>
      </div>
      <ScrollArea className="h-[99%]">
        <div className="lg:hidden">
          <div className="-mr-5 ml-0 w-full md:w-1/3">
            <SideBarMap packageId={packageId} ResData={ResponseData} />
          </div>
          <div className="flex items-center justify-center">
            <Drawer>
              <div className="mt-10">
                <DrawerTrigger asChild>
                  <Button>{t("mapOpen")}</Button>
                </DrawerTrigger>
              </div>
              <DrawerContent>
                <DrawerClose
                  asChild
                  className="absolute top-10 z-30 mr-4 w-max"
                >
                  <Button variant="outline">{t("mapClose")}</Button>
                </DrawerClose>
                <div className="relative z-10">
                  <Map packageId={packageId} setPlan={setTravelPlan} />
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
