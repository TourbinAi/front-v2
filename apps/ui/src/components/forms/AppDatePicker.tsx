"use client"

import React from "react"
import { CalendarIcon } from "lucide-react"
import { UseQueryStateOptions } from "nuqs"
import { Controller, useFormContext } from "react-hook-form"

import { formatJalaliDate } from "@/lib/jalali-date"
import { cn } from "@/lib/styles"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AppFormDescription } from "./AppFormDescription"
import { AppFormLabel } from "./AppFormLabel"

/**
 * AppDatePicker component documentation.
 *
 * This module exports the AppDatePicker component, which is a form date picker field
 * that provides a Jalali (Persian) calendar selection feature. It uses the `Calendar` component
 * and integrates with react-hook-form and nuqs for URL state.
 *
 * The component handles form state management and URL synchronization through query parameters.
 *
 * @see Props
 * @see AppDatePicker
 */

/**
 * Props for the AppDatePicker component.
 *
 * @typedef {Object} Props
 * @property {string} name - The name of the form field
 * @property {React.ReactNode} [label] - The label for the form field
 * @property {string} [placeholder] - Placeholder text when no date is selected
 * @property {string} [containerClassName] - Class name for the container element
 * @property {string} [fieldClassName] - Class name for the field element
 * @property {React.ReactNode} [description] - Description text below the field
 * @property {Function} [setQueryState] - Function to update URL query parameters
 */

type Props = {
  readonly name: string
  readonly label?: React.ReactNode
  readonly placeholder?: string
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly description?: React.ReactNode
  readonly setQueryState?: (
    value: string | null,
    options?: UseQueryStateOptions<string>
  ) => Promise<URLSearchParams>
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">

export function AppDatePicker({
  name,
  label,
  placeholder = "انتخاب تاریخ",
  containerClassName,
  fieldClassName,
  description,
  setQueryState,
  ...nativeProps
}: Props) {
  const { control } = useFormContext()

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className={cn(containerClassName)}>
          <AppFormLabel
            label={label}
            fieldState={fieldState}
            required={nativeProps.required}
          />

          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value, ...restField } }) => (
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        { "border-red-600": fieldState.invalid },
                        fieldClassName
                      )}
                      {...restField}
                    >
                      <CalendarIcon className="mr-2 size-4" />
                      {value ? (
                        formatJalaliDate(value)
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    selected={value}
                    onSelect={(date) => {
                      onChange(date)
                      setQueryState?.(date ? formatJalaliDate(date) : null)
                    }}
                  />
                </PopoverContent>
              </Popover>
            )}
          />

          <AppFormDescription description={description} />

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
