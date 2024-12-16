"use client"

import { useCallback, useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import moment from "jalali-moment"
import { ChevronRight, TriangleAlert } from "lucide-react"
import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

import { TravelMakerListReq, TravelMakerListRes } from "@/types/api"

import { TravelMakerList } from "@/lib/api"
import { useRouter } from "@/lib/navigation"
import CustomFormField, {
  FormFieldType,
} from "@/components/forms/CustomeFormField"
import SubmitButton from "@/components/forms/SubmitButton"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form } from "@/components/ui/form"
import { SelectItem } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { TravelMakerForm } from "@/app/[locale]/(marketing)/_components/form/travelMakerForm"

import RouteCard from "./card"
import SheetLayout from "./sheetLayout"

export default function TravelMaker() {
  const searchParams = useSearchParams() // Get search params
  const query = Object.fromEntries(searchParams.entries()) // Convert search params to object
  const [loading, setLoading] = useState<boolean>(false)
  const [open, setOpen] = useState<boolean>(false)
  const [list, setList] = useState<TravelMakerListRes>()
  const [error, setError] = useState<boolean>(false)
  const [mounted, setMounted] = useState(false)

  const t = useTranslations("travelMaker")

  // Modify initial mounted state setting
  useEffect(() => {
    // Small delay to ensure initial render is complete
    const timeoutId = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timeoutId)
  }, [])

  if (!mounted) return null

  return (
    <SheetLayout
      open={open}
      setOpen={setOpen}
      button={typeof list === "undefined" ? false : list.length !== 0}
      sideBarComponent={<TravelMakerForm />}
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
