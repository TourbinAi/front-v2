"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "jalali-moment"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { TravelMakerListReq, TravelMakerListRes } from "@/types/api"

import { TravelMakerList } from "@/lib/api"
import { useRouter } from "@/lib/navigation"
import {
  SidebarSchema,
  TravelMakerSelectValues as tmsv,
} from "@/lib/validation/travelMaker"
import { AppCheckbox } from "@/components/forms/AppCheckbox"
import { AppForm } from "@/components/forms/AppForm"
import { AppMultiSelect } from "@/components/forms/AppMultiSelect"
import { AppSelect } from "@/components/forms/AppSelect"
import SubmitButton from "@/components/forms/SubmitButton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import RouteCard from "./card"
import SheetLayout from "./sheetLayout"

// Inside your TravelMakerForm component:
const persianDate = moment().format("jYYYY-jM-jD") // Get the current Persian date

const [year, month, day] = persianDate.split("-").map(Number)

const defaultValue = {
  origin: "",
  direction: "north",
  distance: "3h",
  duration: "2d",
  tags: ["sunnyAndSea"],
  route: "easy",
  vehicle: "car",
  oldPerson: false,
  routStop: "oneWay",
  accommodation: "camp",
  date: {
    year: year,
    month: month,
    day: day,
  },
} as z.infer<typeof SidebarSchema>

export default function TravelMaker() {
  const searchParams = useSearchParams()
  const query = Object.fromEntries(searchParams.entries())
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<TravelMakerListRes>()
  const [isInitialLoad, setIsInitialLoad] = useState(true)

  const t = useTranslations("travelMaker")
  const router = useRouter()

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
    defaultValues: defaultValue,
  })

  const updateQuery = useCallback(() => {
    const queryParams = new URLSearchParams(form.getValues() as any).toString()
    router.push(`/travelMaker?${queryParams}`)
  }, [form, router])

  const onSubmit = useCallback(
    async (values: z.infer<typeof SidebarSchema>) => {
      updateQuery()
      setLoading(true)
      try {
        const requestObject: TravelMakerListReq = {
          origin_of_trip: values.origin,
          distance_from_origin:
            ([3, 5, 7] as const).at(tmsv.distance.indexOf(values.distance)) ||
            3,
          time_limit:
            ([1, 2, 3] as const).at(tmsv.duration.indexOf(values.duration)) ||
            1,
          route_type:
            ([1, 2] as const).at(tmsv.route.indexOf(values.route)) || 1,
          stop_and_quit:
            ([1, 2] as const).at(tmsv.disState.indexOf(values.routStop)) || 1,
          overnight_stay: ([1, 2, 3] as const).at(
            tmsv.accommodation.indexOf(values.accommodation)
          ),
          count_of_elder_people: values.oldPerson ? 1 : 0,
          tags: values.tags.map((place) => tmsv.placeNature.indexOf(place)),
          means_of_travel:
            ([1, 2, 3, 4, 5, 6, 7, 8] as const).at(
              tmsv.vehicle.indexOf(values.vehicle)
            ) || 1,
          direction_of_movement: ([1, 2, 3, 4] as const).at(
            tmsv.direction.indexOf(values.direction)
          ),
        }

        const respond = await TravelMakerList(requestObject)
        setList(respond.data)
      } catch (error) {
        console.error("Form submission failed:", error)
        toast.error(t("submissionError"))
      } finally {
        setLoading(false)
        setOpen(false)
      }
    },
    [updateQuery, t]
  )

  useEffect(() => {
    // Only process query if there are query parameters and it's the first load
    if (!isInitialLoad || Object.keys(query).length === 0) return
    const parseTags = (tags: string): string[] => (tags ? tags.split(",") : [])

    const parseDate = (dateStr: string | undefined): Date | undefined => {
      if (dateStr) {
        const parsedDate = new Date(dateStr)
        return isNaN(parsedDate.getTime()) ? undefined : parsedDate
      }
      return undefined
    }

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
      tags: parseTags(query.tags || "").filter((tag) =>
        tmsv.placeNature.includes(tag as any)
      ),
      route: tmsv.route.includes(query.route as any)
        ? (query.route as any)
        : defaultValue.route,
      vehicle: tmsv.vehicle.includes(query.vehicle as any)
        ? (query.vehicle as any)
        : defaultValue.vehicle,
      routStop: tmsv.disState.includes(query.routStop as any)
        ? (query.routStop as any)
        : defaultValue.routStop,
      direction: tmsv.direction.includes(query.direction as any)
        ? (query.direction as any)
        : defaultValue.direction,
      oldPerson: query.oldPerson
        ? query.oldPerson === "false"
          ? false
          : true
        : defaultValue.oldPerson,
      accommodation: tmsv.accommodation.includes(query.accommodation as any)
        ? (query.accommodation as any)
        : defaultValue.accommodation,
      date: parseDate(query.date) || defaultValue.date,
    }

    const result = SidebarSchema.safeParse(safeQuery)
    if (result.success) {
      // Reset form with the new default values
      form.reset(result.data)

      // Trigger submission only once
      setIsInitialLoad(false)

      // Only submit if not already loading
      if (!loading) {
        form.handleSubmit(onSubmit)()
      }
    } else {
      console.error("Query parsing or schema validation failed", result.error)
      setIsInitialLoad(false)
    }
  }, [query, form, onSubmit, isInitialLoad, loading, updateQuery])

  return (
    <SheetLayout
      open={open}
      setOpen={setOpen}
      button={typeof list === "undefined" ? false : list.length !== 0}
      sideBarComponent={
        <div className="flex h-full flex-wrap justify-center overflow-y-scroll pt-3">
          <AppForm className="w-full" form={form} onSubmit={onSubmit}>
            <AppSelect
              name="origin"
              label={t("form.origin.title")}
              placeholder={t("form.origin.placeholder")}
              options={["تهران", "مشهد"].map((city) => ({
                label: city,
                value: city,
              }))}
            />
            <AppSelect
              name="distance"
              label={t("form.distance.title")}
              placeholder={t("form.distance.placeholder")}
              options={tmsv.distance.map((dis) => ({
                label: t(`form.distance.select.${dis}`),
                value: dis,
              }))}
            />
            <AppMultiSelect
              name="tags"
              label={t("form.place.placeholder")}
              placeholder={t("form.place.select.title-nature-placeHolder")}
              options={tmsv.placeNature.map((p) => ({
                value: p,
                label: t(`form.place.select.${p}`),
              }))}
            />
            <AppSelect
              name="duration"
              label={t("form.duration.title")}
              placeholder={t("form.duration.placeholder")}
              options={tmsv.duration.map((time) => ({
                label: t(`form.duration.select.${time}`),
                value: time,
              }))}
            />
            <AppSelect
              name="route"
              label={t("form.route.title")}
              placeholder={t("form.route.placeholder")}
              options={tmsv.route.map((route) => ({
                label: t(`form.route.select.${route}`),
                value: route,
              }))}
            />
            <AppSelect
              name="routStop"
              label={t("form.destination-state.title")}
              placeholder={t("form.destination-state.placeholder")}
              options={tmsv.disState.map((state) => ({
                label: t(`form.destination-state.select.${state}`),
                value: state,
              }))}
            />
            <AppSelect
              name="vehicle"
              label={t("form.vehicle.title")}
              placeholder={t("form.vehicle.placeholder")}
              options={tmsv.vehicle.map((vehicle) => ({
                label: t(`form.vehicle.select.${vehicle}`),
                value: vehicle,
              }))}
            />
            <Accordion type="single" collapsible>
              <AccordionItem value="optional">
                <AccordionTrigger>{t("form.popover-button")}</AccordionTrigger>
                <AccordionContent>
                  <AppCheckbox
                    name="oldPerson"
                    label={t("form.oldPerson.title")}
                  />
                  <AppSelect
                    name="direction"
                    label={t("form.travel-direction.title")}
                    placeholder={t("form.travel-direction.placeholder")}
                    options={tmsv.direction.map((dir) => ({
                      label: t(`form.travel-direction.select.${dir}`),
                      value: dir,
                    }))}
                  />
                  <AppSelect
                    name="accommodation"
                    label={t("form.accommodation.title")}
                    placeholder={t("form.accommodation.placeholder")}
                    options={tmsv.accommodation.map((accommodation) => ({
                      label: t(
                        `form.accommodation.accommodationSelect.${accommodation}`
                      ),
                      value: accommodation,
                    }))}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SubmitButton isLoading={loading}>{t("form.Button")}</SubmitButton>
          </AppForm>
        </div>
      }
    >
      {loading ? (
        <div className="flx-col flex w-full gap-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <>
          {list ? (
            <>
              {list.length === 0 ? (
                <div className="flex size-full items-center justify-center">
                  <Card className="max-w-96">
                    <CardHeader className="flex w-full flex-col items-center justify-center">
                      <CardTitle className="flex gap-2 pb-2">
                        <span>{t("form.noResults")}</span>
                        <span className="-translate-y-1 text-2xl">):</span>
                      </CardTitle>
                      <CardDescription className="text-center">
                        {t("form.tryAnother")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex size-full flex-col items-center justify-center">
                      <Button
                        className="flex lg:hidden"
                        variant="outline"
                        onClick={() => setOpen(true)}
                      >
                        <ChevronRight />
                        {t("form.form-header.fillForm")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  {list.map((item) => (
                    <RouteCard
                      key={item.id}
                      id={item.id}
                      name={item.description}
                      description={item.description}
                      latitude={item.latitude}
                      longitude={item.longitude}
                      cities={[...item.places].reverse()}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex size-full items-center justify-center">
              <Card className="max-w-96">
                <CardHeader className="flex w-full flex-col items-center justify-center">
                  <CardTitle className="pb-2">
                    {t("form.form-header.title")}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t("form.form-header.text")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex size-full flex-col items-center justify-center">
                  <Button
                    className="flex lg:hidden"
                    variant="outline"
                    onClick={() => setOpen(true)}
                  >
                    <ChevronRight />
                    {t("form.form-header.fillForm")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </SheetLayout>
  )
}
