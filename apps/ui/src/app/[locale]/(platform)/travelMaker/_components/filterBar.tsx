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

const categories = [...TravelMakerSelectValues.placeNature] as const
const tripType = ["All", ...TravelMakerSelectValues.disState] as const
const difficulties = ["All", ...TravelMakerSelectValues.route] as const

export type Filter = {
  category: (typeof categories)[number][]
  tripType: (typeof tripType)[number]
  difficulty: (typeof difficulties)[number]
}

interface FilterBarProps {
  filters: Filter
  onFilterChange: (newFilters: Filter) => void
}

export default function FilterBar({ filters, onFilterChange }: FilterBarProps) {
  const handleFilterChange = (filterType: keyof Filter, value: string) => {
    if (filterType === "category") {
      const newCategories = filters.category.includes(value as any)
        ? filters.category.filter((cat) => cat !== value)
        : [...filters.category, value as any]
      onFilterChange({ ...filters, category: newCategories })
    } else {
      onFilterChange({ ...filters, [filterType]: value })
    }
  }

  const locale = useLocale()
  const t = useTranslations("travelMaker.filter")

  return (
    <>
      <div className="flex flex-row gap-2 md:hidden">
        <Select dir={locale === "fa" ? "rtl" : "ltr"}>
          <SelectTrigger className="w-full" name="tags">
            <SelectValue placeholder={t("tags.title")} />
          </SelectTrigger>
          <SelectContent>
            <div className="p-4">
              <FilterSection
                isMobile
                title="tags"
                options={categories}
                selected={filters.category}
                onChange={(value) => handleFilterChange("category", value)}
                isMulti
              />
            </div>
          </SelectContent>
        </Select>

        <Select dir={locale === "fa" ? "rtl" : "ltr"}>
          <SelectTrigger className="w-full" name="tripType">
            <SelectValue placeholder={t("tripType.title")} />
          </SelectTrigger>
          <SelectContent>
            <div className="p-4">
              <FilterSection
                isMobile
                title="tripType"
                options={tripType}
                selected={filters.tripType || "All"}
                onChange={(value) => handleFilterChange("tripType", value)}
              />
            </div>
          </SelectContent>
        </Select>

        <Select dir={locale === "fa" ? "rtl" : "ltr"}>
          <SelectTrigger className="w-full" name="route">
            <SelectValue placeholder={t("route.title")} />
          </SelectTrigger>
          <SelectContent>
            <div className="p-4">
              <FilterSection
                isMobile
                title="route"
                options={difficulties}
                selected={filters.difficulty || "All"}
                onChange={(value) => handleFilterChange("difficulty", value)}
              />
            </div>
          </SelectContent>
        </Select>
      </div>
      <div className="no-scrollbar hidden min-h-10 items-center gap-2 overflow-x-auto pb-2 md:flex">
        <FilterSection
          title="tags"
          options={categories}
          selected={filters.category}
          onChange={(value) => handleFilterChange("category", value)}
          isMulti
        />
        <div className="h-[50px] w-0 shrink-0 border border-gray-300" />
        <FilterSection
          title="tripType"
          options={tripType}
          selected={filters.tripType}
          onChange={(value) => handleFilterChange("tripType", value)}
        />
        <div className="h-[50px] w-0 shrink-0 border border-gray-300" />
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
  selected: string | string[]
  onChange: (value: string) => void
  isMobile?: boolean
  isMulti?: boolean
}

function FilterSection({
  title,
  options,
  selected,
  onChange,
  isMobile = false,
  isMulti = false,
}: FilterSectionProps) {
  const t = useTranslations("travelMaker.filter")

  return (
    <div className="flex flex-col">
      {!isMobile && (
        <span className="mb-2 font-semibold">{t(`${title}.title`)}</span>
      )}
      <div
        className={cn(
          "flex max-w-full flex-wrap gap-2",
          !isMobile && "flex-nowrap"
        )}
      >
        {options.map((option) => (
          <button
            type="button"
            key={option}
            onClick={() => onChange(option)}
            className={cn(
              "shrink-0 whitespace-nowrap rounded-md px-3 py-1 text-sm",
              isMulti
                ? Array.isArray(selected) && selected.includes(option)
                  ? "bg-secondary text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : selected === option
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
