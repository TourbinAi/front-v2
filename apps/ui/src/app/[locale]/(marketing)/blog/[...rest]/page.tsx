import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useTranslations } from "next-intl"
import { serialize } from "next-mdx-remote/serialize"

import { PageProps } from "@/types/next"

import { formatDate } from "@/lib/dates"
import { getMetadataFromStrapi } from "@/lib/next-helpers"
import Strapi from "@/lib/strapi"
import { MDXContent } from "@/components/blog/mdx-components"
import { Button } from "@/components/ui/button"

async function fetchData(pageUrl: string, locale: string) {
  try {
    return Strapi.fetchOneBySlug("api::page.page", pageUrl, {
      // @ts-ignore - "deep" is not recognized as it comes from strapi extension
      populate: "deep" as "*",
      locale,
    })
  } catch (e: any) {
    console.error(`"api::page.page" wasn't fetched: `, e?.message)
    return undefined
  }
}

type Props = PageProps<{
  rest: string[]
}>

export async function generateMetadata({ params }: Props) {
  const pageUrl = params.rest.filter((part) => part != "builder").join("/")
  return getMetadataFromStrapi({ pageUrl, locale: params.locale })
}

export default async function StrapiPage({ params }: Props) {
  const t = useTranslations("blog.single")
  const pageUrl = params.rest.filter((part) => part != "builder").join("/")
  const response = await fetchData(pageUrl, params.locale)
  const page = response?.data?.attributes

  if (page?.content == null) {
    notFound()
  }

  const mdxSource = await serialize(page.content)

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Button
        href="/blog"
        variant="ghost"
        className="absolute left-[-200px] top-14 hidden xl:inline-flex"
      >
        {t("seeAllPosts")}
        <ChevronLeft className="mr-2 size-4" />
      </Button>
      <div>
        {page.publishedAt && (
          <time
            dateTime={page.publishedAt.toString()}
            className="block text-sm text-muted-foreground"
          >
            {t("publishedOn")} {formatDate(page.publishedAt)}
          </time>
        )}
        <h1 className="font-heading mt-2 inline-block text-4xl leading-tight lg:text-5xl">
          {page.title}
        </h1>
        {page.author?.avatar && (
          <div className="mt-4 flex space-x-4">
            <Image
              src={page.author?.avatar}
              alt={page.author?.name}
              width={42}
              height={42}
              className="rounded-full bg-white"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{page.author?.name}</p>
              <p className="text-[12px] text-muted-foreground">
                @{page.author?.name}
              </p>
            </div>
          </div>
        )}
      </div>
      {page.cover && (
        <Image
          src={page.cover}
          alt={page.title}
          width={720}
          height={405}
          className="my-8 rounded-md border bg-muted transition-colors"
          priority
        />
      )}
      <MDXContent mdxSource={mdxSource} />
      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Button href="/blog" variant="ghost">
          <ChevronLeft className="mr-2 size-4" />
          See all posts
        </Button>
      </div>
    </article>
  )
}
