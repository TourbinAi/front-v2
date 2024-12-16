import * as React from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

import type { MDXComponents } from "mdx/types"

import { Link } from "@/lib/navigation"
import { cn } from "@/lib/styles"
import { Callout } from "@/components/page-builder/callout"
import { MdxCard } from "@/components/page-builder/mdx-card"

import Heading from "../typography/Heading"
import { Paragraph } from "../typography/Paragraph"
import { LinkStrapi } from "./components/LinkStrapi"

const components: MDXComponents = {
  h1: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h1" variant="heading1" className={className} {...props}>
      {children}
    </Heading>
  ),
  h2: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h2" variant="heading2" className={className} {...props}>
      {children}
    </Heading>
  ),
  h3: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h3" variant="heading3" className={className} {...props}>
      {children}
    </Heading>
  ),
  h4: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h4" variant="heading4" className={className} {...props}>
      {children}
    </Heading>
  ),
  h5: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h5" variant="heading5" className={className} {...props}>
      {children}
    </Heading>
  ),
  h6: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <Heading tag="h6" variant="heading6" className={className} {...props}>
      {children}
    </Heading>
  ),
  a: ({
    className,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      className={cn("font-medium underline underline-offset-4", className)}
      {...props}
    >
      {children}
    </a>
  ),
  p: ({
    className,
    children,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <Paragraph
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </Paragraph>
  ),
  ul: ({
    className,
    children,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props}>
      {children}
    </ul>
  ),
  ol: ({
    className,
    children,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
    [key: string]: any
  }) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props}>
      {children}
    </ol>
  ),
  li: ({
    className,
    children,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
    [key: string]: any
  }) => (
    <li className={cn("mt-2", className)} {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    className,
    children,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <blockquote
      className={cn(
        "mt-6 border-l-2 pl-6 italic [&>*]:text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </blockquote>
  ),
  img: ({
    className,
    alt,
    src,
    width,
    height,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <Image
      className={cn("rounded-md border", className)}
      alt={alt ?? ""}
      src={src ?? ""}
      width={width ? Number(width) : 1200}
      height={height ? Number(height) : 630}
      {...props}
    />
  ),
  hr: ({ ...props }) => <hr className="my-4 md:my-8" {...props} />,
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr
      className={cn("m-0 border-t p-0 even:bg-muted", className)}
      {...props}
    />
  ),
  th: ({
    className,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <th
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({
    className,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <td
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  pre: ({
    className,
    ...props
  }: {
    className?: string
    children?: React.ReactNode
  }) => (
    <pre
      className={cn(
        "mb-4 mt-6 overflow-x-auto rounded-lg border bg-black py-4",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: React.HTMLProps<HTMLElement>) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  ),
  Image,
  Callout,
  Card: MdxCard,
}

interface MdxProps {
  code: string
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code)

  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  )
}
