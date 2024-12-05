import React from "react";
import Link from "next/link";
function NewPost() {
  return (
    <section className="rtl mx-auto mt-7 w-11/12">
      <h2 className="mb-6 text-right text-2xl font-bold">جشن ها و رویدادها</h2>
      <div className="space-y-8">
        {/* Post 1 */}
        <Link href={"filband/?blogtype=3&blogid=1"}>
          <div className="flex gap-4 border-b pb-5 duration-300 ease-in-out hover:scale-105">
            <img
              src="/assets/blog/koorosh.jpg"
              alt=""
              className="h-36 w-36 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">
                جشن شهریورگان؛ زادروز کوروش کبیر و روز پدر در ایران باستان
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                جشن شهریورگان، از جمله جشن‌های دوازده‌گانه سال و یکی از جشن‌های
                آتش در ایران باستان است.
              </p>
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <p className="text-gray-500">3 مرداد . 6 دقیقه خواندن</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* Post 2 */}
        <Link href={"filband/?blogtype=3&blogid=2"}>
          <div className="flex gap-4 border-b pb-5 duration-300 ease-in-out hover:scale-105">
            <img
              src="/assets/blog/mazn yalda.jpg"
              alt="Medium Day"
              className="h-36 w-36 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">
                آداب و رسوم مازندران در شب یلدا
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                مازندرانی‌ها شب یلدا را با عنوان «چله شو» یا «چله شی» یاد
                می‌کنند و به مناسبت این شب، سفره یا میزی می‌چینند که در گویش
                محلی «میزد» نامیده می‌شود.
              </p>
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <p className="text-gray-500">23 شهریور . 12 دقیقه خواندن</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
        {/* Post 3 */}
        <Link href={"filband/?blogtype=3&blogid=3"}>
          <div className="flex gap-4 border-b pb-5 duration-300 ease-in-out hover:scale-105">
            <img
              src="/assets/blog/mordegan.jpg"
              alt="Medium July Roundup"
              className="h-36 w-36 rounded-md object-cover"
            />
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold">
                آیین سنتی ۲۶ عیدماه طبری (جشن مردگان)
              </h3>
              <p className="mb-3 text-sm text-gray-600">
                عید مردگان یا «عید ماه» مراسم قدیمی و تاریخی استان مازندران است
                که چنانچه از نامش بر می‌آید، به درگذشتگان اختصاص دارد.
              </p>
              <div className="flex items-center gap-3">
                <div className="text-xs">
                  <p className="text-gray-500">7 اسفند . 6 دقیقه خواندن</p>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

export default NewPost;
