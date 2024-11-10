"use client"

import { Suspense, useState } from "react"
import { PanelRightOpen } from "lucide-react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

import { PathFinderForm } from "./form"
import MapPathFinder from "./map"
import { CarouselSpacing } from "./Tourist attractions"

/**
 * `MapForm` Component
 *
 * The `MapForm` component combines a map with a path-finding form and integrates a mobile-friendly
 * sheet (drawer) for ease of use. It uses the Nuqs library to adapt query parameters for form state management.
 *
 * ### Description
 * - This component contains two main views:
 *   - **Desktop View**: Renders the form and map side-by-side.
 *   - **Mobile View**: Shows the form in a slide-out drawer and the map beneath.
 * - A `CarouselSpacing` component displays destination-related information in a carousel view at the bottom.
 *
 * ### State Variables
 * - `dataOriginForm`: Holds the origin data from the path-finding form.
 * - `dataDestinationForm`: Stores the destination data from the form.
 * - `isSheetOpen`: Manages the visibility of the drawer (sheet) in mobile view.
 *
 * ### Props and Children
 * - Uses the `PathFinderForm` to capture origin and destination inputs.
 * - Uses `MapPathFinder` to display the map based on origin and destination data.
 * - `CarouselSpacing` shows additional information related to the selected destination.
 *
 * ### Usage Example
 * ```jsx
 * <MapForm />
 * ```
 *
 * ### Dependencies
 * - `NuqsAdapter`: Adapts query parameters for the form state, enhancing sync with URL state.
 * - `Sheet` and `SheetContent`: Provide a responsive, drawer-like behavior on mobile devices.
 *
 * ### Components
 * - `PathFinderForm`: Accepts form data and a function to open/close the sheet.
 * - `MapPathFinder`: Displays a map based on form input.
 * - `CarouselSpacing`: Shows additional info in a carousel related to the destination.
 *
 * ### Callbacks
 * - `handleSubmitForm`: Updates `dataOriginForm` and `dataDestinationForm` when the form is submitted.
 */

function MapForm() {
  const [dataOriginForm, setDataOriginForm] = useState<any>(null)
  const [dataDestinationForm, setDataDestinationForm] = useState<any>(null)
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false)

  const handleSubmitForm = (dataOrigin: any, dataDestination: any) => {
    setDataOriginForm(dataOrigin)
    setDataDestinationForm(dataDestination)
  }
  return (
    <NuqsAdapter>
      <div className="flex h-screen flex-col items-center justify-start overflow-y-auto">
        {/* Desktop View */}
        <div className="hidden w-full flex-row gap-4 lg:flex">
          <div className="relative mr-16 w-1/5">
            <Suspense fallback={<div>Loading...</div>}>
              <PathFinderForm
                FormData={handleSubmitForm}
                SheetOpen={setIsSheetOpen}
              />
            </Suspense>
          </div>
          <div className="ml-12 mt-2 w-4/5">
            <MapPathFinder
              origin={dataOriginForm}
              destination={dataDestinationForm}
            />
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex w-full flex-col lg:hidden">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="absolute z-20 m-4 size-14 rounded-full"
              >
                <PanelRightOpen />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <PathFinderForm
                FormData={handleSubmitForm}
                SheetOpen={setIsSheetOpen}
              />
            </SheetContent>
          </Sheet>
          <div className="w-full p-4">
            <MapPathFinder
              origin={dataOriginForm}
              destination={dataDestinationForm}
            />
          </div>
        </div>

        {/* Carousel Section */}
        <div className="w-11/12 pb-8">
          <CarouselSpacing destination={dataDestinationForm} />
        </div>

        <br />
        <br />
        <br />
        <br />
      </div>
    </NuqsAdapter>
  )
}

export default MapForm
