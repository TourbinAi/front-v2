import path from "path"

import { env } from "@/env.mjs"

import { AppLocale } from "@/types/general"

import { Link } from "@/lib/navigation"
import Strapi from "@/lib/strapi"

async function getData() {
  try {
    const pages = await Strapi.fetchMany("api::page.page", {
      populate: ["cover"],
    })
    return pages.data
  } catch (e) {
    console.error(`No page defined in Strapi or invalid permissions.`, e)
    return []
  }
}

export default async function RootBuilderPage() {
  const pages = await getData()

  return (
    <div>
      <h3 className="text-center text-3xl font-bold text-gray-900">
        Welcome to Page Builder
      </h3>

      {pages.length ? (
        <div>
          <p className="text-center text-xl text-gray-700">Available pages</p>
          <div className="mt-5 flex gap-3">
            {pages.map((page, i) => (
              <Link
                locale={page.locale as AppLocale}
                href={`/blog/${page.slug}`}
                key={String(page.id) + i}
              >
                <div className="rounded-md bg-gray-200 p-6 text-center transition-colors duration-200 hover:bg-gray-400">
                  {page.cover && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={path.join(
                        env.NEXT_PUBLIC_STRAPI_URL,
                        page.cover.url
                      )}
                      alt={page.title ?? ""}
                      className="h-48 w-full rounded-md border bg-muted object-cover transition-colors"
                    />
                  )}
                  <h3 className="text-lg font-bold text-gray-900">
                    {page.title}
                  </h3>
                  {page.createdAt && <p>{String(page.createdAt)}</p>}
                  {page.locale && <p>{String(page.locale)}</p>}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-xl text-red-700">
          No page available. Check Strapi.
        </p>
      )}
    </div>
  )
}
