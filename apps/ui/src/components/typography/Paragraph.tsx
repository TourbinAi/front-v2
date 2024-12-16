import React from "react"
import { cva } from "class-variance-authority"

import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/styles"

const paragraphVariants = cva(
  // Base styles shared across all variants
  "leading-[25px]",
  {
    variants: {
      variant: {
        base: "text-base",
      },
      textColor: {
        black: "text-black",
        white: "text-white",
      },
    },
    defaultVariants: {
      variant: "base",
      textColor: "black",
    },
  }
)

interface ParagraphProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof paragraphVariants> {}

export const Paragraph = ({
  children,
  className,
  variant,
  textColor,
  ...props
}: ParagraphProps) => {
  return (
    <p
      className={cn(paragraphVariants({ variant, textColor, className }))}
      {...props}
    >
      {children}
    </p>
  )
}
