// src/components/multi-select.tsx

import * as React from "react"
import { cva } from "class-variance-authority"
import { CheckIcon } from "lucide-react"

import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/styles"

const multiSelectVariants = cva(
  "inline-flex items-center justify-center rounded-full border border-gray-400 px-2 py-2 text-xs font-medium transition-colors cursor-pointer",
  {
    variants: {
      variant: {
        default: "data-[state=selected]:bg-primary",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

interface MultiSelectProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof multiSelectVariants> {
  options: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  onValueChange: (value: string[]) => void
  defaultValue?: string[]
  columns?: number
}

export const MultiSelect = React.forwardRef<HTMLDivElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      columns = 5,
      className,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] =
      React.useState<string[]>(defaultValue)

    const toggleOption = (option: string) => {
      const newSelectedValues = selectedValues.includes(option)
        ? selectedValues.filter((value) => value !== option)
        : [...selectedValues, option]
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-wrap gap-2", className)}
        {...props}
      >
        {options.map((option) => {
          const isSelected = selectedValues.includes(option.value)
          const IconComponent = option.icon

          return (
            <button
              key={option.value}
              type="button"
              className={cn(multiSelectVariants({ variant }), "relative")}
              onClick={() => toggleOption(option.value)}
              data-state={isSelected ? "selected" : "default"}
            >
              <span className="flex items-center gap-2 text-nowrap">
                {IconComponent && <IconComponent className="size-4" />}
                {option.label}
                {isSelected && <CheckIcon className="ml-1 size-4" />}
              </span>
            </button>
          )
        })}
      </div>
    )
  }
)

MultiSelect.displayName = "MultiSelect"
