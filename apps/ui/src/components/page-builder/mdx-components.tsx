import * as React from "react"
import Image from "next/image"
import { useMDXComponent } from "next-contentlayer/hooks"

import type { MDXComponents } from "mdx/types"

import { cn } from "@/lib/styles"
import { Callout } from "@/components/page-builder/callout"
import { MdxCard } from "@/components/page-builder/mdx-card"

const components: MDXComponents = {
  h1: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      className={cn(
        "mt-10 scroll-m-20 border-b pb-1 text-3xl font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  ),
  h4: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h4>
  ),
  h5: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h5>
  ),
  h6: ({
    className,
    children,
    ...props
  }: React.HTMLProps<HTMLHeadingElement>) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    >
      {children}
    </h6>
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
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    >
      {children}
    </p>
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
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    children?: React.ReactNode
  }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
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
