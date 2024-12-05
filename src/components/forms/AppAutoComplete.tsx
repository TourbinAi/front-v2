"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { AutoComplete } from "@/components/ui/autocomplete";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";

type Props<T extends string> = {
  readonly containerClassName?: string;
  items: string[];
  isLoading?: boolean;
  emptyMessage?: string;
  placeholder?: string;
  onChangeHandler?: (value: any) => void;
  itemClickHandler?: (value: any) => void;
  label?: string;
  formFieldName: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

/**
 * `AppAutoComplete` Component
 *
 * This component provides an autocomplete input field with integration for form control using
 * `react-hook-form`. It includes functionalities for loading states, custom messages, and
 * customizable behavior upon selection and input change.
 *
 * ### Props
 *
 * - `containerClassName` (optional): Custom class name for styling the container element.
 * - `items` (required): Array of items to display in the autocomplete dropdown.
 * - `isLoading` (optional): Boolean indicating if autocomplete data is loading.
 * - `emptyMessage` (optional): Message displayed when no autocomplete items are available.
 * - `placeholder` (optional): Placeholder text for the input field. Defaults to `"Search..."`.
 * - `onChangeHandler` (optional): Callback for when the input value changes.
 * - `itemClickHandler` (optional): Callback for when an autocomplete item is selected.
 * - `label` (optional): Label text for the autocomplete field.
 * - `formFieldName` (required): Name of the form field in `react-hook-form` context.
 *
 * ### Usage Example
 *
 * ```jsx
 * <AppAutoComplete
 *   formFieldName="searchField"
 *   items={["Item 1", "Item 2"]}
 *   placeholder="Type to search..."
 *   onChangeHandler={(value) => console.log(value)}
 *   itemClickHandler={(value) => console.log("Item clicked:", value)}
 * />
 * ```
 *
 * This component depends on the `AutoComplete` component and form controls from `@/components/ui/form`.
 */

export function AppAutoComplete<T extends string>({
  formFieldName,
  items,
  isLoading,
  emptyMessage = "",
  placeholder = "Search...",
  onChangeHandler,
  itemClickHandler,
  label,
  containerClassName,
}: Props<T>) {
  const { control } = useFormContext();

  const transformedItems = items.map((item) => ({
    address: "",
    category: "",
    location: { x: 0, y: 0 },
    region: "",
    title: item,
    type: "",
  }));

  return (
    <FormField
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem className={cn(containerClassName)}>
          <FormControl>
            <AutoComplete
              selectedValue={field.value}
              onSelectedValueChange={(value) => field.onChange(value)}
              searchValue={field.value}
              onSearchValueChange={(value) => field.onChange(value)}
              items={items}
              isLoading={isLoading}
              emptyMessage={emptyMessage}
              placeholder={placeholder}
              label={label}
              onChangeHandler={onChangeHandler}
              itemClickHandler={itemClickHandler}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
