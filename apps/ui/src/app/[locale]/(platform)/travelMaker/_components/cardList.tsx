"use client"

import { Dispatch, memo, SetStateAction, useMemo, useState } from "react"
import { ChevronRight } from "lucide-react"
import { useTranslations } from "next-intl"

import { TravelMakerListRes } from "@/types/api"

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
  error: string | null
  results: TravelMakerListRes | undefined
  setOpen: Dispatch<SetStateAction<boolean>>
}

const initialFilters: Filter = {
  category: [],
  tripType: "All",
  difficulty: "All",
}

// Memoize the loading state component
const LoadingState = memo(function LoadingState({
  filters,
  onFilterChange,
}: {
  filters: Filter
  onFilterChange: (f: Filter) => void
}) {
  return (
    <div className="flex h-full flex-1 flex-col items-stretch justify-stretch gap-2">
      <FilterBar filters={filters} onFilterChange={onFilterChange} />
      <div className="flex w-full flex-col gap-4 overflow-y-auto">
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    </div>
  )
})

// Memoize the error state component
const ErrorState = memo(function ErrorState({
  error,
  filters,
  onFilterChange,
  setOpen,
  t,
}: {
  error: string
  filters: Filter
  onFilterChange: (f: Filter) => void
  setOpen: (b: boolean) => void
  t: any
}) {
  return (
    <div className="flex h-full flex-1 flex-col items-stretch justify-stretch gap-2">
      <FilterBar filters={filters} onFilterChange={onFilterChange} />
      <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-96">
          <CardHeader className="flex w-full flex-col items-center justify-center">
            <CardTitle className="flex gap-2 pb-2">
              <span>{t("package.error")}</span>
            </CardTitle>
            <CardDescription className="text-center text-destructive">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex size-full flex-col items-center justify-center">
            <Button
              className="mb-4 flex text-sm md:hidden"
              variant="outline"
              onClick={() => setOpen(true)}
            >
              <ChevronRight />
              {t("form.openSidebar")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
})

// Memoize the empty state component
const EmptyState = memo(function EmptyState({
  t,
  setOpen,
}: {
  t: any
  setOpen: (b: boolean) => void
}) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-96">
        <CardHeader className="flex w-full flex-col items-center justify-center">
          <CardTitle className="pb-2">{t("centerCard.title")}</CardTitle>
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
  )
})

// Memoize the results list component
const ResultsList = memo(function ResultsList({
  results,
  filters,
}: {
  results: TravelMakerListRes
  filters: Filter
}) {
  const filteredResults = useMemo(() => {
    const filteredItems = results.filter((item) => {
      const tagMatch =
        filters.category.length === 0 ||
        filters.category.some((tag) => item?.tag_slugs?.includes(tag))

      const tripTypeMatch =
        filters.tripType === "All" ||
        (item.route_type === 1 && filters.tripType === "oneWay") ||
        (item.route_type === 2 && filters.tripType === "multiple")

      const difficultyMatch =
        filters.difficulty === "All" ||
        (item.route_type === 1 && filters.difficulty === "easy") ||
        (item.route_type === 2 && filters.difficulty === "hard")

      return tagMatch && tripTypeMatch && difficultyMatch
    })

    if (filters.category.length > 0) {
      return filteredItems.sort((a, b) => {
        const aMatches = filters.category.filter((tag) =>
          a?.tag_slugs?.includes(tag)
        ).length
        const bMatches = filters.category.filter((tag) =>
          b?.tag_slugs?.includes(tag)
        ).length
        return bMatches - aMatches
      })
    }

    return filteredItems
  }, [results, filters])

  return (
    <ScrollArea className="flex-1">
      <div className="flex flex-col gap-4 p-4">
        {filteredResults.map((item, index) => {
          if (item.places.length > 0) {
            return (
              <RouteCard
                key={item.id}
                id={item.id}
                name={item.description}
                description={item.description}
                latitude={item.latitude}
                longitude={item.longitude}
                cities={[...item.places].reverse()}
                index={index}
              />
            )
          }
        })}
      </div>
    </ScrollArea>
  )
})

export default function CardList({
  loading,
  error,
  results,
  setOpen,
}: CardListProps) {
  const [filters, setFilters] = useState<Filter>(initialFilters)
  const t = useTranslations("travelMaker")

  if (loading) {
    return <LoadingState filters={filters} onFilterChange={setFilters} />
  }

  if (error) {
    return (
      <ErrorState
        error={error}
        filters={filters}
        onFilterChange={setFilters}
        setOpen={setOpen}
        t={t}
      />
    )
  }

  return (
    <div className="flex h-full flex-1 flex-col items-stretch justify-stretch gap-2">
      <FilterBar filters={filters} onFilterChange={setFilters} />
      {results ? (
        results.length === 0 ? (
          <EmptyState t={t} setOpen={setOpen} />
        ) : (
          <ResultsList results={results} filters={filters} />
        )
      ) : (
        <EmptyState t={t} setOpen={setOpen} />
      )}
    </div>
  )
}
