function Place() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 p-4">
        {/* First column */}
        <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
          <img
            src="/assets/blog/cloud ocean.jpg"
            alt="Island with beautiful nature"
            className="w-full object-cover"
          />
          <div className="p-4">
            <h4 className="text-xl  font-bold mb-2">
              <a href="#">فیلبند مازندران کجاست: بالاتر از ابرها بایستید</a>
            </h4>
            <p className="text-sm text-gray-500">جنگل . آبشار . کوهنوردی</p>
          </div>
        </div>
  
        {/* Second column */}
        <div className="space-y-5">
          {/* First row in second column */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out">
            <img
              src="/assets/blog/Iran's Nature.jpg"
              alt="Weather in the Azores"
              className="w-full h-80  object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-2">
                بهشتی به اسم روستای سینوا چالوس
              </h4>
              <p className="text-sm text-gray-500">جنگل . آبشار . دریاچه</p>
            </div>
          </div>
  
          {/* Second row in second column */}
          <div className="rounded-lg overflow-hidden shadow-lg hover:scale-105 cursor-pointer transition-all duration-300 ease-in-out ">
            <img
              src="/assets/blog/vabenn.jpg"
              alt="Hiking in the mountains"
              className="w-full h-80 object-cover"
            />
            <div className="p-4">
              <h4 className="text-xl font-bold mb-2">
                وربن مردابی زیبا در دل سینوا
              </h4>
              <p className="text-sm text-gray-500">قایق سواری . جنگل</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Place;
  
