import { useLocale, useTranslations } from "next-intl"

import { cn } from "@/lib/styles"
import { TravelMakerSelectValues } from "@/lib/validation/travelMaker"
import { useIsMobile } from "@/hooks/useIsMobile"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = ["All", ...TravelMakerSelectValues.placeNature] as const
const tripType = ["All", ...TravelMakerSelectValues.disState] as const
const difficulties = ["All", ...TravelMakerSelectValues.route] as const

export type Filter = {
  category: (typeof categories)[number]
  tripType: (typeof tripType)[number]
  difficulty: (typeof difficulties)[number]
}

interface FilterBarProps {
  filters: Filter
  onFilterChange: (newFilters: Filter) => void
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleFilterChange = (filterType: keyof Filter, value: string) => {
    onFilterChange({ ...filters, [filterType]: value })
  }

  const locale = useLocale()

  return (
    <>
      <div className="md:hidden">
        <Select dir={locale === "fa" ? "rtl" : "ltr"}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filters" />
          </SelectTrigger>
          <SelectContent className="max-h-[80vh] w-screen sm:w-auto">
            <div className="space-y-4 p-4">
              <FilterSection
                title="tags"
                options={categories}
                selected={filters.category}
                onChange={(value) => handleFilterChange("category", value)}
              />
              <FilterSection
                title="tripType"
                options={tripType}
                selected={filters.tripType || "All"}
                onChange={(value) => handleFilterChange("tripType", value)}
              />
              <FilterSection
                title="route"
                options={difficulties}
                selected={filters.difficulty || "All"}
                onChange={(value) => handleFilterChange("difficulty", value)}
              />
            </div>
          </SelectContent>
        </Select>
      </div>
      <div className="hidden md:flex no-scrollbar min-h-10 items-center gap-2 overflow-x-auto pb-2">
        <FilterSection
          title="tags"
          options={categories}
          selected={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
        />
        <div className="border border-gray-300 h-[50px] w-0 shrink-0" />
        <FilterSection
          title="tripType"
          options={tripType}
          selected={filters.tripType}
          onChange={(value) => handleFilterChange("tripType", value)}
        />
        <div className="border border-gray-300 h-[50px] w-0 shrink-0" />
        <FilterSection
          title="route"
          options={difficulties}
          selected={filters.difficulty}
          onChange={(value) => handleFilterChange("difficulty", value)}
        />
      </div>
    </>
  )
}

interface FilterSectionProps {
  title: "tags" | "tripType" | "route"
  options: typeof categories | typeof tripType | typeof difficulties
  selected: string
  onChange: (value: string) => void
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
}: FilterSectionProps) {
  const t = useTranslations("travelMaker.filter")
  const isMobile = useIsMobile()

  return (
    <div className="flex flex-col">
      <span className="font-semibold mb-2">{t(`${title}.title`)}</span>
      <div
        className={cn(
          "flex gap-2 flex-wrap max-w-full",
          !isMobile && "flex-nowrap"
        )}
      >
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "px-3 py-1 rounded-md text-sm whitespace-nowrap shrink-0",
              selected === option
                ? "bg-secondary text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            )}
          >
            {option === "All"
              ? t("all")
              : // @ts-ignore
                t(`${title}.options.${option}`)}
          </button>
        ))}
      </div>
    </div>
  )
}
