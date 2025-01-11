"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRouter } from "@/lib/navigation"
import { celebrationsAndEvents } from "@/lib/validation/landing"
import { AppField } from "@/components/forms/AppField"
import { AppForm } from "@/components/forms/AppForm"
import { AppSelect } from "@/components/forms/AppSelect"
import SubmitButton from "@/components/forms/SubmitButton"
import { Button } from "@/components/ui/button"

const months = [
  "farvardin",
  "ordibehesht",
  "khordad",
  "tir",
  "mordad",
  "shahrivar",
  "mehr",
  "aban",
  "azar",
  "day",
  "bahman",
  "esfand",
] as const

export const CelebrationsAndEventForm = () => {
  const t = useTranslations("landingPage.featureDetails.celebrationsAndEvents")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof celebrationsAndEvents>>({
    resolver: zodResolver(celebrationsAndEvents),
    defaultValues: {
      occasion: "",
      month: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof celebrationsAndEvents>) => {
    setIsLoading(true)
    try {
      router.push("/blog/event/?blogtype=3&blogid=3")
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  return (
    <AppForm
      form={form}
      onSubmit={onSubmit}
      className="w-full flex-1 space-y-4"
    >
      <AppField
        name="occasion"
        label={t("form.occasion.title")}
        placeholder={t("form.occasion.placeholder")}
      />

      <AppSelect
        name="month"
        label={t("form.month.title")}
        placeholder={t("form.month.placeholder")}
        options={months.map((month) => ({
          value: month,
          label: t(`form.month.options.${month}`),
        }))}
      />

      <SubmitButton className="mb-1 w-full" isLoading={isLoading}>
        {t("form.submit")}
      </SubmitButton>

      <Button className="mt-4 w-full" variant="outline" href="/blog">
        {t("form.goTo")}
      </Button>
    </AppForm>
  )
}
