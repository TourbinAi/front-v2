import { Hero } from "./_components/Hero";
import React from "react";
import { FeatureDetails } from "./_components/FeatureDetails";
import { Attractions } from "./_components/Attractions";


export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <FeatureDetails />
      <Attractions />
    </main>
  );
}
