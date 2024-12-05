import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const optionalZodBoolean = z
  .string()
  .toLowerCase()
  .transform((x) => x === "true")
  .pipe(z.boolean())
  .optional();

export const env = createEnv({
  emptyStringAsUndefined: true,

  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    NEXT_BACKEND_USERNAME: z.string(),
    NEXT_BACKEND_PASSWORD: z.string(),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },

  /*
   * Environment variables available on the client (and server).
   * You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_BACKEND_URL: z.string().url(),
    NEXT_PUBLIC_NESHAN_KEY: z.string(),
  },

  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   * You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    NEXT_BACKEND_USERNAME: process.env.NEXT_BACKEND_USERNAME,
    NEXT_BACKEND_PASSWORD: process.env.NEXT_BACKEND_PASSWORD,
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
    NEXT_PUBLIC_NESHAN_KEY: process.env.NEXT_PUBLIC_NESHAN_KEY,
    NODE_ENV: process.env.NODE_ENV,
  },
});
