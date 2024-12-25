"use client"

import React from "react"
import { Attribute } from "@repo/strapi"
import { serialize } from "next-mdx-remote/serialize"

// import { MDXRemote } from "next-mdx-remote"
import { Mdx } from "../mdx-components"

interface BlogMarkdownProps {
  component: Attribute.GetDynamicZoneValue<
    Attribute.DynamicZone<["sections.blog-markdown"]>
  >[number]
}

export function BlogMarkdown({ component }: BlogMarkdownProps) {
  const [mdxSource, setMdxSource] = React.useState<any>(null)

  React.useEffect(() => {
    const renderMDX = async () => {
      if (component.Markdown) {
        const mdxSource = await serialize(component.Markdown)
        setMdxSource(mdxSource)
      }
    }
    renderMDX()
  }, [component.Markdown])

  if (!mdxSource) return null

  return (
    <div className="prose prose-lg max-w-none">
      <Mdx {...mdxSource} />
    </div>
  )
}
