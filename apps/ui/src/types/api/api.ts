export interface TravelMakerListReq {
  time_limit: 1 | 2 | 3
  origin_of_trip: string
  distance_from_origin: 3 | 5 | 7
  means_of_travel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
  direction_of_movement?: 1 | 2 | 3 | 4 | 0
  count_of_elder_people?: number
  overnight_stay?: 1 | 2 | 3
}

export type TravelMakerSingleRes = {
  id: number
  name: string
  description: string
  places: {
    id: number
    name: string
    image_url: string
  }[]
  longitude: string
  latitude: string
  route_type: 1 | 2
  stop_and_quit: 1 | 2
  tag_slugs?: string[]
}

export type TravelMakerListRes = Array<TravelMakerSingleRes>

interface PackagesPlaceReq {
  package_id: number
}

export type PackagesPlaceRes = {
  description: string
  travel_plan: string
  video_url: string
  summary_of_travel_plan: string
  directions_url: string
  places: {
    id: number
    name: string
    longitude: string
    latitude: string
    first_image: string
    field1: string
    field2: string
    field3: string
    field4: string
    rating: number
  }[]
}

export type AttractionsCarouselRes = {
  tag_id: number
  blogs: {
    id: number
    title: string
    body: string
    place_name: string
    card_image: string
    link: string
  }[]
}[]

export type AttractionsLandingRes = {
  id: number
  title: string
  body: string
  place_name: string
  card_image: string
  link: string
}[]

interface BlogRes {
  coverImageUrl: string
  title: string
  createdDate: Date
  content: string
  weather: {
    temp: number // in celsius
    precipitation: number
    humidity: number
    wind: number
  }
  options: string[]
  tags: string[]
}
