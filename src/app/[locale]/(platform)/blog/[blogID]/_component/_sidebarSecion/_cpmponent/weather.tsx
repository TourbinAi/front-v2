"use client";
import React, { useEffect, useState } from "react";
import { fetchWeather, WeatherData } from "./weatherAPI";

interface WeatherState {
  data: WeatherData | null;
  error: string | null;
  loading: boolean;
}

const WeatherComponent: React.FC = () => {
  const [userCity, setUserCity] = useState<string>("فیلبند");
  const [weatherState, setWeatherState] = useState<WeatherState>({
    data: null,
    error: null,
    loading: false,
  });
  const [descriptionWeather, setDescriptionWeather] = useState<string>("");
  const [gif, setGif] = useState<string>("");
  useEffect(() => {
    const fetchData = async () => {
      setWeatherState({ data: null, error: null, loading: true });

      try {
        const data = await fetchWeather(userCity);
        setWeatherState({ data, error: null, loading: false });

        console.log(data);

        if (data.description.includes("clouds")) {
          setGif("/assets/weatherGIF/output-onlinegiftools.gif");
          setDescriptionWeather("ابری");
        } else if (data.description.includes("rain")) {
          setGif("/assets/weatherGIF/output-onlinegiftools (1).gif");
          setDescriptionWeather("بارونی");
        } else if (data.description.includes("clear")) {
          setGif("/assets/weatherGIF/icegif-843.gif");
          setDescriptionWeather("آسمان صاف");
        } else if (data.description.includes("haze")) {
          setGif("/assets/weatherGIF/haze.gif");
          setDescriptionWeather("مه آلود");
        } else if (data.description.includes("sand")) {
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
    fetchData();
  }, [userCity]);

  return (
    <div className="ml-4 mt-6 rounded-lg bg-orange-100 px-4">
      {weatherState.loading && <p>Loading...</p>}
      {weatherState.error && (
        <p style={{ color: "red" }}>{weatherState.error}</p>
      )}

      {weatherState.data && (
        <div className="flex flex-row items-center">
          <div>
            <div>
              <span>{userCity} </span>
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
