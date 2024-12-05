"use client";
import React, { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "./weatherAPI";

interface WeatherState {
  data: WeatherData | null;
  error: string | null;
  loading: boolean;
}

interface WeatherProps {
  city: string;
}
const WeatherComponent: React.FC<WeatherProps> = ({ city }) => {
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    error: null,
    loading: false,
  });
  const [descriptionWeather, setDescriptionWeather] = useState<string>("");
  const [gif, setGif] = useState<string>("");
  const [CityPlace, setCity] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setWeatherState({ data: null, error: null, loading: true });

      try {
        const data = await fetchWeather(city);
        console.log(data);

        setWeatherState({ data, error: null, loading: false });

        // console.log(data);

        if (data.icon.includes("cloudy")) {
          setGif("/assets/weatherGIF/output-onlinegiftools.gif");
          setDescriptionWeather("ابری");
        } else if (data.icon.includes("rain")) {
          setGif("/assets/weatherGIF/output-onlinegiftools (1).gif");
          setDescriptionWeather("بارونی");
        } else if (data.icon.includes("clear")) {
          setGif("/assets/weatherGIF/icegif-843.gif");
          setDescriptionWeather("آسمان صاف");
        } else if (data.icon.includes("haze")) {
          setGif("/assets/weatherGIF/haze.gif");
          setDescriptionWeather("مه آلود");
        } else if (data.icon.includes("sand")) {
          setGif("/assets/weatherGIF/sandmain.gif");
          setDescriptionWeather("غبار الود");
        }
      } catch (error) {
        setWeatherState({
          data: null,
          error: "Location not found",
          loading: false,
        });
      }
    };
    if (city) {
      fetchData();
      const nameCity = city.split("-");
      setCity(nameCity[1]);

      // console.log(city);
    }
  }, [city]);

  return (
    <div className="ml-4 mt-6 rounded-lg bg-orange-100 px-4">
      {weatherState.loading && <p>در حال ارتباط...</p>}
      {weatherState.error && (
        <p style={{ color: "red" }}>آب و هوای موردنظر در دسترس نیست</p>
      )}

      {weatherState.data && (
        <div className="flex flex-row items-center">
          <div>
            <div>
              <span>{CityPlace} </span>
              {/* <span>{weatherState.data.country}</span> */}
            </div>
            <div>
              <span className="mainTemp">
                {weatherState.data.temperature}°C
              </span>
            </div>
            <div>
              <span>{descriptionWeather}</span>
            </div>
          </div>
          <img
            className="w-40 rounded-full"
            src={gif}
            alt="Weather animation"
          />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
