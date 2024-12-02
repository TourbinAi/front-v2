"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { useRouter } from "@/lib/navigation"
import { souvenirsAndFood } from "@/lib/validation/landing"
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField"
import SubmitButton from "@/components/forms/SubmitButton"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import Image from "next/image"
import cameraman4Small from 'public/assets/images/cameramenFOURSMALL.png'


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

  const onSubmit = async () => {
    setIsLoading(true)
    router.push("/blog/Souvenirs/?blogtype=2&blogid=3")
    try {
      setIsLoading(true)
    } catch (error) {
      console.error(error)
    }

    setIsLoading(false)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex-1 space-y-4 "
      >
        <div className="flex items-end -mb-4">
          <div className=" lg:hidden rounded-xl w-[40%]">
            <div className="flex items-end justify-end relative  h-full">
              <Image
                alt="compass"
                src={cameraman4Small}
                className=" h-full object-cover"
              />
            </div>
          </div>
          <div className="w-[55%] lg:w-full">
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="food"
              // label={t("form.food.title")}
              placeholder={t("form.food.placeholder")}
              iconAlt="food"
            />
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name="city"
              // label={t("form.city.title")}
              placeholder={t("form.city.placeholder")}
              iconAlt="city"
            />
          </div>

        </div>
        <SubmitButton isLoading={isLoading}>{t("form.submit")}</SubmitButton>
      </form>
      <Button className="w-full text-[#5C61F1] mt-2" variant="outline" href="/blog">
        {t("form.goTo")}
      </Button>
    </Form>
  )
}
