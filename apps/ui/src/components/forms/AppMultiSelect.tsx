"use client"

import React from "react"
import { UseQueryStateOptions } from "nuqs"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/styles"
import { FormField, FormItem, FormMessage } from "@/components/ui/form"
import { MultiSelect } from "@/components/ui/multiSelect"

import { AppFormDescription } from "./AppFormDescription"
import { AppFormLabel } from "./AppFormLabel"

/**
 * AppMultiSelect component documentation.
 *
 * This module exports the AppMultiSelect component, which is a form multi-select field
 * that allows selecting multiple options from a dropdown. It integrates with
 * react-hook-form and nuqs for form state and URL synchronization.
 *
 * The component supports searching, select all functionality, and maintains selected
 * values in both form state and URL parameters.
 *
 * @see Props
 * @see AppMultiSelect
 */

/**
 * Props for the AppMultiSelect component.
 *
 * @typedef {Object} Props
 * @property {string} name - The name of the form field
 * @property {Array<{label: string, value: string}>} options - Array of selectable options
 * @property {React.ReactNode} [label] - The label for the form field
 * @property {string} [placeholder] - Placeholder text when no options are selected
 * @property {string} [searchText] - Text for the search input placeholder
 * @property {string} [selectAllText] - Text for the select all option
 * @property {string} [containerClassName] - Class name for the container element
 * @property {string} [fieldClassName] - Class name for the field element
 * @property {React.ReactNode} [description] - Description text below the field
 * @property {Function} [setQueryState] - Function to update URL query parameters
 */

type Props = {
  readonly name: string
  readonly options: { label: string; value: string }[]
  readonly label?: React.ReactNode
  readonly containerClassName?: string
  readonly fieldClassName?: string
  readonly description?: React.ReactNode
  readonly setQueryState?: (
    value: string | null,
    options?: UseQueryStateOptions<string>
  ) => Promise<URLSearchParams>
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">

export function AppMultiSelect({
  name,
  options,
  label,
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
          <MultiSelect
            options={options}
            defaultValue={field.value || []}
            onValueChange={(newSelected) => {
              field.onChange(newSelected)
              setQueryState?.(newSelected.join(","))
            }}
            className={cn(fieldClassName)}
          />
          <AppFormDescription description={description} />
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
