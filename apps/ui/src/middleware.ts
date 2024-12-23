import { NextRequest } from "next/server"
import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "./lib/i18n"

// https://next-intl-docs.vercel.app/docs/getting-started/app-router
const intlMiddleware = createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
})

const publicPages = [
  "/",
  "/pathFinder",
  "/pathFinder/.*",
  "/travelMaker",
  "/travelMaker/.*",
  "/blog",
  "/blog/.*",
  "/auth/signin",
  "/docs",
  "/about"
]

export default function middleware(req: NextRequest) {
  // Handle HTTPS redirection in production in Heroku servers
  // const xForwardedProtoHeader = req.headers.get("x-forwarded-proto")
  // if (
  //   env.NODE_ENV === "production" &&
  //   (xForwardedProtoHeader === null ||
  //     xForwardedProtoHeader.includes("https") === false)
  // ) {
  //   return NextResponse.redirect(
  //     `https://${req.headers.get("host")}${req.nextUrl.pathname}`,
  //     301
  //   )
  // }

  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(${publicPages
      .flatMap((p) => (p === "/" ? ["", "/"] : p))
      .join("|")})/?$`,
    "i"
  )
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

  if (isPublicPage) {
    return intlMiddleware(req)
  }
}

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",
    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    `/(fa|en)/:path*`,

    // Skip all paths that should not be internationalized
    "/((?!_next|_vercel|api|.*\\..*).*)",
  ],
}
