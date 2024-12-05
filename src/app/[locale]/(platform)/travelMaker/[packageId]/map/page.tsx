import MapPageComponent from "../_components/mapPage";

interface MapPageProps {
  params: {
    packageId: string;
  };
}

export default function MapPage({ params }: MapPageProps) {
  return <MapPageComponent packageId={params.packageId} />;
}
