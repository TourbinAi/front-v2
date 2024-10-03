function Foodsouvenirs() {
    return (
      <div className="mt-7 mr-3 ml-3">
        <h2 className="text-2xl font-bold mb-6 text-center">غذا و سوغات</h2>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Post 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
            <img
              className="w-full h-48 object-cover cursor-pointer transition-all duration-300 ease-in-out "
              src="/assets/blog/cloud ocean.jpg"
              alt="طبیعت"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-green-600">طبیعت</h3>
              <a href="#" className="block text-xl font-bold mb-2">
                فیلبند مازندران کجاست: بالاتر از ابرها بایستید
              </a>
              <span className="text-gray-500 text-sm mb-4 block">
                22 شهریور 1403
              </span>
              <p className="text-gray-700">
                حتما تا‌به‌حال عکس‌های خیره‌کننده از طبیعت روستای فیلبند را
                دیده‌اید که فردی بالای کوه ایستاده و ابر‌ها رو‌به‌رویش، درست زیر
                پایش قرار دارند! و با خودتان فکر کرده‌اید مگر می‌شود واقعی باشد؟
              </p>
              <div className="flex items-center mt-4 gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/assets/blog/testi3.jpg"
                  alt="یاسمن تیموری"
                />
                <span className="text-gray-700 ml-2">یاسمن تیموری</span>
              </div>
            </div>
          </div>
  
          {/* Post 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
            <img
              className="w-full h-48 object-cover"
              src="/assets/blog/Iran's Nature.jpg"
              alt="طبیعت"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-green-600">طبیعت</h3>
              <a href="#" className="block text-xl font-bold mb-2">
                بهشتی به اسم روستای سینوا چالوس
              </a>
              <span className="text-gray-500 text-sm mb-4 block">
                23 آبان 1402
              </span>
              <p className="text-gray-700">
                تا حرف از شمال می‌شود همه ذهن‌ها به خزرشهر، نور، دریاکنار یا
                شهرها و روستاهای ساحلی محدود می‌شود...
              </p>
              <div className="flex items-center mt-4 gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/assets/blog/testi3.jpg"
                  alt="حدیثه سلیمانی"
                />
                <span className="text-gray-700 ml-2">حدیثه سلیمانی</span>
              </div>
            </div>
          </div>
  
          {/* Post 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
            <img
              className="w-full h-48 object-cover"
              src="/assets/blog/vabenn.jpg"
              alt="طبیعت"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-green-600">طبیعت</h3>
              <a href="#" className="block text-xl font-bold mb-2">
                وربن مردابی زیبا در دل سینوا
              </a>
              <span className="text-gray-500 text-sm mb-4 block">
                13 مهر 1402
              </span>
              <p className="text-gray-700">
                مرداب وربن یکی از جاذبه‌های طبیعی و گردشگری زیبای استان مازندران
                است...
              </p>
              <div className="flex items-center mt-4 gap-3">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/assets/blog/testi2.jpg"
                  alt="MKHB"
                />
                <span className="text-gray-700 ml-2">MKHB</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Foodsouvenirs;
  