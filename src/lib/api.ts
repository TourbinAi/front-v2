import axios, { AxiosResponse } from "axios";
import type {
  TravelMakerListReq,
  PackagesPlaceRes,
  TravelMakerListRes,
  AttractionsCarouselRes,
  AttractionsLandingRes,
} from "@/types/api";

const api = axios.create({
  headers: {
    accept: "application/json",
    "Content-Type": "application/json",
  },
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 300000,
});

export function TravelMakerList(
  props: TravelMakerListReq
): Promise<AxiosResponse<TravelMakerListRes, any>> {
  return api.post("/api/filter-packages/", props);
}

export function postData(
  packageId: number
): Promise<AxiosResponse<PackagesPlaceRes, any>> {
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
export function BlogUniqAPI(
  blog_type?: number,
  blog_id?: number
): Promise<AxiosResponse<any>> {
  return api.post("/blog/blog-reviews/", {
    blog_type: blog_type,
    blog_id: blog_id,
  });
}
