import { useEffect, useState } from "react";
import { getWeatherIconName } from "@/lib/weather";

export interface City {
  id: number;
  name: string;
  longitude: number;
  latitude: number;
  description: string;
  created_at: string;
  updated_at: string;
  images_url: string;
  thumbnail_url: string;
  is_show_on_gallery: boolean;
  weather?: {
    temperature: number;
    windspeed: number;
    weathercode: number;
    time: string;
    icon: string;
  };
}

export function useCity() {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch("api/city");
        if (!res.ok) throw new Error("Failed to fetch cities");
        const data: City[] = await res.json();

        const citiesWithWeather = await Promise.all(
          data.map(async (city) => {
            try {
              const weatherRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true`
              );
              const weatherData = await weatherRes.json();
              return {
                ...city,
                weather: {
                  ...weatherData.current_weather,
                  icon: getWeatherIconName(
                    weatherData.current_weather.weathercode
                  ),
                },
              };
            } catch {
              return city;
            }
          })
        );

        setCities(citiesWithWeather);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchCities();
  }, []);

  return { cities, loading, error };
}
