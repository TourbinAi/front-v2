import { unstable_setRequestLocale } from "next-intl/server";
import { Hero } from "./_components/Hero";
import React from "react";
import { FeatureDetails } from "./_components/FeatureDetails";
import { Attractions } from "./_components/Attractions";
import { Header } from "./_components/Header";

interface HomeProps {
  params: { locale: string };
}

export default function Home({ params }: HomeProps) {
  unstable_setRequestLocale(params.locale);
  return (
    <main className="relative">
      <Hero />
      <FeatureDetails />
      <Attractions />
    </main>
  );
}
