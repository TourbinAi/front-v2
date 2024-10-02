import { z } from "zod";

export const PathFinderSchema = z.object({
  origin: z.string().nonempty({ message: "Origin is required" }),
  destinations: z.array(z.string().nonempty({ message: "Destination is required" })),
});
