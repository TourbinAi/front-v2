import React from "react";
import Header from "./_components/header";
import Firstsection from "./_components/section1";
import Place from "./_components/places";
import Foodsouvenirs from "./_components/FoodAndSouvenirs";
import NewPost from "./_components/news";
const HomePage = () => {
  return (
    <div className="h-full overflow-y-scroll">
      <Header />
      <hr />
      <Firstsection />
      <div id="place">
        <Place />
      </div>
      <div id="Foodsouvenirs">
        <Foodsouvenirs />
      </div>
      <NewPost />
    </div>
  );
};

export default HomePage;
