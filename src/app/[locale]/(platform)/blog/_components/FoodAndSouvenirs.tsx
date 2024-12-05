import Link from "next/link";
function Foodsouvenirs() {
  return (
    <div className="ml-3 mr-3 mt-7">
      <h2 className="mb-6 text-center text-2xl font-bold">غذا و سوغات</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Post 1 */}
        <Link href={"filband/?blogtype=2&blogid=1"}>
          <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-105">
            <img
              className="h-48 w-full cursor-pointer object-cover transition-all duration-300 ease-in-out"
              src="/assets/blog/khorak.jpg"
              alt="طبیعت"
            />

            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-green-600">غذا</h3>
              <span className="mb-2 block text-xl font-bold">
                گردشگری خوراک در ایران
              </span>
              <span className="mb-4 block text-sm text-gray-500">
                22 شهریور 1403
              </span>
              <p className="text-gray-700">
                غذاهای ایرانی در زمره خوش‌طعم‌ترین غذاهای جهان قرار دارند. بر
                اساس تحقیقات پژوهشگران بیش از 2500 نوع غذا در کشور وجود دارد
              </p>
              <div className="mt-4 flex items-center gap-3"></div>
            </div>
          </div>
        </Link>
        {/* Post 2 */}
        <Link href={"filband/?blogtype=2&blogid=2"}>
          <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-105">
            <img
              className="h-48 w-full object-cover"
              src="/assets/blog/soghadtMashhad.jpg"
              alt="طبیعت"
            />

            <div className="p-4">
              <h3 className="mb-2 text-lg font-semibold text-green-600">
                سوغات
              </h3>
              <span className="mb-2 block text-xl font-bold">
                صنایع دستی کردستان
              </span>
              <span className="mb-4 block text-sm text-gray-500">
                23 آبان 1402
              </span>
              <p className="text-gray-700">
                بی‌شک یکی از مهم‌ترین استان‌های کشور که سابقه زیادی در تولید
                قالی‌های دستباف دارد، استان کردستان است.
              </p>
              <div className="mt-4 flex items-center gap-3"></div>
            </div>
          </div>
        </Link>
        {/* Post 3 */}
        <Link href={"filband/?blogtype=2&blogid=3"}>
          <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow-md transition-all duration-300 ease-in-out hover:scale-105">
            <img
              className="h-48 w-full object-cover"
              src="/assets/blog/soght mashhad.jpg"
              alt="طبیعت"
            />

            <div className="p-4">
              <h3 className="mb-2 block text-xl font-bold text-green-600">
                سوغات
              </h3>
              <span className="mb-2 block text-xl font-bold">سوغات مشهد</span>
              <span className="mb-4 block text-sm text-gray-500">
                13 مهر 1402
              </span>
              <p className="text-gray-700">
                خرید سوغات مشهد، از خوراکی‌‌های خوشمزه گرفته تا صنایع دستی و
                سنگ‌های زینتی، از جذاب‌ترین بخش‌های سفر به این شهر است.
              </p>
              <div className="mt-4 flex items-center gap-3"></div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Foodsouvenirs;
