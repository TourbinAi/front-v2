"use client"

import { useEffect, useState } from "react"
import { useRouter } from "@/lib/navigation" 
import { zodResolver } from "@hookform/resolvers/zod"
import * as Sentry from "@sentry/nextjs" //error handling
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { z } from "zod"

import type { NeshanDataItemType } from "@/types/api"

import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { neshanSearchAPI } from "@/lib/neshan"; 
import { PathFinderSchemaLanding } from "@/lib/validation/pathFinder"
import SubmitButton from "@/components/forms/SubmitButton";
import { AutoComplete } from "@/components/ui/autoComplete";
import { Form } from "@/components/ui/form"; 

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
      setNeshanDataOrigin([])
      setLoadOrigin(true)
    } else if (type === "destination") {
      setNeshanDataDestinations([])
      setLoadDes(true)
    }

    debouncedFetchData(newValue, type)
  }
  //user select location handler
  const handleItemClick = (
    item: NeshanDataItemType,
    type: "origin" | "destination"
  ) => {
    if (type === "origin") {
      setDataOrigin(item)
      setNeshanDataOrigin([])
      form.setValue("origin", item.title)
    } else if (type === "destination") {
      setDataDestination([item])
      setNeshanDataDestinations([])
      form.setValue(`destination`, item.title)
    }
  }
  //dynamic render autoComplete
  const renderAutoComplete = (type: "origin" | "destination") => (
    <AutoComplete
      selectedValue={form.watch(type)}
      onSelectedValueChange={(value) => form.setValue(type, value)}
      searchValue={form.getValues(type)}
      onSearchValueChange={(value) => {
        form.setValue(type, value)
      }}
      items={(type === "origin"
        ? neshanDataOrigin
        : neshanDataDestinations
      )?.map((item) => ({
        address: item?.address,
        category: item?.category,
        location: { x: item?.location.x, y: item?.location.y },
        region: item?.region,
        title: item?.title,
        type: item?.type,
      }))}
      isLoading={type === "origin" ? loadingOrigin : loadingDes}
      placeholder={t(`${type}.placeHolder`)}
      lable={t(`${type}.title`)}
      onChangeHandler={(e) => changeHandler(e, type)}
      itemClickHandler={(item) => handleItemClick(item, type)}
    />
  )

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex h-1/2 flex-col flex-wrap text-center">
          {renderAutoComplete("origin")}
        </div>
        <div className="relative mb-6 mt-8">
          {renderAutoComplete("destination")}
        </div>
        <SubmitButton isLoading={isLoading}>{t("submit")}</SubmitButton>
      </form>
    </Form>
  )
}
