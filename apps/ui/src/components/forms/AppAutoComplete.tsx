"use client"

import React from "react"

import { cn } from "@/lib/styles"
import { AutoComplete } from "@/components/ui/autoComplete"
import { FormControl, FormItem, FormMessage } from "@/components/ui/form"

type Props<T extends string> = {
  readonly containerClassName?: string
  selectedValue: T
  onSelectedValueChange: (value: T) => void
  searchValue: string
  onSearchValueChange: (value: string) => void
  items: string[]
  isLoading?: boolean
  emptyMessage?: string
  placeholder?: string
  onChangeHandler?: (value: any) => void
  itemClickHandler?: (Value: any) => void
  lable?: string
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">

/**
 * AppAutoComplete component documentation.
 *
 * This module exports the AppAutoComplete component, which is a form input field
 * that provides an autocomplete feature. It uses the `AutoComplete` component from
 * `@/components/ui/autoComplete` and the `useFormContext` hook from `react-hook-form`.
 *
 * The component accepts several props, including `name`, `label`, `containerClassName`,
 * `fieldClassName`, `description`, `items`, `isLoading`, `emptyMessage`, and `placeholder`.
 *
 * @see Props
 * @see AppAutoComplete
 */

/**
 * Props for the AppAutoComplete component.
 *
 * @typedef {Object} Props
 * @property {string} name - The name of the form field.
 * @property {React.ReactNode} [label] - The label for the form field.
 * @property {string} [containerClassName] - The class name for the container element.
 * @property {string} [fieldClassName] - The class name for the field element.
 * @property {React.ReactNode} [description] - The description for the form field.
 * @property {{ value: string; label: string }[]} items - The list of autocomplete items.
 * @property {boolean} [isLoading] - Whether the autocomplete is loading.
 * @property {string} [emptyMessage] - The message to display when there are no autocomplete items.
 * @property {string} [placeholder] - The placeholder text for the form field.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} nativeProps - The native props for the form field.
 */

export function AppAutoComplete<T extends string>({
  selectedValue,
  onSelectedValueChange,
  searchValue,
  onSearchValueChange,
  items,
  isLoading,
  emptyMessage = "",
  placeholder = "Search...",
  onChangeHandler,
  itemClickHandler,
  lable,
  containerClassName,
}: Props<T>) {
  return (
    <FormItem className={cn(containerClassName)}>
      <FormControl>
        <AutoComplete
          selectedValue={selectedValue}
          onSelectedValueChange={onSelectedValueChange}
          searchValue={searchValue}
          onSearchValueChange={onSearchValueChange}
          items={items}
          isLoading={isLoading}
          emptyMessage={emptyMessage}
          placeholder={placeholder}
          lable={lable}
          onChangeHandler={onChangeHandler}
          itemClickHandler={itemClickHandler}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
