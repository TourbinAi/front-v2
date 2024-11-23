export interface NeshanDataItemType {
  address: string
  category: string
  location: { x: number; y: number; z: any }
  region: string
  title: string
  type: string
}

export interface NeshanSearchType {
  count: number
  items: NeshanDataItemType[]
}
<<<<<<< HEAD
=======

export interface NeshanDirectionType {
  routes: Route[]
}
export interface Route {
  overview_polyline: OverviewPolyline
  legs: Leg[]
}
export interface OverviewPolyline {
  points: string
}
export interface Leg {
  summary: string
  distance: Distance
  duration: Duration
  steps: Step[]
}
export interface Distance {
  value: number
  text: string
}
export interface Duration {
  value: number
  text: string
}
export interface Step {
  name: string
  instruction: string
  bearing_after: number
  type: string
  modifier: string
  exit?: number
  distance: Distance
  duration: Duration
  polyline: string
  start_location: number[]
}
>>>>>>> 294a6e7 (fix((marketing)/page.tsx): header component was not imported properly)
