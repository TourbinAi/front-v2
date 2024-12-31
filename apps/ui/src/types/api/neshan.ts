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

export interface NeshanDirectionType {
  routes: Route[]
}
interface Route {
  overview_polyline: OverviewPolyline
  legs: Leg[]
}
interface OverviewPolyline {
  points: string
}
interface Leg {
  summary: string
  distance: Distance
  duration: Duration
  steps: Step[]
}
interface Distance {
  value: number
  text: string
}
interface Duration {
  value: number
  text: string
}
interface Step {
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
