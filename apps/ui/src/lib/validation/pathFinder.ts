import { z } from "zod";

export const PathFinderSchemaLanding = z.object({
  origin: z.string().nonempty({ message: "Origin is required" }),
  destination: z.string().nonempty({ message: "Destination is required" }),
});

export const PathFinderSchema = z.object({
  origin: z.string().nonempty({ message: "Origin is required" }),
  destinations: z.array(
    z.string().nonempty({ message: "Destination is required" })
  ),
});