"use client"

import React from "react"
import { UseQueryStateOptions } from "nuqs"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/styles"
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { AppFormDescription } from "./AppFormDescription"
import { AppFormLabel } from "./AppFormLabel"

/**
 * AppSelect component documentation.
 *
 * This module exports the AppSelect component, which is a form select field
 * that provides a dropdown selection feature. It uses the `Select` component from
 * `@/components/ui/select` and integrates with react-hook-form and nuqs for URL state.
 *
 * The component handles form state management and URL synchronization through query parameters.
 *
 * @see Props
 * @see AppSelect
 */

/**
 * Props for the AppSelect component.
 *
 * @typedef {Object} Props
 * @property {string} name - The name of the form field
 * @property {Array<{label: string, value: string}>} options - Array of options for the select
 * @property {React.ReactNode} [label] - The label for the form field
 * @property {string} [placeholder] - Placeholder text when no option is selected
 * @property {string} [containerClassName] - Class name for the container element
 * @property {string} [fieldClassName] - Class name for the field element
 * @property {React.ReactNode} [description] - Description text below the field
 * @property {Function} [setQueryState] - Function to update URL query parameters
 */

type Props = {
  readonly name: string
  readonly options: { label: string; value: string }[]
  readonly label?: React.ReactNode
  readonly placeholder?: string
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly description?: React.ReactNode
  readonly setQueryState?: (
    value: string | null,
    options?: UseQueryStateOptions<string>
  ) => Promise<URLSearchParams>
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">

export function AppSelect({
  name,
  options,
  label,
  placeholder,
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

          <SelectComponent
            {...field}
            {...nativeProps}
            dir={(nativeProps.dir ?? "rtl") as any}
            onValueChange={(value) => {
              field.onChange(value)
              setQueryState?.(value)
            }}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger
                className={cn(
                  "w-full",
                  { "border-red-600": fieldState.invalid },
                  fieldClassName
                )}
                tabIndex={nativeProps.tabIndex}
                onBlur={field.onBlur}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>

            <SelectContent className={cn("max-h-40 overflow-y-auto")}>
              {options.map((option) => (
                <SelectItem value={option.value} key={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectComponent>

          <AppFormDescription description={description} />

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
