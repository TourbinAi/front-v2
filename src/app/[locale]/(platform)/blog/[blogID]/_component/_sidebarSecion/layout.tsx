"use client"
import Category from "./_cpmponent/category";
import WeatherComponent from "./_cpmponent/weather";

interface Props {
  nameCity: string;
}

function SideBarBlog({ nameCity }: Props) {
  return (
    <div>
      <WeatherComponent city={nameCity} /> 
      <Category />
    </div>
  );
}

export default SideBarBlog;
