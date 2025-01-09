import { format as formatJalali, parse as parseJalali } from "date-fns-jalali"

export function formatJalaliDate(
  date: Date,
  formatStr: string = "yyyy/MM/dd"
): string {
  return formatJalali(date, formatStr)
}

export function parseJalaliDate(
  dateStr: string,
  formatStr: string = "yyyy/MM/dd"
): Date {
  return parseJalali(dateStr, formatStr, new Date())
}

export const jalaliMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
] as const

export const jalaliWeekdays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
] as const
export const jalaliWeekdaysShort = ["ش", "ی", "د", "س", "چ", "پ", "ج"] as const

export const jalaliLocale = {
  localize: {
    day: (n: number) => jalaliWeekdays[n],
    month: (n: number) => jalaliMonths[n],
  },
  formatLong: {
    date: () => "yyyy/MM/dd",
  },
}
