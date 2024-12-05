"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { FormField, FormItem, FormMessage } from "@/components/ui/Form";

import { MultiSelect } from "../ui/multiSelect";
import { AppFormDescription } from "./AppFormDescription";
import { AppFormLabel } from "./AppFormLabel";

type Props = {
  readonly name: string;
  readonly options: { label: string; value: string }[];
  readonly label?: React.ReactNode;
  readonly placeholder?: string;
  readonly searchText?: string;
  readonly selectAllText?: string;
  readonly containerClassName?: string;
  readonly fieldClassName?: string;
  readonly description?: React.ReactNode;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">;

export function AppMultiSelect({
  name,
  options,
  label,
  placeholder,
  searchText,
  selectAllText,
  containerClassName,
  fieldClassName,
  description,
  ...nativeProps
}: Props) {
  const { control } = useFormContext();

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
            options={options || []}
            defaultValue={(options || [])
              ?.map((prop) => prop.value)
              .filter((option) => field.value.includes(option))}
            onValueChange={(newSelected) => {
              field.onChange(newSelected);
            }}
            className={cn(fieldClassName)}
            placeholder={placeholder}
            searchText={searchText}
            selectAllText={selectAllText}
          />
          <AppFormDescription description={description} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}
