"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CityDetail } from "@/types/city";
import { TourDetail } from "@/types/tour";
import { getCityDetail } from "@/hooks/useCity";
import { getToursByCityId } from "@/hooks/useTour";
import { sanitizeDescription } from "@/lib/sanitize";
import PageDivider from "@/components/Divider";
import Link from "next/link";
import Loading from "@/components/Loading";

interface Props {
  cityId: string;
}

export default function CityDetailClient({ cityId }: Props) {
  const [city, setCity] = useState<CityDetail | null>(null);
  const [tours, setTours] = useState<TourDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCityAndTours() {
      try {
        const [cityData, toursData] = await Promise.all([
          getCityDetail(cityId),
          getToursByCityId(cityId),
        ]);

        console.log(cityData);

        setCity(cityData);
        setTours(toursData);
      } catch (error) {
        console.error("Error fetching city or tours:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCityAndTours();
  }, [cityId]);

  if (loading) return <Loading />;
  if (!city) return <p>City not found</p>;

  return (
    <div className="absolute h-full w-full">
      <div
        className="absolute h-full w-full bg-cover opacity-20"
        style={{ backgroundImage: `url("${city.images_url}")` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
      <div className="absolute w-full">
        <div className="max-w-4xl mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4 text-title-primary leading-normal">
            {city?.name}
          </h1>
          <Link
            href="/#section-city"
            className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition mb-4"
            scroll={true}
          >
            Back
          </Link>
          <div className="aspect-video overflow-hidden relative rounded-xl">
            <Image
              src={city.images_url}
              alt={city.name}
              width={800}
              height={400}
              className="w-full h-auto object-cover  mb-6 overflow-hidden rounded-2xl"
            />

            <div className="absolute top-4 right-4 text-white p-5 rounded-xl bg-[#2a5475] opacity-80">
              <div className="absolute inset-0"></div>
              {city.weather && (
                <div className="flex items-center gap-4 justify-between">
                  <div className="text-xs">
                    <ul className="space-y-2">
                      <li className="flex">
                        <div className="flex items-center gap-2">
                          <i
                            className="material-symbols-outlined mx-auto"
                            style={{ fontSize: "28px" }}
                          >
                            {city.weather.icon}
                          </i>
                          <span>{city.weather.temperature}°C</span>
                        </div>
                      </li>
                      <li>💨 Wind Speed: {city.weather.windspeed} km/h</li>
                      <li>💧 Humidity: {city.weather.humidity ?? "-"}%</li>
                      <li>
                        🌧️ Precipitation: {city.weather.precipitation ?? "-"} mm
                      </li>
                      <li>☁️ Cloud Cover: {city.weather.cloudcover ?? "-"}%</li>
                      <li>🌞 UV Index: {city.weather.uv_index ?? "-"}</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className="text-gray-500 prose-custom leading-8 mt-4"
            dangerouslySetInnerHTML={{
              __html: sanitizeDescription(city?.description),
            }}
          />

          {tours.length > 0 && (
            <div className="mt-10">
              <h2 className="text-xl font-semibold mb-4 text-title-primary">
                Tours in {city.name}
              </h2>
              <div className="flex w-max gap-5">
                {tours.map((tour) => (
                  <Link
                    href={`/tour/${tour.id}`}
                    key={`${tour.id}`}
                    className="w-auto flex-shrink-0 "
                  >
                    <div className="text-white w-44 h-60 bg-cover bg-center shadow-lg rounded-2xl overflow-hidden relative hover:scale-110 transition-transform duration-500 ease-in-out">
                      <Image
                        src={tour.thumbnail_url}
                        alt={tour.name}
                        width={300}
                        height={256}
                        className="h-full w-auto object-cover"
                      ></Image>
                      <div className="absolute w-full bottom-0 bg-gradient-to-t from-[#2a5475] to-transparent pointer-events-none h-full"></div>
                      <div className={`absolute w-full bottom-0 text-left p-4`}>
                        <div className="text-[12px] my-2">{tour.name}</div>
                        <div className="flex items-center gap-1 text-[10px]">
                          <span className="opacity-70">
                            {tour.map_description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
        <PageDivider direction="up" />
      </div>
    </div>
  );
}
