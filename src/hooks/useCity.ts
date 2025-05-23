import { useEffect, useState, useCallback } from "react";
import { getWeatherIconName } from "@/lib/weather";
import { CityDetail } from "@/types/city";

export async function getCityDetail(id: string): Promise<CityDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/city/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch city detail");

  const city = await res.json();

  try {
    const weatherRes = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&hourly=relative_humidity_2m,precipitation,cloudcover,uv_index`
    );
    const weatherData = await weatherRes.json();

    city.weather = {
      ...weatherData.current_weather,
      humidity: weatherData.hourly?.relative_humidity_2m?.[0] ?? null,
      precipitation: weatherData.hourly?.precipitation?.[0] ?? null,
      cloudcover: weatherData.hourly?.cloudcover?.[0] ?? null,
      uv_index: weatherData.hourly?.uv_index?.[0] ?? null,
      icon: getWeatherIconName(weatherData.current_weather.weathercode),
    };
  } catch (error) {
    console.error("Failed to fetch weather data:", error);
  }

  return city;
}

export function useCity() {
  const [cities, setCities] = useState<CityDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchCities() {
      try {
        const res = await fetch("/api/city?limit=15");
        if (!res.ok) throw new Error("Failed to fetch cities");
        const json = await res.json();
        const data: CityDetail[] = json.data;

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

export function useAdminCity(limit = 10, offset = 0) {
  const [cities, setCities] = useState<CityDetail[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCities = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/city?admin=true&limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch cities");

      const json = await res.json();

      setCities(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  const getCityById = useCallback(async (id: number): Promise<CityDetail> => {
    const res = await fetch(`/api/city/${id}`);
    if (!res.ok) throw new Error("Failed to fetch city by ID");
    const data: CityDetail = await res.json();
    return data;
  }, []);

  const createCity = useCallback(
    async (city: Omit<CityDetail, "id" | "created_at" | "updated_at">) => {
      const res = await fetch("/api/city", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      if (!res.ok) throw new Error("Failed to create city");
      await fetchCities();
    },
    [fetchCities]
  );

  const updateCity = useCallback(
    async (id: number, city: Partial<CityDetail>) => {
      const res = await fetch(`/api/city/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(city),
      });
      if (!res.ok) throw new Error("Failed to update city");
      await fetchCities();
    },
    [fetchCities]
  );

  const deleteCity = useCallback(
    async (id: number) => {
      const res = await fetch(`/api/city/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete city");
      await fetchCities();
    },
    [fetchCities]
  );

  useEffect(() => {
    fetchCities();
  }, [fetchCities]);

  return {
    cities,
    total,
    loading,
    error,
    fetchCities,
    getCityById,
    createCity,
    updateCity,
    deleteCity,
  };
}
