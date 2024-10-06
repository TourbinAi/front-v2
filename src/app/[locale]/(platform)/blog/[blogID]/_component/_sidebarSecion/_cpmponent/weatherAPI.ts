import axios from "axios";

export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
  icon: string;
}

const API_KEY = "KP9Z75KK97H8FNCBVKADQV7HW"; // Visual Crossing API Key

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const location=city.split("-")
  try {
    const res = await axios.get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location[0]}`,
      {
        params: {
          unitGroup: "metric",
          key: API_KEY,
          contentType: "json",
        },
      }
    );

    const result = res.data;
    const weatherData: WeatherData = {
      city: result.resolvedAddress,
      country: result.address, // داده‌ی کشور به‌طور مستقیم موجود نیست
      temperature: result.currentConditions.temp,
      description: result.currentConditions.conditions.toLowerCase(),
      icon: result.currentConditions.icon,
    };

    return weatherData;
  } catch (error) {
    throw new Error("Location not found");
  }
};
