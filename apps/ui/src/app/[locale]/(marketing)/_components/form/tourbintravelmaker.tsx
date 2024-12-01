

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
import arrowX from "public/assets/icons/Polygon 2.png"
import arrowY from "public/assets/icons/Polygon 1.png"
import Image from "next/image"

export const Tourbintravelmaker = () => {
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
      <div className="flex flex-col gap-2">
        <SubmitButton className="w-full flex justify-between bg-[#EE4037] text-white" isLoading={isLoading}>{t("form.submit")}
          <Image src={arrowX} alt={''}/>
        </SubmitButton>
        <Button className="w-full flex text-black justify-between text-[#5C61F1]"  href="/blog">
          {t("form.goTo")}
          <Image src={arrowY} alt={''}/>
        </Button>
      </div>      
  )
}
