"use client"

import { useLocale, useTranslations } from "next-intl"
import { UseFormReturn } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/styles"
import {
  SidebarSchema,
  TravelMakerSelectValues as tmsv,
} from "@/lib/validation/travelMaker"
import { AppCheckbox } from "@/components/forms/AppCheckbox"
import { AppForm } from "@/components/forms/AppForm"
import { AppSelect } from "@/components/forms/AppSelect"
import SubmitButton from "@/components/forms/SubmitButton"

interface TravelMakerFormProps {
  form: UseFormReturn<z.infer<typeof SidebarSchema>>
  onSubmit: (data: z.infer<typeof SidebarSchema>) => void
  isLoading: boolean
  isSidebar?: boolean
  accoFlag: boolean
}

export function TravelMakerForm({
  form,
  onSubmit,
  isLoading,
  isSidebar = false,
  accoFlag,
}: TravelMakerFormProps) {
  const t = useTranslations("travelMaker")
  const locale = useLocale()

  return (
    <div className="mx-4 h-full" dir={locale === "fa" ? "rtl" : "ltr"}>
      <AppForm form={form} onSubmit={onSubmit}>
        <div
          className={cn(
            "flex w-full items-center justify-stretch gap-4",
            isSidebar ? "flex-col" : "flex-row"
          )}
        >
          <div className={cn(isSidebar ? "w-full" : "w-1/2")}>
            <AppSelect
              name="origin"
              label={t("form.origin.title")}
              placeholder={t("form.origin.placeholder")}
              options={["تهران", "مشهد"].map((city) => ({
                value: city,
                label: city,
              }))}
            />
          </div>
          <div className={cn(isSidebar ? "w-full" : "w-1/2")}>
            <AppSelect
              name="distance"
              label={t("form.distance.title")}
              placeholder={t("form.distance.placeholder")}
              options={tmsv.distance.map((dis) => ({
                value: dis,
                label: t(`form.distance.select.${dis}`),
              }))}
            />
          </div>
        </div>
        <div
          className={cn(
            "flex w-full items-center justify-stretch gap-4",
            isSidebar ? "flex-col" : "flex-row"
          )}
        >
          <div className={cn(isSidebar ? "w-full" : "w-1/2")}>
            <AppSelect
              name="duration"
              label={t("form.duration.title")}
              placeholder={t("form.duration.placeholder")}
              options={tmsv.duration.map((time) => ({
                value: time,
                label: t(`form.duration.select.${time}`),
              }))}
            />
          </div>
          <div className={cn(isSidebar ? "w-full" : "w-1/2")}>
            <AppSelect
              name="vehicle"
              label={t("form.vehicle.title")}
              placeholder={t("form.vehicle.placeholder")}
              options={tmsv.vehicle.map((vehicle) => ({
                value: vehicle,
                label: t(`form.vehicle.select.${vehicle}`),
              }))}
            />
          </div>
        </div>
        <AppCheckbox name="oldPerson" label={t("form.oldPerson.title")} />
        {accoFlag && (
          <AppSelect
            name="accommodation"
            label={t("form.accommodation.title")}
            placeholder={t("form.accommodation.placeholder")}
            options={tmsv.accommodation.map((accommodation) => ({
              value: accommodation,
              label: t(
                `form.accommodation.accommodationSelect.${accommodation}`
              ),
            }))}
          />
        )}
        <div className="flex items-center justify-center p-4">
          <SubmitButton isLoading={isLoading}>{t("form.Button")}</SubmitButton>
        </div>
      </AppForm>
    </div>
  )
}
