import axios, { AxiosResponse } from "axios";
import type {
  TravelMakerListReq,
  PackagesPlaceRes,
  TravelMakerListRes,
  AttractionsCarouselRes,
  AttractionsLandingRes,
} from "@/types/api";
import { backendUrl } from "@/constants/config";

const api = axios.create({
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: backendUrl,
  timeout: 300000,
});

export function TravelMakerList(
  props: TravelMakerListReq
): Promise<AxiosResponse<TravelMakerListRes, any>> {
  // console.log(`Base URL: ${api.defaults.baseURL}`);

  return api.post("/api/filter-packages/", props);
}

export function postData(
  packageId: number
): Promise<AxiosResponse<PackagesPlaceRes, any>> {
  // console.log("/api/packages/places/");

  return api.post("/api/packages/places/", { package_id: packageId });
}
export function AttractionsAPI(
  area_id?: number
): Promise<AxiosResponse<AttractionsCarouselRes, any>> {
  return api.post("/blog/filter-place-blogs/", { area_ids: [area_id] });
}

export function AttractionsLanding(
  blog_count: number
): Promise<AxiosResponse<AttractionsLandingRes, any>> {
  return api.post("/blog/landing-page-blogs/", { blog_count: blog_count });
}
