import React from "react"
import { cva } from "class-variance-authority"

import type { VariantProps } from "class-variance-authority"

import { cn } from "@/lib/styles"

const headingVariants = cva(
  // Base styles shared across all variants
  "font-bold leading-none tracking-tight",
  {
    variants: {
      variant: {
        heading1: "text-4xl font-extrabold md:text-5xl xl:text-6xl",
        heading2: "text-3xl md:text-4xl",
        heading3: "text-2xl md:text-4xl",
        heading4: "text-xl md:text-4xl",
        heading5: "text-lg md:text-4xl",
        heading6: "text-base md:text-4xl",
      },
      textColor: {
        black: "text-black",
        white: "text-white",
      },
    },
    defaultVariants: {
      variant: "heading3",
      textColor: "black",
    },
  }
)

type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  tag?: HeadingTag
}

const Heading = ({
  children,
  className,
  variant,
  textColor,
  tag = "h3",
  ...props
}: HeadingProps) => {
  const Tag = tag

  return (
    <Tag
      className={cn(headingVariants({ variant, textColor, className }))}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Heading
