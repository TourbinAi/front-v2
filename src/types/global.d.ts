import en from "../../messages/en.json";
import fa from "../../messages/fa.json";

type EnglishMessages = typeof en;
type FarsiMessages = typeof fa;

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends EnglishMessages, FarsiMessages {}
}
