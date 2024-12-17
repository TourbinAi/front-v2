import { Suspense } from "react"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import TravelMaker from "./_components/travelMaker"

const TravelMakerPage = () => {
  return (
    <NuqsAdapter>
    <Suspense fallback={<div>Loading Page...</div>}>
      <TravelMaker />
    </Suspense>
    </NuqsAdapter>
  )
}

export default TravelMakerPage
