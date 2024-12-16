import { Suspense } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"

import TravelMaker from "./_components/travelMaker"

const TravelMakerPage = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <NuqsAdapter>
        <TravelMaker />
      </NuqsAdapter>
    </Suspense>
  )
}

export default TravelMakerPage
