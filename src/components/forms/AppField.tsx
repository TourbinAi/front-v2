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
import { Input } from "@/components/ui/Input";

import { AppFormDescription } from "./AppFormDescription";
import { AppFormLabel } from "./AppFormLabel";

/**
 * AppField component documentation.
 *
 * This module exports the AppField component, which is a form input field.
 * It uses the `useFormContext` hook from `react-hook-form`.
 *
 * The component accepts several props, including `name`, `label`, `endAdornment`,
 * `containerClassName`, `fieldClassName`, and `description`.
 *
 * @see Props
 * @see AppField
 */

/**
 * Props for the AppField component.
 *
 * @typedef {Object} Props
 * @property {string} name - The name of the form field.
 * @property {React.ReactNode} [label] - The label for the form field.
 * @property {React.ReactNode} [endAdornment] - The end adornment for the form field.
 * @property {string} [containerClassName] - The class name for the container element.
 * @property {string} [fieldClassName] - The class name for the field element.
 * @property {React.ReactNode} [description] - The description for the form field.
 * @property {React.InputHTMLAttributes<HTMLInputElement>} nativeProps - The native props for the form field.
 */

type Props = {
  readonly name: string;
  readonly label?: React.ReactNode;
  readonly endAdornment?: React.ReactNode;
  readonly containerClassName?: string;
  readonly fieldClassName?: string;
  readonly description?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

export function AppField({
  name,
  label,
  endAdornment,
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
            fieldState={fieldState}
            label={label}
            required={nativeProps.required}
          />

          <FormControl>
            <div className="relative flex items-stretch overflow-hidden">
              <Input
                {...field}
                {...nativeProps}
                value={field.value ?? ""}
                onChange={(event) => {
                  const value = event.target.value;
                  if (nativeProps.type === "number") {
                    field.onChange(parseFloat(value));
                  } else {
                    field.onChange(value);
                  }
                }}
                className={cn(
                  "w-full",
                  {
                    "border-red-600": fieldState.invalid,
                    "rounded-md border": !endAdornment,
                    "rounded-l-md border-y border-l": !!endAdornment,
                  },
                  fieldClassName
                )}
              />
              {endAdornment && (
                <div
                  className={cn(
                    "flex items-center rounded-r-md border bg-gray-100 px-2",
                    {
                      "border-y-red-600 border-r-red-600 text-red-600":
                        fieldState.invalid,
                      "border-gray-100": !fieldState.invalid,
                    }
                  )}
                >
                  {endAdornment}
                </div>
              )}
            </div>
          </FormControl>

          <AppFormDescription description={description} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}