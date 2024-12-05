import { env } from "@/env.mjs";
import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

import { locales } from "./config";

export const routing = defineRouting({
  locales,
  defaultLocale: "fa",
});

// https://next-intl-docs.vercel.app/docs/routing/navigation
export const { Link, redirect, usePathname, getPathname, useRouter } =
  createNavigation(routing);
