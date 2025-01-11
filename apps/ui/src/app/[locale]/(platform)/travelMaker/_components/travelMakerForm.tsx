"use client"

import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useQueryState } from "nuqs"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { TravelMakerListReq, TravelMakerListRes } from "@/types/api"

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

const defaultFormValues = {
  origin: "تهران",
  distance: "3h" as const,
  duration: "1d" as const,
  tags: ["shadowAndGreen"] as (typeof tmsv.placeNature)[number][],
  route: "easy" as const,
  vehicle: "car" as const,
  routStop: "oneWay" as const,
  direction: "north" as const,
  accommodation: "camp" as const,
  oldPerson: false,
}

interface TravelMakerFormProps {
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  setList?: Dispatch<SetStateAction<TravelMakerListRes>>
  setError?: Dispatch<SetStateAction<boolean>>
  submitFunction: (values: TravelMakerListReq) => void
}

const TravelMakerForm = (props: TravelMakerFormProps) => {
  const t = useTranslations("travelMaker")
  const [accoFlag, setFlag] = useState(true)
  const params = useSearchParams()

  const firstValue = useMemo(
    () => ({
      ...defaultFormValues,
      ...params,
    }),
    [params]
  )

  const [originQuery, setOriginQuery] = useQueryState("origin", {
    history: "push",
    parse: (value) => value || firstValue.origin,
  })
  const [distanceQuery, setDistanceQuery] = useQueryState("distance", {
    history: "push",
    parse: (value) => value || firstValue.distance,
  })
  const [durationQuery, setDurationQuery] = useQueryState("duration", {
    history: "push",
    defaultValue: firstValue.duration,
  })
  const [tagsQuery, setTagsQuery] = useQueryState("tags", {
    history: "push",
    defaultValue: firstValue.tags.join(","),
  })
  const [routeQuery, setRouteQuery] = useQueryState("route", {
    history: "push",
    defaultValue: firstValue.route,
  })
  const [vehicleQuery, setVehicleQuery] = useQueryState("vehicle", {
    history: "push",
    defaultValue: firstValue.vehicle,
  })
  const [routStopQuery, setRoutStopQuery] = useQueryState("routStop", {
    history: "push",
    defaultValue: firstValue.routStop,
  })
  const [directionQuery, setDirectionQuery] = useQueryState("direction", {
    history: "push",
    defaultValue: firstValue.direction,
  })
  const [accommodationQuery, setAccommodationQuery] = useQueryState(
    "accommodation",
    {
      history: "push",
      defaultValue: firstValue.accommodation,
    }
  )
  const [oldPersonQuery, setOldPersonQuery] = useQueryState("oldPerson", {
    history: "push",
    parse: (value) => value || firstValue.oldPerson,
  })

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
    defaultValues: firstValue,
  })

  // Reset form when URL parameters change
  useEffect(() => {
    form.reset({
      origin: originQuery || firstValue.origin,
      distance: (distanceQuery ||
        firstValue.distance) as (typeof tmsv.distance)[number],
      duration: (durationQuery ||
        firstValue.duration) as (typeof tmsv.duration)[number],
      tags: tagsQuery
        ? (tagsQuery.split(",") as (typeof tmsv.placeNature)[number][])
        : firstValue.tags,
      route: (routeQuery || firstValue.route) as (typeof tmsv.route)[number],
      vehicle: (vehicleQuery ||
        firstValue.vehicle) as (typeof tmsv.vehicle)[number],
      routStop: (routStopQuery ||
        firstValue.routStop) as (typeof tmsv.disState)[number],
      direction: (directionQuery ||
        firstValue.direction) as (typeof tmsv.direction)[number],
      accommodation: (accommodationQuery ||
        firstValue.accommodation) as (typeof tmsv.accommodation)[number],
      oldPerson: oldPersonQuery ? firstValue.oldPerson : false,
    })
  }, [
    form,
    originQuery,
    distanceQuery,
    durationQuery,
    tagsQuery,
    routeQuery,
    vehicleQuery,
    routStopQuery,
    directionQuery,
    accommodationQuery,
    oldPersonQuery,
    firstValue,
  ])

  // Watch duration for accommodation visibility
  const duration = form.watch("duration")
  if (duration === "1d" && accoFlag) {
    setFlag(false)
  } else if (duration !== "1d" && !accoFlag) {
    setFlag(true)
  }

  const onSubmit = async (values: z.infer<typeof SidebarSchema>) => {
    props.setIsLoading?.(true)
    props.setError?.(false)

    try {
      const requestObject: TravelMakerListReq = {
        origin_of_trip: values.origin,
        distance_from_origin:
          ([3, 5, 7] as const).at(tmsv.distance.indexOf(values.distance)) || 3,
        time_limit:
          ([1, 2, 3] as const).at(tmsv.duration.indexOf(values.duration)) || 1,
        route_type: ([1, 2] as const).at(tmsv.route.indexOf(values.route)) || 1,
        stop_and_quit:
          ([1, 2] as const).at(tmsv.disState.indexOf(values.routStop)) || 1,
        overnight_stay: values.accommodation
          ? ([1, 2, 3] as const).at(
              tmsv.accommodation.indexOf(values.accommodation)
            ) || 0
          : 0,
        count_of_elder_people: values.oldPerson ? 1 : 0,
        tags: values.tags.map((place) => tmsv.placeNature.indexOf(place)),
        means_of_travel:
          ([1, 2, 3, 4, 5, 6, 7, 8] as const).at(
            tmsv.vehicle.indexOf(values.vehicle)
          ) || 1,
        direction_of_movement: values.direction
          ? ([1, 2, 3, 4] as const).at(
              tmsv.direction.indexOf(values.direction)
            ) || 0
          : 0,
      }
      await props.submitFunction(requestObject)
    } catch (error) {
      console.error("Form submission failed:", error)
      toast.error(t("form.error"))
      props.setError?.(true)
      throw error
    } finally {
      props.setIsLoading?.(false)
    }
  }

  return (
    <AppForm form={form} className="mx-6" onSubmit={onSubmit}>
      <AppSelect
        name="origin"
        label={t("form.origin.title")}
        placeholder={t("form.origin.placeholder")}
        options={["تهران", "مشهد"].map((city) => ({
          value: city,
          label: city,
        }))}
        setQueryState={setOriginQuery}
      />

      <AppSelect
        name="distance"
        label={t("form.distance.title")}
        placeholder={t("form.distance.placeholder")}
        options={tmsv.distance.map((dis) => ({
          value: dis,
          label: t(`form.distance.select.${dis}`),
        }))}
        setQueryState={setDistanceQuery}
      />

      <AppMultiSelect
        name="tags"
        label={t("form.place.placeholder")}
        // placeholder={t("form.place.select.title-nature-placeHolder")}
        options={tmsv.placeNature.map((p) => ({
          value: p,
          label: t(`form.place.select.${p}`),
        }))}
        setQueryState={setTagsQuery}
      />

      <AppSelect
        name="duration"
        label={t("form.duration.title")}
        placeholder={t("form.duration.placeholder")}
        options={tmsv.duration.map((time) => ({
          value: time,
          label: t(`form.duration.select.${time}`),
        }))}
        setQueryState={setDurationQuery}
      />

      <AppSelect
        name="route"
        label={t("form.route.title")}
        placeholder={t("form.route.placeholder")}
        options={tmsv.route.map((route) => ({
          value: route,
          label: t(`form.route.select.${route}`),
        }))}
        setQueryState={setRouteQuery}
      />

      <AppSelect
        name="routStop"
        label={t("form.destination-state.title")}
        placeholder={t("form.destination-state.placeholder")}
        options={tmsv.disState.map((state) => ({
          value: state,
          label: t(`form.destination-state.select.${state}`),
        }))}
        setQueryState={setRoutStopQuery}
      />

      <AppSelect
        name="vehicle"
        label={t("form.vehicle.title")}
        placeholder={t("form.vehicle.placeholder")}
        options={tmsv.vehicle.map((vehicle) => ({
          value: vehicle,
          label: t(`form.vehicle.select.${vehicle}`),
        }))}
        setQueryState={setVehicleQuery}
      />

      <Accordion type="single" collapsible>
        <AccordionItem value="optional">
          <AccordionTrigger>{t("form.popover-button")}</AccordionTrigger>
          <AccordionContent>
            <AppCheckbox
              name="oldPerson"
              label={t("form.oldPerson.title")}
              setQueryState={setOldPersonQuery}
            />

            <AppSelect
              name="direction"
              label={t("form.travel-direction.title")}
              placeholder={t("form.travel-direction.placeholder")}
              options={tmsv.direction.map((dir) => ({
                value: dir,
                label: t(`form.travel-direction.select.${dir}`),
              }))}
              setQueryState={setDirectionQuery}
            />

            {accoFlag && (
              <AppSelect
                name="accommodation"
                label={t("form.accommodation.title")}
                placeholder={t("form.accommodation.placeholder")}
                options={tmsv.accommodation.map((acc) => ({
                  value: acc,
                  label: t(`form.accommodation.accommodationSelect.${acc}`),
                }))}
                setQueryState={setAccommodationQuery}
              />
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <SubmitButton>{t("form.Button")}</SubmitButton>
    </AppForm>
  )
}

export default TravelMakerForm
