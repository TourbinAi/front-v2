"use client"

import { useCallback, useEffect, useState, useTransition } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { TravelMakerListReq, TravelMakerListRes } from "@/types/api"

import { TravelMakerList } from "@/lib/api"
import { useRouter } from "@/lib/navigation"
import {
  SidebarSchema,
  TravelMakerSelectValues as tmsv,
} from "@/lib/validation/travelMaker"
import { useIsMobile } from "@/hooks/useIsMobile"

import CardList from "./cardList"
import SheetLayout from "./sheetLayout"
import { TravelMakerForm } from "./travelMakerForm"

const defaultValue = {
  origin: "",
  direction: "north",
  distance: "3h",
  duration: "2d",
  tags: ["sun_and_sea"],
  route: "easy",
  vehicle: "car",
  oldPerson: false,
  routStop: "oneWay",
  accommodation: undefined,
} as z.infer<typeof SidebarSchema>

// Create request object outside component to avoid recreation
const createRequestObject = (
  values: z.infer<typeof SidebarSchema>,
  accoFlag: boolean
): TravelMakerListReq => ({
  origin_of_trip: values.origin,
  distance_from_origin:
    ([3, 5, 7] as const).at(tmsv.distance.indexOf(values.distance)) || 3,
  time_limit:
    ([1, 2, 3] as const).at(tmsv.duration.indexOf(values.duration)) || 1,
  overnight_stay: accoFlag
    ? ([1, 2, 3] as const).at(
        tmsv.accommodation.indexOf(
          values.accommodation as "camp" | "hotel" | "visit"
        )
      )
    : undefined,
  count_of_elder_people: values.oldPerson ? 1 : 0,
  means_of_travel:
    ([1, 2, 3, 4, 5, 6, 7, 8] as const).at(
      tmsv.vehicle.indexOf(values.vehicle)
    ) || 1,
})

export default function TravelMaker() {
  const [loading, setLoading] = useState<boolean>(false)
  const [initialLoading, setInitialLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  const [accoFlag, setAccoFlag] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [list, setList] = useState<TravelMakerListRes>()
  const [isPending, startTransition] = useTransition()

  const isMobile = useIsMobile()
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
    defaultValues: defaultValue,
  })

  const fetchTravelMakerList = useCallback(
    async (requestObject: TravelMakerListReq) => {
      try {
        const response = await TravelMakerList(requestObject)
        setList(response.data)
        setError(null)
      } catch (error) {
        console.error("Data fetch failed:", error)
        setError("Failed to load travel suggestions. Please try again.")
        setList(undefined)
      }
    },
    []
  )

  const onSubmit = useCallback(
    async (values: z.infer<typeof SidebarSchema>) => {
      setLoading(true)
      setError(null)

      try {
        const requestObject = createRequestObject(values, accoFlag)
        await fetchTravelMakerList(requestObject)

        // Update URL in a non-blocking way
        startTransition(() => {
          const queryParams = new URLSearchParams(values as any).toString()
          router.push(`/travelMaker?${queryParams}`, { scroll: false })
        })
      } finally {
        setLoading(false)
        setOpen(false)
      }
    },
    [accoFlag, fetchTravelMakerList, router]
  )

  // Handle initial query params
  useEffect(() => {
    const initializeFromQuery = async () => {
      if (Object.keys(query).length > 0) {
        const safeQuery = {
          origin: query.origin
            ? decodeURIComponent(query.origin)
            : defaultValue.origin,
          distance: tmsv.distance.includes(query.distance as any)
            ? (query.distance as any)
            : defaultValue.distance,
          duration: ["1d", "2d", "3d"].includes(query.duration as any)
            ? (query.duration as any)
            : defaultValue.duration,
          vehicle: tmsv.vehicle.includes(query.vehicle as any)
            ? (query.vehicle as any)
            : defaultValue.vehicle,
          oldPerson: query.oldPerson
            ? query.oldPerson === "false"
              ? false
              : true
            : defaultValue.oldPerson,
          accommodation: accoFlag
            ? tmsv.accommodation.includes(query.accommodation as any)
              ? (query.accommodation as any)
              : defaultValue.accommodation
            : undefined,
        }

        const result = SidebarSchema.safeParse(safeQuery)
        if (result.success) {
          form.reset(result.data)
          await onSubmit(result.data)
        } else {
          console.error("Query validation failed", result.error)
          setError("Invalid search parameters")
        }
      }
      setInitialLoading(false)
      setMounted(true)
    }

    initializeFromQuery()
  }, [])

  // Watch duration for accommodation visibility
  const duration = form.watch("duration")
  useEffect(() => {
    if (duration === "1d" && accoFlag) {
      setAccoFlag(false)
    } else if (duration !== "1d" && !accoFlag) {
      setAccoFlag(true)
    }
  }, [duration, accoFlag])

  if (!mounted) return null

  return (
    <SheetLayout
      open={open}
      setOpen={setOpen}
      button={typeof list === "undefined" ? false : list.length !== 0}
      sideBarComponent={
        <TravelMakerForm
          form={form}
          onSubmit={onSubmit}
          isSidebar={isMobile}
          accoFlag={accoFlag}
          isLoading={loading || isPending}
        />
      }
    >
      <CardList
        loading={loading || initialLoading}
        error={error}
        results={list}
        setOpen={setOpen}
      />
    </SheetLayout>
  )
}
