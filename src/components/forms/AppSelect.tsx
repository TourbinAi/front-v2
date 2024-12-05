"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";

import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";
import { AppFormDescription } from "./AppFormDescription";
import { AppFormLabel } from "./AppFormLabel";

type Props = {
  readonly name: string;
  readonly options: { label: string; value: string }[];
  readonly label?: React.ReactNode;
  readonly placeholder?: string;
  readonly containerClassName?: string;
  readonly fieldClassName?: string;
  readonly description?: React.ReactNode;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "className">;

export function AppSelect({
  name,
  options,
  label,
  placeholder,
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

          <SelectComponent
            {...field}
            {...nativeProps}
            dir={(nativeProps.dir ?? "rtl") as any}
            onValueChange={field.onChange}
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
  );
}
