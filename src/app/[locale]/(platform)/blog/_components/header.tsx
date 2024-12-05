import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div className="rtl mt-[30px] mr-[35%] flex items-center justify-between">
        <h2 className="text-3xl text-nowrap  font-bold">مجله گردشگری</h2>
        <div className="ml-[200px] gap-[15px] hidden lg:flex">

        </div>
      </div>
    </header>
  );
};

export default Header;
