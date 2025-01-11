"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRouter } from "@/lib/navigation"
import { souvenirsAndFood } from "@/lib/validation/landing"
import { AppField } from "@/components/forms/AppField"
import { AppForm } from "@/components/forms/AppForm"
import SubmitButton from "@/components/forms/SubmitButton"
import { Button } from "@/components/ui/button"

export const SouvenirsAndFoodForm = () => {
  const t = useTranslations("landingPage.featureDetails.souvenirsAndFood")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof souvenirsAndFood>>({
    resolver: zodResolver(souvenirsAndFood),
    defaultValues: {
      food: "",
      city: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof souvenirsAndFood>) => {
    setIsLoading(true)
    try {
      router.push("/blog/Souvenirs/?blogtype=2&blogid=3")
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
        name="food"
        label={t("form.food.title")}
        placeholder={t("form.food.placeholder")}
      />

      <AppField
        name="city"
        label={t("form.city.title")}
        placeholder={t("form.city.placeholder")}
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
