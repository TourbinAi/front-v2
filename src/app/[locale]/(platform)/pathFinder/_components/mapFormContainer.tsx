"use client";

import MapPathFinder from "./map";
import { PathFinderForm } from "./form";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { CarouselSpacing } from "./Tourist attractions";
import { Suspense } from "react";

function MapForm() {
  const [dataOriginForm, setDataOriginForm] = useState<any>(null);
  const [dataDestinationForm, setDataDestinationForm] = useState<any>(null);
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // State to control sheet visibility

  const handleSubmitForm = (dataOrigin: any, dataDestination: any) => {
    setDataOriginForm(dataOrigin);
    setDataDestinationForm(dataDestination);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-start overflow-y-auto">
      {/* Desktop view */}
      <div className="hidden w-full flex-row gap-4 lg:flex">
      
        <div className="relative mr-16 w-1/5">
        <Suspense fallback={<div>Loading...</div>}>
          <PathFinderForm FormData={handleSubmitForm} SheetOpen={setIsSheetOpen}/>
          </Suspense>
        </div>
        <div className="ml-12 mt-2 w-4/5">
          <MapPathFinder
            origin={dataOriginForm}
            destination={dataDestinationForm}
          />
        </div>
      </div>

      <div className="flex w-full flex-col lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="absolute z-20 m-4 h-14 w-14 rounded-full"
            >
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <PathFinderForm FormData={handleSubmitForm} SheetOpen={setIsSheetOpen} />
          </SheetContent>
        </Sheet>
        <div className="z-10 w-full p-4">
          <MapPathFinder
            origin={dataOriginForm}
            destination={dataDestinationForm}
          />
        </div>
      </div>
      {/* Carousel */}
      <div className="w-11/12 pb-8">
        <CarouselSpacing destination={dataDestinationForm} />
      </div>
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default MapForm;
