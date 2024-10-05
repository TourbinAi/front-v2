import App from "./_component/layer";
import { unstable_setRequestLocale } from "next-intl/server";
function Bloguniq({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale);
  return <App />;
}

export default Bloguniq;
