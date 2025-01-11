"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "jalali-moment"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

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

const persianDate = moment().format("jYYYY-jM-jD")

const [year, month, day] = persianDate.split("-").map(Number)

export const TravelMakerForm = () => {
  const t = useTranslations("travelMaker")
  const router = useRouter()
  const [accoFlag, setFlag] = useState(false)

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
    defaultValues: {
      origin: "",
      direction: "north",
      distance: "3h",
      duration: "1d",
      tags: [],
      route: "easy",
      vehicle: "car",
      oldPerson: false,
      routStop: "multiple",
      accommodation: undefined,
      date: {
        year: year,
        month: month,
        day: day,
      },
    },
  })

  // Watch duration for accommodation visibility
  const duration = form.watch("duration")
  if (duration === "1d" && accoFlag) {
    setFlag(false)
  } else if (duration !== "1d" && !accoFlag) {
    setFlag(true)
  }

  const onSubmit = async (values: z.infer<typeof SidebarSchema>) => {
    const queryParams = new URLSearchParams({
      ...values,
      date: values.date
        ? new Date(
            values.date.year,
            values.date.month - 1,
            values.date.day
          ).toISOString()
        : "",
    } as any).toString()
    router.push(`/travelMaker?${queryParams}`)
  }

  return (
    <div className="flex size-full flex-wrap justify-center">
      <AppForm form={form} onSubmit={onSubmit}>
        <AppSelect
          name="origin"
          label={t("form.origin.title")}
          placeholder={t("form.origin.placeholder")}
          options={["تهران", "مشهد"].map((city) => ({
            value: city,
            label: city,
          }))}
        />

        <AppSelect
          name="distance"
          label={t("form.distance.title")}
          placeholder={t("form.distance.placeholder")}
          options={tmsv.distance.map((dis) => ({
            value: dis,
            label: t(`form.distance.select.${dis}`),
          }))}
        />

        <AppMultiSelect
          name="tags"
          label={t("form.place.placeholder")}
          options={tmsv.placeNature.map((p) => ({
            value: p,
            label: t(`form.place.select.${p}`),
          }))}
          setQueryState={(value) =>
            Promise.resolve(new URLSearchParams({ tags: value || "" }))
          }
        />

        <AppSelect
          name="duration"
          label={t("form.duration.title")}
          placeholder={t("form.duration.placeholder")}
          options={tmsv.duration.map((time) => ({
            value: time,
            label: t(`form.duration.select.${time}`),
          }))}
        />

        <AppSelect
          name="route"
          label={t("form.route.title")}
          placeholder={t("form.route.placeholder")}
          options={tmsv.route.map((route) => ({
            value: route,
            label: t(`form.route.select.${route}`),
          }))}
        />

        <AppSelect
          name="routStop"
          label={t("form.destination-state.title")}
          placeholder={t("form.destination-state.placeholder")}
          options={tmsv.disState.map((state) => ({
            value: state,
            label: t(`form.destination-state.select.${state}`),
          }))}
        />

        <AppSelect
          name="vehicle"
          label={t("form.vehicle.title")}
          placeholder={t("form.vehicle.placeholder")}
          options={tmsv.vehicle.map((vehicle) => ({
            value: vehicle,
            label: t(`form.vehicle.select.${vehicle}`),
          }))}
        />

        <Accordion type="single" collapsible>
          <AccordionItem value="optional">
            <AccordionTrigger>{t("form.popover-button")}</AccordionTrigger>
            <AccordionContent>
              <AppCheckbox name="oldPerson" label={t("form.oldPerson.title")} />

              <AppSelect
                name="direction"
                label={t("form.travel-direction.title")}
                placeholder={t("form.travel-direction.placeholder")}
                options={tmsv.direction.map((dir) => ({
                  value: dir,
                  label: t(`form.travel-direction.select.${dir}`),
                }))}
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
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <SubmitButton>{t("form.Button")}</SubmitButton>
      </AppForm>
    </div>
  )
}
