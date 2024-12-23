import { useCallback } from "react"
import { UseQueryStateOptions } from "nuqs"
import { Path, useForm, UseFormProps } from "react-hook-form"
import { z } from "zod"

type QuerySetters = Record<
  string,
  (value: any, options?: UseQueryStateOptions<string>) => Promise<void>
>

export function useFormWithQuery<
  TSchema extends z.ZodType,
  TQuerySetters extends QuerySetters,
>({
  querySetters,
  ...formProps
}: UseFormProps<z.infer<TSchema>> & {
  querySetters: TQuerySetters
}) {
  const form = useForm<z.infer<TSchema>>(formProps)

  const handleChange = useCallback(
    (name: string, value: unknown) => {
      const setter = querySetters[name]
      if (setter) {
        if (Array.isArray(value)) {
          setter(value.join(","))
        } else if (typeof value === "boolean") {
          setter(value ? "true" : "false")
        } else if (value) {
          setter(value as string)
        }
      }
    },
    [querySetters]
  )

  return {
    ...form,
    register: (name: Path<z.infer<TSchema>>, options?: any) => {
      const registration = form.register(name, options)
      return {
        ...registration,
        onChange: (e: any) => {
          registration.onChange(e)
          handleChange(name as string, e.target.value)
        },
      }
    },
    setValue: (name: Path<z.infer<TSchema>>, value: any, options?: any) => {
      form.setValue(name, value, options)
      handleChange(name as string, value)
    },
  }
}
