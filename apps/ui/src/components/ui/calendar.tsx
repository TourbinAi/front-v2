import * as React from "react"
import { DayPicker as CalendarComponent } from "react-day-picker/persian"

import {
  formatJalaliDate,
  jalaliLocale,
  jalaliMonths,
  jalaliWeekdaysShort,
  parseJalaliDate,
} from "@/lib/jalali-date"
import { cn } from "@/lib/styles"

interface CalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
}

export function Calendar({ selected, onSelect }: CalendarProps) {
  return (
    <CalendarComponent
      selected={selected}
      onSelect={onSelect}
      locale={jalaliLocale as any}
      weekStartsOn={6}
      formatters={{
        formatWeekdayName: (day) => jalaliWeekdaysShort[day.getDay()] || "",
        formatCaption: (date) => {
          const jalaliDate = parseJalaliDate(formatJalaliDate(date))
          return `${jalaliMonths[jalaliDate.getMonth()]} ${jalaliDate.getFullYear()}`
        },
      }}
      classNames={{
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
    />
  )
}
