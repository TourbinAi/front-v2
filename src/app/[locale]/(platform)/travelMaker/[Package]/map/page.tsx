import { unstable_setRequestLocale } from "next-intl/server";
import MapPageComp from "../_components/mapPage";

const MapPage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);

  return <MapPageComp />;
};

export default MapPage;
