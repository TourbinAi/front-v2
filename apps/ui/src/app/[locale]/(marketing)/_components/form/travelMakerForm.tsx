"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { AppSelect } from "@/components/forms/AppSelect"
import SubmitButton from "@/components/forms/SubmitButton"

export const TravelMakerForm = () => {
  const t = useTranslations("travelMaker")
  const router = useRouter()
  const [accoFlag, setFlag] = useState(false)

  const form = useForm<z.infer<typeof SidebarSchema>>({
    resolver: zodResolver(SidebarSchema),
    defaultValues: {
      origin: "",
      distance: "3h",
      duration: "1d",
      vehicle: "car",
      oldPerson: false,
      accommodation: undefined,
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
    } as any).toString()
    router.push(`/travelMaker?${queryParams}`)
  }

  return (
    <AppForm form={form} onSubmit={onSubmit} className="w-3/4">
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
        name="vehicle"
        label={t("form.vehicle.title")}
        placeholder={t("form.vehicle.placeholder")}
        options={tmsv.vehicle.map((vehicle) => ({
          value: vehicle,
          label: t(`form.vehicle.select.${vehicle}`),
        }))}
      />

      <AppCheckbox name="oldPerson" label={t("form.oldPerson.title")} />

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
      <SubmitButton>{t("form.Button")}</SubmitButton>
    </AppForm>
  )
}
