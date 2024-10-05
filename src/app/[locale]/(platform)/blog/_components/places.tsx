"use client";
// import Link from "next/link";
import { Link } from "@/i18n/navigation";
// import Link from "next/link";
function Place() {
  return (
    <div className="grid grid-cols-1 gap-5 p-4 sm:grid-cols-2">
      {/* First column */}

      <div className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
        <Link href={"/blog/filband/?blogtype=1&blogid=29"}>
          <img
            src="/assets/blog/cloud ocean.jpg"
            alt="Island with beautiful nature"
            className="h-[740px] w-full object-cover"
          />
          <div className="p-4">
            <h4 className="mb-2 text-xl font-bold">
              فیلبند مازندران کجاست: بالاتر از ابرها بایستید
            </h4>
            <p className="text-sm text-gray-500">جنگل . آبشار . کوهنوردی</p>
          </div>
        </Link>
      </div>

      {/* Second column */}
      <div className="space-y-5">
        {/* First row in second column */}
        <div className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <img
            src="/assets/blog/Iran's Nature.jpg"
            alt="Weather in the Azores"
            className="h-80 w-full object-cover"
          />
          <div className="p-4">
            <h4 className="mb-2 text-xl font-bold">
              بهشتی به اسم روستای سینوا چالوس
            </h4>
            <p className="text-sm text-gray-500">جنگل . آبشار . دریاچه</p>
          </div>
        </div>

        {/* Second row in second column */}
        <div className="cursor-pointer overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:scale-105">
          <Link href={"/blog/filband/?blogtype=1&blogid=28"}>
            <img
              src="/assets/blog/lafor.jpg"
              alt="Hiking in the mountains"
              className="h-80 w-full object-cover"
            />

            <div className="p-4">
              <h4 className="mb-2 text-xl font-bold">دهستان لفور </h4>
              <p className="text-sm text-gray-500">قایق سواری . جنگل</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Place;
