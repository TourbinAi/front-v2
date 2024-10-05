
import { useTranslations } from "next-intl";
// import Link from 'next/link';
import { Link } from "@/i18n/navigation";
function Category() {
  const t = useTranslations("blogCategory");
  return (
    <div className="ml-4 mt-6 rounded-lg bg-orange-100 px-4">
      <h1 className="mb-3 text-center text-xl">{t("title")}</h1>
      <ul>
        <li className="cursor-pointer transition-all duration-300 ease-in-out hover:text-xl">
          <Link href="/blog/#place">{t("place")}</Link>
        </li>
        <li className="cursor-pointer transition-all duration-300 ease-in-out hover:text-xl">
          {" "}
          <Link href="/blog/#Foodsouvenirs">{t("food")} </Link>
        </li>
        <li className="cursor-pointer transition-all duration-300 ease-in-out hover:text-xl">
          {" "}
          <Link href="/blog/">{t("event")}</Link>
        </li>
      </ul>
    </div>
  );
}

export default Category;
