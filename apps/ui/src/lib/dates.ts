import { format as formatJalali } from "date-fns-jalali"
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
import timezone from "dayjs/plugin/timezone"
import utc from "dayjs/plugin/utc"

const DATE_FORMAT = "dd/MM/yy"
const TIME_FORMAT = "H:mm"
const DATE_TIME_FORMAT = "dd/MM/yy HH:mm"

export const setupDaysJs = () => {
  dayjs.extend(utc)
  dayjs.extend(timezone)
  dayjs.extend(localizedFormat)
  dayjs.tz.setDefault("Asia/Tehran")
}

export function formatDate(
  date: string | Date | undefined,
  format = DATE_FORMAT,
  locale?: "fa" | "en"
): string {
  if (!date) return ""
  const dateObj = typeof date === "string" ? new Date(date) : date

  if (locale === "fa") {
    return formatJalali(dateObj, format)
  }

  return dayjs(dateObj).format(format)
}

function formatDateRange(
  startDate: string,
  endDate: string,
  format = DATE_FORMAT
) {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  if (end.isSame(start, "day")) {
    return end.format(format)
  }
  if (end.isSame(start, "month")) {
    return `${start.format("DD")}–${end.format(format)}`
  }
  if (!end.isSame(start, "month") && end.isSame(start, "year")) {
    return `${start.format("DD/MM")}–${end.format(format)}`
  }
  if (!end.isSame(start, "year")) {
    return `${start.format(format)}–${end.format(format)}`
  }
  return undefined
}

function getToday(format = DATE_FORMAT): string {
  return dayjs().format(format)
}

function getDiffInDays(startDate: string, endDate: string): number {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  return end.diff(start, "day")
}
