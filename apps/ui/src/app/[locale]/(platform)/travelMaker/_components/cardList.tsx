"use client"

import { Dispatch, SetStateAction, useState } from "react"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { TravelMakerListRes, TravelMakerSingleRes } from "@/types/api"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scrollArea"
import { Skeleton } from "@/components/ui/skeleton"

import RouteCard from "./card"
import FilterBar, { Filter } from "./filterBar"

interface CardListProps {
  loading: boolean
  results: TravelMakerListRes | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
}

const initialFilters: Filter = {
  category: "All",
  tripType: "All",
  difficulty: "All",
}

export default function CardList({ loading, results, setOpen }: CardListProps) {
  const [filters, setFilters] = useState<Filter>(initialFilters)
  const t = useTranslations("travelMaker")

  const filterFunction = (item: TravelMakerSingleRes) => {
    return (
      (filters.category === "All" ||
        item?.tag_slugs?.includes(filters.category)) &&
      (filters.tripType === "All" ||
        (item.route_type === 1 && filters.tripType === "oneWay") ||
        (item.route_type === 2 && filters.tripType === "multiple")) &&
      (filters.difficulty === "All" ||
        (item.route_type === 1 && filters.difficulty === "easy") ||
        (item.route_type === 2 && filters.difficulty === "hard"))
    )
  }

  return (
    <div className="h-full flex-1 gap-2 flex flex-col justify-stretch items-stretch">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {loading ? (
        <div className="flex-col flex w-full gap-4 overflow-y-auto">
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
          <Skeleton className="h-[300px] w-full" />
        </div>
      ) : (
        <>
          {results ? (
            <>
              {results.filter(filterFunction).length === 0 ? (
                <div className="flex flex-1 items-center justify-center">
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
                        className="flex md:hidden"
                        variant="outline"
                        onClick={() => setOpen(true)}
                      >
                        <ChevronRight />
                        Open Sidebar
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                <ScrollArea className="flex-1">
                  <div className="flex flex-col gap-4 py-4 px-4">
                    {results.filter(filterFunction).map((item) => (
                      <>
                        {item.places.length > 0 && (
                          <RouteCard
                            key={item.id}
                            id={item.id}
                            name={item.description}
                            description={item.description}
                            latitude={item.latitude}
                            longitude={item.longitude}
                            cities={[...item.places].reverse()}
                          />
                        )}
                      </>
                    ))}
                  </div>
                </ScrollArea>
              )}
            </>
          ) : (
            <div className="flex flex-1 items-center justify-center">
              <Card className="max-w-96">
                <CardHeader className="flex w-full flex-col items-center justify-center">
                  <CardTitle className="pb-2">
                    {t("centerCard.title")}
                  </CardTitle>
                  <CardDescription className="text-center">
                    {t("centerCard.description")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex size-full flex-col items-center justify-center">
                  <Button
                    className="flex md:hidden"
                    variant="outline"
                    onClick={() => setOpen(true)}
                  >
                    <ChevronRight />
                    {t("centerCard.button")}
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  )
}
