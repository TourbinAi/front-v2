import { unstable_setRequestLocale } from "next-intl/server";
import MapForm from "./_components/mapFormContainer";

function PathFinder({ params: { locale } }: { params: { locale: string } }) {
  unstable_setRequestLocale(locale);

  return (
    <>
      <MapForm />
    </>
  );
}

export default PathFinder;
