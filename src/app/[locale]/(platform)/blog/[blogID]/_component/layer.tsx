"use client";
import React, { useEffect, useState } from "react";
import Editor from "./mainSection";
import SideBarBlog from "./_sidebarSecion/layout";
import { BlogUniqAPI } from "@/lib/api";
// import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
const App: React.FC = () => {
  const searchParams = useSearchParams();
  const [responseData, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const blogtypeparam = (searchParams.get("blogtype") || "").replace(
        /\/$/,
        ""
      );
      const blogidparam = (searchParams.get("blogid") || "").replace(/\/$/, "");
      const numberBlogId = Number(blogidparam);
      const numberBlogType = Number(blogtypeparam);
      // console.log(blogidparam);
      // console.log(blogtypeparam);

      const response = await BlogUniqAPI(numberBlogType, numberBlogId);
      setData(response);
    };
    fetchData();
  }, [searchParams]);
  useEffect(() => {
    // console.log(responseData);
    // console.log(responseData?.data.name_of_city);
  }, [responseData]);
  return (
    <div className="flex flex-row overflow-y-scroll">
      <div className="h-screen w-3/4">
        {responseData ? (
          <Editor data={responseData?.data.content} />
        ) : (
          <div>Loading...</div> // نمایش یک حالت لودینگ یا پیام
        )}
      </div>
      <div className="h-screen w-1/4">
        <SideBarBlog nameCity={responseData?.data.name_of_city} />
      </div>
    </div>
  );
};

export default App;
