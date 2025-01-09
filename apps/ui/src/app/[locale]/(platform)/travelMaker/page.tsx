import { Suspense } from "react"

import TravelMaker from "./_components/travelMakerv2"

const TravelMakerPage = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <TravelMaker />
    </Suspense>
  )
}

export default TravelMakerPage
