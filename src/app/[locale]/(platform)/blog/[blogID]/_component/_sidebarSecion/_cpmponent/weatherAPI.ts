
export interface WeatherData {
  city: string;
  country: string;
  temperature: number;
  description: string;
}

const API_KEY = "198458e60fc9015aca9e770c9a83643b";

export const fetchWeather = async (city: string): Promise<WeatherData> => {
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  );
  const result = await res.json();

  if (!res.ok) {
    throw new Error("Location not found");
  }

  const weatherData: WeatherData = {
    city: result.name,
    country: result.sys.country,
    temperature: Math.floor(result.main.temp - 273.15),
    description: result.weather[0].description,
  };

  return weatherData;
};
