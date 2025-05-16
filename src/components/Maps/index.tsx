"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // import useRouter
import PageDivider from "../Divider";
import { TourDetail } from "@/types/tour";
import { getToursShownOnMap } from "@/hooks/useTour";

const Maps = () => {
  const [tourData, setTourData] = useState<TourDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // init router

  useEffect(() => {
    async function fetchTours() {
      try {
        const tours = await getToursShownOnMap();
        setTourData(tours);
      } catch (err) {
        console.error("Error loading tours:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchTours();
  }, []);

  return (
    <div className="bg-ocean py-20 relative">
      <PageDivider
        background="transparent"
        color="white"
        customClass="absolute top-0 z-0"
      />
      <div className="w-full min-h-screen bg-maps relative z-50">
        <div className="text-[3vw] pt-10 text-white text-center">
          Lets Find{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-primary">
            Your
          </span>{" "}
          Next Escape
        </div>

        {!loading &&
          tourData.map((loc) => {
            const randomDelay = `${Math.random() * 2}s`;
            return (
              <div
                key={loc.id}
                className="absolute group cursor-pointer"
                style={{
                  top: `${loc.map_top}%`,
                  left: `${loc.map_left}%`,
                  transform: "translate(-50%, -100%)",
                }}
              >
                <div
                  className="animate-bounce text-red-400"
                  style={{
                    fontSize: "60px",
                    animationDelay: randomDelay,
                    animationDuration: "1.5s",
                  }}
                >
                  <i className="material-icons" style={{ fontSize: "42px" }}>
                    location_on
                  </i>
                </div>
                <div
                  onClick={() => router.push(`/tour/${loc.id}`)}
                  className="absolute hidden group-hover:block bg-gray-700 shadow-lg rounded-xl w-[240px] z-60 text-white -mt-10 overflow-hidden cursor-pointer"
                >
                  <div className="relative">
                    <Image
                      src={loc.thumbnail_url}
                      alt={loc.name}
                      width={300}
                      height={256}
                      className="h-full w-auto object-cover"
                    />
                    <div className="text-xs flex items-center mt-2 gap-1 font-bold absolute -bottom-4 right-3 bg-[#eea5a0] px-4 py-2 rounded-full">
                      {loc.city_name}
                    </div>
                  </div>
                  <div className="px-4 py-6">
                    <h4 className="font-bold text-sm mb-2">{loc.name}</h4>
                    <p className="text-xs text-gray-300">{loc.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <PageDivider
        background="transparent"
        color="white"
        customClass="absolute bottom-0 z-0"
        direction="up"
      />
    </div>
  );
};

export default Maps;
