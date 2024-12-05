import { unstable_setRequestLocale } from "next-intl/server";
import TravelMaker from "./_components/travelMaker";
import { Suspense } from "react";

interface HomeProps {
  params: { locale: string };
}

const TravelMakerPage = ({ params }: HomeProps) => {
  unstable_setRequestLocale(params.locale);
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <TravelMaker />
    </Suspense>
  );
};

export default TravelMakerPage;
