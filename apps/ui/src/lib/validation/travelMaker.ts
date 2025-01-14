import { z } from "zod"

export const TravelMakerSelectValues = {
  duration: ["1d", "2d", "3d"],
  placeNature: [
    "shade_and_greenery",
    "sun_and_sea",
    "mountain",
    "andventure_and_exitment",
    "historical_and_cultural",
  ],
  distance: ["3h", "5h", "7h"],
  route: ["easy", "hard"],
  disState: ["oneWay", "multiple"],
  vehicle: [
    "car",
    "off-road",
    "bus",
    "bicycle",
    "Car-offroad",
    "offroad-bicycle",
    "car-bicycle",
    "nissan-car",
  ],
  direction: ["north", "south", "west", "east"],
  accommodation: ["camp", "hotel", "visit"],
} as const

export const SidebarSchema = z.object({
  origin: z.string({ required_error: " required" }).min(2, ""),
  distance: z.enum(TravelMakerSelectValues.distance, {
    required_error: " required",
  }),
  duration: z.enum(TravelMakerSelectValues.duration, {
    required_error: " required",
  }),
  vehicle: z.enum(TravelMakerSelectValues.vehicle, {
    required_error: " required",
  }),
  direction: z.enum(TravelMakerSelectValues.direction).optional(),
  oldPerson: z.boolean().optional(),
  accommodation: z.enum(TravelMakerSelectValues.accommodation).optional(),
})
