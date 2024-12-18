"use client"

import { useState } from "react"
import { ChevronRight, TriangleAlert } from "lucide-react"
import { useTranslations } from "next-intl"

import { TravelMakerListReq, TravelMakerListRes } from "@/types/api"

import { TravelMakerList } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

import RouteCard from "./card"
import SheetLayout from "./sheetLayout"
import TravelMakerForm from "./travelMakerForm"

export default function TravelMaker() {
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [list, setList] = useState<TravelMakerListRes>()
  const [error, setError] = useState<boolean>(false)

  const submitFunction = async (values: TravelMakerListReq) => {
    const response = await TravelMakerList(values)
    setList(response.data)
  }

  const t = useTranslations("travelMaker")

  return (
    <SheetLayout
      open={open}
      setOpen={setOpen}
      button={typeof list === "undefined" ? false : list.length !== 0}
      sideBarComponent={
        <TravelMakerForm
          setError={setError}
          setIsLoading={setLoading}
          submitFunction={submitFunction}
        />
      }
    >
      {error ? (
        <div className="flex size-full items-center justify-center">
          <Card className="max-w-96">
            <CardHeader className="flex w-full flex-col items-center justify-center">
              <CardTitle className="flex gap-2 pb-2">
                <TriangleAlert className="size-10 text-destructive" />
                <span className="text-md">{t("form.error")} </span>
              </CardTitle>
              <CardDescription className="text-center">
                {t("form.tryAnother")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex size-full flex-col items-center justify-center">
              <Button
                className="flex lg:hidden"
                variant="outline"
                onClick={() => setOpen(true)}
              >
                <ChevronRight />
                {t("form.form-header.fillForm")}
              </Button>
            </CardContent>
          </Card>
        </div>
      ) : loading ? (
        <div className="flx-col flex w-full gap-4">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <>
          {list ? (
            <>
              {list.length === 0 ? (
                <div className="flex size-full items-center justify-center">
                  <Card className="max-w-96">
                    <CardHeader className="flex w-full flex-col items-center justify-center">
                      <CardTitle className="flex gap-2 pb-2">
                        <span>{t("form.noResults")}</span>
                        <span className="-translate-y-1 text-2xl">):</span>
                      </CardTitle>
                      <CardDescription className="text-center">
                        {t("form.tryAnother")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex size-full flex-col items-center justify-center">
                      <Button
                        className="flex lg:hidden"
                        variant="outline"
                        onClick={() => setOpen(true)}
                      >
                        <ChevronRight />
                        {t("form.form-header.fillForm")}
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <div className="flex w-full flex-col gap-4">
                  {list.map((item) => (
                    <RouteCard
                      key={item.id}
                      id={item.id}
                      name={item.description}
                      description={item.description}
                      latitude={item.latitude}
                      longitude={item.longitude}
                      cities={[...item.places].reverse()}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="flex size-full items-center justify-center">
              <Card className="max-w-96">
                <CardHeader className="flex w-full flex-col items-center justify-center">
                  <CardTitle className="pb-2">
                    {t("form.form-header.title")}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t("form.form-header.text")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex size-full flex-col items-center justify-center">
                  <Button
                    className="flex lg:hidden"
                    variant="outline"
                    onClick={() => setOpen(true)}
                  >
                    <ChevronRight />
                    {t("form.form-header.fillForm")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </SheetLayout>
  )
}
