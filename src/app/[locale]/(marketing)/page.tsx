import React from "react";

import { Attractions } from "./_components/ui/Attractions";
import { FeatureDetails } from "./_components/ui/FeatureDetails";
import { Header } from "./_components/ui/Header";
import { Hero } from "./_components/ui/Hero";

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <FeatureDetails />
      <Attractions />
    </main>
  );
}
