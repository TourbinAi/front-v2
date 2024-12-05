import TravelMaker from "./_components/travelMaker";
import { Suspense } from "react";

const TravelMakerPage = () => {
  return (
    <Suspense fallback={<div>Loading Page...</div>}>
      <TravelMaker />
    </Suspense>
  );
};

export default TravelMakerPage;
