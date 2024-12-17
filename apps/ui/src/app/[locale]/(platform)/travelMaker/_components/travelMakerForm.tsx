"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "jalali-moment"
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
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField"
import SubmitButton from "@/components/forms/SubmitButton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"

// Inside your TravelMakerForm component:
const persianDate = moment().format("jYYYY-jM-jD") // Get the current Persian date

const [year, month, day] = persianDate.split("-").map(Number)

interface TravelMakerFormProps {
  setIsLoading?: Dispatch<SetStateAction<boolean>>
  setList?: Dispatch<SetStateAction<TravelMakerListRes>>
  setError?: Dispatch<SetStateAction<boolean>>
  submitFunction: (values: TravelMakerListReq) => void
}

const TravelMakerForm = (props: TravelMakerFormProps) => {
  const t = useTranslations("travelMaker")

  const [originQuery, setOriginQuery] = useQueryState("origin")
  const [distanceQuery, setDistanceQuery] = useQueryState("distance")
  const [durationQuery, setDurationQuery] = useQueryState("duration")
  const [tagsQuery, setTagsQuery] = useQueryState("tags")
  const [routeQuery, setRouteQuery] = useQueryState("route")
  const [vehicleQuery, setVehicleQuery] = useQueryState("vehicle")
  const [routStopQuery, setRoutStopQuery] = useQueryState("routStop")
  const [directionQuery, setDirectionQuery] = useQueryState("direction")
  const [accommodationQuery, setAccommodationQuery] =
    useQueryState("accommodation")
  const [oldPersonQuery, setOldPersonQuery] = useQueryState("oldPerson")
  const [accoFlag, setFlag] = useState("")

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
  })
  const { watch } = form
  const watchedValues = watch()

  useEffect(() => {
    const subscription = watch((values) => {
      if (values.duration === "1d") {
        console.log(values.duration)
        setFlag("hidden")
      } else {
        setFlag("")
      }
      // console.log(values.duration)
      // console.log(accoFlag)

      values.origin && setOriginQuery(values.origin)
      values.vehicle && setVehicleQuery(values.vehicle)
      values.routStop && setRoutStopQuery(values.routStop)
      values.tags && setTagsQuery(values.tags?.join(","))
      values.route && setRouteQuery(values.route)
      values.direction && setDirectionQuery(values.direction)
      values.accommodation && setAccommodationQuery(values.accommodation)
      values.duration && setDurationQuery(values.duration)
      values.distance && setDistanceQuery(values.distance)
      values.oldPerson === true
        ? setOldPersonQuery("true")
        : setOldPersonQuery("false")
    })

    return () => subscription.unsubscribe()
  }, [watch])

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
        overnight_stay:
          values.accommodation ?
          ([1, 2, 3] as const).at(
            tmsv.accommodation.indexOf(values.accommodation)
          ):0,
        count_of_elder_people: values.oldPerson ? 1 : 0,
        tags: values.tags.map((place) => tmsv.placeNature.indexOf(place)),
        means_of_travel:
          ([1, 2, 3, 4, 5, 6, 7, 8] as const).at(
            tmsv.vehicle.indexOf(values.vehicle)
          ) || 1,
        direction_of_movement:
          values.direction ?
          ([1, 2, 3, 4] as const).at(tmsv.direction.indexOf(values.direction)):0,
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
    <div className="h-full overflow-x-hidden p-5">
      <div className="flex h-full flex-wrap justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="origin"
              label={t("form.origin.title")}
              placeholder={t("form.origin.placeholder")}
            >
              {["تهران", "مشهد"].map((city, i) => (
                <SelectItem key={i} value={city}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{city}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="distance"
              label={t("form.distance.title")}
              placeholder={t("form.distance.placeholder")}
            >
              {tmsv.distance.map((dis, i) => (
                <SelectItem key={i} value={dis}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{t(`form.distance.select.${dis}`)}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.MULTISELECT}
              control={form.control}
              name="tags"
              label={t("form.place.placeholder")}
              placeholder={t("form.place.select.title-nature-placeHolder")}
              options={tmsv.placeNature.map((p) => ({
                value: p,
                label: t(`form.place.select.${p}`),
              }))}
            />
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="duration"
              label={t("form.duration.title")}
              placeholder={t("form.duration.placeholder")}
            >
              {tmsv.duration.map((time, i) => (
                <SelectItem key={i} value={time}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{t(`form.duration.select.${time}`)}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="route"
              label={t("form.route.title")}
              placeholder={t("form.route.placeholder")}
            >
              {tmsv.route.map((route, i) => (
                <SelectItem key={i} value={route}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{t(`form.route.select.${route}`)}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="routStop"
              label={t("form.destination-state.title")}
              placeholder={t("form.destination-state.placeholder")}
            >
              {tmsv.disState.map((state, i) => (
                <SelectItem key={i} value={state}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{t(`form.destination-state.select.${state}`)}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="vehicle"
              label={t("form.vehicle.title")}
              placeholder={t("form.vehicle.placeholder")}
            >
              {tmsv.vehicle.map((vehicle, i) => (
                <SelectItem key={i} value={vehicle}>
                  <div className="flex w-full cursor-pointer flex-row items-center gap-2 ltr:flex-row-reverse">
                    <p>{t(`form.vehicle.select.${vehicle}`)}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>
            <Accordion type="single" collapsible>
              <AccordionItem value="optional">
                <AccordionTrigger>{t("form.popover-button")}</AccordionTrigger>
                <AccordionContent>
                  <CustomFormField
                    fieldType={FormFieldType.CHECKBOX}
                    control={form.control}
                    name="oldPerson"
                    label={t("form.oldPerson.title")}
                    // placeholder={t("form.oldPerson.placeholder")}
                  />
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="direction"
                    label={t("form.travel-direction.title")}
                    placeholder={t("form.travel-direction.placeholder")}
                  >
                    {tmsv.direction.map((dir, i) => (
                      <SelectItem key={i} value={dir}>
                        <p>{t(`form.travel-direction.select.${dir}`)}</p>
                      </SelectItem>
                    ))}
                  </CustomFormField>
                  <CustomFormField
                    fieldType={FormFieldType.SELECT}
                    control={form.control}
                    name="accommodation"
                    label={t("form.accommodation.title")}
                    placeholder={t("form.accommodation.placeholder")}
                  >
                    {tmsv.accommodation.map((accommodation, i) => (
                      <SelectItem
                        key={i}
                        value={accommodation}
                        className={accoFlag}
                      >
                        <p>
                          {t(
                            `form.accommodation.accommodationSelect.${accommodation}`
                          )}
                        </p>
                      </SelectItem>
                    ))}
                  </CustomFormField>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <SubmitButton>{t("form.Button")}</SubmitButton>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default TravelMakerForm
