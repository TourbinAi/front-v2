"use client";
import React, { useEffect, useState } from "react";
import Editor from "./mainSection";
import SideBarBlog from "./_sidebarSecion/layout";
import { BlogUniqAPI } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { PanelRightOpen } from "lucide-react";

const App: React.FC = () => {
  const searchParams = useSearchParams();
  const [responseData, setData] = useState<any>();
  const [isSheetOpen, setIsSheetOpen] = useState<boolean>(false); // کنترل باز بودن Sheet

  useEffect(() => {
    const fetchData = async () => {
      const blogtypeparam = (searchParams.get("blogtype") || "").replace(
        /\/$/,
        ""
      );
      const blogidparam = (searchParams.get("blogid") || "").replace(/\/$/, "");
      const numberBlogId = Number(blogidparam);
      const numberBlogType = Number(blogtypeparam);

      const response = await BlogUniqAPI(numberBlogType, numberBlogId);
      setData(response);
    };
    fetchData();
  }, [searchParams]);

  useEffect(() => {
    // Handle responseData changes if needed
  }, [responseData]);

  return (
    <div className="flex h-screen flex-col overflow-y-auto lg:flex-row">
      {/* Desktop view */}
      <div className="w-full lg:w-3/4">
        {responseData ? (
          <Editor
            data={responseData?.data.content}
            image={responseData?.data.card_image}
          />
        ) : (
          <div>Loading...</div> // نمایش یک حالت لودینگ یا پیام
        )}
      </div>

      {/* Sidebar for desktop */}
      <div className="hidden h-screen lg:block lg:w-1/4">
        <SideBarBlog nameCity={responseData?.data.name_of_city} />
      </div>

      {/* Mobile view */}
      <div className="w-full lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              className="fixed right-4 top-16 z-20 h-14 w-14 rounded-full"
            >
              <PanelRightOpen />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SideBarBlog nameCity={responseData?.data.name_of_city} />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default App;
