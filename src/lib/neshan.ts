import axios, { AxiosResponse } from "axios";

import type { NeshanDirectionType, NeshanSearchType } from "@/types/neshan";

const api = axios.create({
  headers: {
    "api-key": process.env.NEXT_PUBLIC_NESHAN_KEY,
  },
  baseURL: "https://api.neshan.org",
  timeout: 300000,
});

export function neshanSearchAPI(
  value: string
): Promise<AxiosResponse<NeshanSearchType, any>> {
  // console.log("/api/packages/places/");

  return api.get(`/v1/search?term=${value}&lat=36.6875447&lng=51.3054564`);
}

export function neshanDirectionAPI(
  type: string,
  origin: { lat: number; lng: number },
  destination: { lat: number; lng: number },
  waypoints: string,
  avoidTrafficZone: boolean,
  avoidodEvenZone: boolean,
  alternative: boolean
): Promise<AxiosResponse<NeshanDirectionType>> {
  const url = `/v4/direction?type=${type}&origin=${origin.lat},${origin.lng}&destination=${destination.lat},${destination.lng}&waypoints=${waypoints}&avoidTrafficZone=${avoidTrafficZone}&avoidodEvenZone=${avoidodEvenZone}&alternative=${alternative}`;
  return api.get(url);
}
