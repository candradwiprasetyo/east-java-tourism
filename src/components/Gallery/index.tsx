"use client";

import React from "react";
import { useCity } from "@/hooks/useCity";
import Image from "next/image";
import { getWeatherColor } from "@/lib/weather";

const Gallery = () => {
  const { cities, loading, error } = useCity();

  console.log(cities);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-white">
      <div className="container mx-auto px-40 pb-20">
        <div className="text-[3vw] py-16 text-title-primary px-10 ">
          Catch the{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary ">
            Forecast{" "}
          </span>
          feel the{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary ">
            Journey
          </span>
        </div>
        <div className="columns-2 md:columns-4 gap-4 space-y-4">
          {cities.map((city) => (
            <div key={city.id} className="relative overflow-hidden rounded-lg">
              <Image
                src={city.images_url}
                alt={city.name}
                className="w-full rounded-lg"
                width={500}
                height={500}
              />
              <div
                className={`text-center absolute w-full inset-0  bg-gradient-to-t from-black to-transparent flex items-center justify-center`}
              ></div>
              <div
                className={`text-center absolute w-full inset-0  bg-gradient-to-t ${getWeatherColor(
                  city.weather?.weathercode || 0
                )} to-transparent opacity-30`}
              ></div>
              {/* <div
                className={`text-center absolute w-full inset-0  bg-gradient-to-t from-blue-500 opacity-50`}
              ></div> */}
              <div
                className={`text-center absolute w-full inset-0 flex items-center justify-center`}
              >
                {city.weather && (
                  <div className="text-sm text-white text-center">
                    <i
                      className="material-symbols-outlined text-white mx-auto"
                      style={{ fontSize: "32px" }}
                    >
                      {city.weather.icon}
                    </i>
                    <p className="text-2xl text-white">
                      {city.weather.temperature}°c
                    </p>
                    <p className="mt-2">{city.name}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
