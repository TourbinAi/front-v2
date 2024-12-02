"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as Sentry from "@sentry/nextjs" //error handling
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { NeshanDataItemType } from "@/types/api"

import { useRouter } from "@/lib/navigation"
import { neshanSearchAPI } from "@/lib/neshan"
import { PathFinderSchemaLanding } from "@/lib/validation/pathFinder"
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback"
import { AppAutoComplete } from "@/components/forms/AppAutoComplete"
import { AppForm } from "@/components/forms/AppForm"
import SubmitButton from "@/components/forms/SubmitButton"
import camerman2Small from "public/assets/images/cameramanTWOSMALL.png"
import Image from "next/image"
export const PathFinderForm = () => {
  const t = useTranslations("PathFinder")
  const [isLoading, setIsLoading] = useState(false)
  const [neshanDataOrigin, setNeshanDataOrigin] = useState<
    NeshanDataItemType[]
  >([])
  const [neshanDataDestinations, setNeshanDataDestinations] = useState<
    NeshanDataItemType[]
  >([])
  const [DataOrigin, setDataOrigin] = useState<NeshanDataItemType>()
  const [DataDestination, setDataDestination] = useState<NeshanDataItemType[]>(
    []
  )
  const [loadingOrigin, setLoadOrigin] = useState<boolean>(false)
  const [loadingDes, setLoadDes] = useState<boolean>(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof PathFinderSchemaLanding>>({
    resolver: zodResolver(PathFinderSchemaLanding),
    defaultValues: {
      origin: "",
      destination: "",
    },
  })
  //push data in url
  const onSubmit = async (values: z.infer<typeof PathFinderSchemaLanding>) => {
    setIsLoading(true)
    try {
      setIsLoading(true)
      const serializedDataOrigin = encodeURIComponent(
        JSON.stringify(DataOrigin)
      )
      const serializedDataDes = encodeURIComponent(
        JSON.stringify(DataDestination)
      )
      router.push(
        `/pathFinder?origin=${serializedDataOrigin}&des=${serializedDataDes}`
      )
    } catch (error) {
      setIsLoading(false)
      Sentry.captureException(error)
    }
  }
  //api request
  const fetchData = async (
    newValue: string,
    type: "origin" | "destination"
  ) => {
    try {
      const response = await neshanSearchAPI(newValue)
      const data = response.data.items

      if (type === "origin") {
        setNeshanDataOrigin(data.slice(0, 5))
        setLoadOrigin(false)
      } else if (type === "destination") {
        setNeshanDataDestinations(data.slice(0, 5))
        setLoadDes(false)
      }
    } catch (error) {
      Sentry.captureException(error)
      setIsLoading(false)
      if (type === "destination") setLoadDes(false)
    }
  }

  const debouncedFetchData = useDebouncedCallback(fetchData, 1000) //debounce request
  //user search location handler
  const changeHandler = (newValue: string, type: "origin" | "destination") => {
    if (type === "origin") {
      setLoadOrigin(true)
    } else if (type === "destination") {
      setLoadDes(true)
    }

    debouncedFetchData(newValue, type)
  }
  //user select location handler
  const handleItemClick = (item: string, type: "origin" | "destination") => {
    if (type === "origin") {
      setDataOrigin(neshanDataOrigin.find((data) => data.title === item))
      form.setValue("origin", item)
    } else if (type === "destination") {
      let dataObj = neshanDataDestinations?.find((data) => data.title === item)
      dataObj && setDataDestination([dataObj])
      form.setValue(`destination`, item)
    }
  }
  //dynamic render autoComplete
  const renderAutoComplete = (type: "origin" | "destination") => (
    <AppAutoComplete
      formFieldName={type}
      items={(type === "origin"
        ? neshanDataOrigin
        : neshanDataDestinations
      )?.map((item) => item.title)}
      isLoading={type === "origin" ? loadingOrigin : loadingDes}
      placeholder={t(`${type}.placeHolder`)}
      onChangeHandler={(e) => changeHandler(e, type)}
      itemClickHandler={(item) => handleItemClick(item, type)}
    />
  )

  return (
    <AppForm form={form} onSubmit={onSubmit}>
      <div className="flex">
        <div className="flex justify-center lg:hidden bg-[#ECEDFD] w-[50%] lg:w-full rounded-xl lg:hidden ">
          <div className=" relative flex itmes-center items-end justify-center h-full">
            <Image
              alt="compass"
              src={camerman2Small}
              className=" h-full object-contain "
            />
          </div>
        </div>
        <div className="flex flex-col w-[70%] lg:w-full gap-2">
          <div className="lg:flex  flex-col flex-wrap text-center border border-[#5C61F1] rounded-xl p-1 bg-white text-[#5C61F1] opacity-60">
            {renderAutoComplete("origin")}
          </div>
          <div className=" text-center  relative lg:mb-6 lg:mt-8 border border-[#5C61F1] rounded-xl p-1 bg-white text-[#5C61F1] opacity-60">
            {renderAutoComplete("destination")}
          </div>
          <SubmitButton isLoading={isLoading}>{t("submit")}</SubmitButton>
        </div>
      </div>
    </AppForm>
  )
}
