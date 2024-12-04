import React from "react"

import { Attractions } from "./_components/Attractions"
import { FeatureDetails } from "./_components/FeatureDetails"
import { Header } from "./_components/Header"
import { Hero } from "./_components/Hero"

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureDetails />
      <Attractions />
    </main>
  )
}
