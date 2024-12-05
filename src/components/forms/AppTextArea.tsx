"use client";

import React from "react";
import { useFormContext } from "react-hook-form";

import { cn } from "@/lib/utils";
import { AppFormDescription } from "@/components/forms/AppFormDescription";
import { AppFormLabel } from "@/components/forms/AppFormLabel";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Textarea } from "@/components/ui/Textarea";

type Props = {
  readonly name: string;
  readonly label?: React.ReactNode;
  readonly containerClassName?: string;
  readonly fieldClassName?: string;
  readonly description?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "className">;

export function AppTextArea({
  name,
  label,
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
      render={({ field, fieldState, formState }) => (
        <FormItem className={cn(containerClassName)}>
          <AppFormLabel label={label} required={nativeProps.required} />

          <FormControl>
            <div className="relative flex items-stretch overflow-hidden">
              <Textarea
                {...field}
                value={field.value ?? ""}
                onChange={field.onChange}
                className={cn(
                  "w-full border ease-in-out",
                  {
                    "border-red-600": fieldState.invalid,
                    "border-primary": fieldState.invalid,
                  },
                  fieldClassName
                )}
              />
            </div>
          </FormControl>

          <AppFormDescription description={description} />

          <FormMessage />
        </FormItem>
      )}
    />
  );
}