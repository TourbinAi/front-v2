import React from "react";
import Header from "./_components/header";
import Firstsection from "./_components/section1";
import Place from "./_components/places";
import Foodsouvenirs from "./_components/FoodAndSouvenirs";
import NewPost from "./_components/news";
import { unstable_setRequestLocale } from "next-intl/server";
import Footer from "../../_components/Footer";
const HomePage = ({ params }: { params: { locale: string } }) => {
  unstable_setRequestLocale(params.locale);

  return (
    <div className="h-full overflow-y-scroll">
      <Header />
      <hr />
      <Firstsection />
      <Place />
      <Foodsouvenirs />
      <NewPost />
      <Footer />
    </div>
  );
};

export default HomePage;
