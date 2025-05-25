"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageDivider from "../Divider";
import { TourDetail } from "@/types/tour";
import { getToursShownOnMap } from "@/hooks/useTour";
import BoatAnimation from "@/components/BoatAnimation";
import BoatAnimation2 from "@/components/BoatAnimation2";
import Link from "next/link";

const Maps = () => {
  const [tourData, setTourData] = useState<TourDetail[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className="bg-ocean py-20 relative overflow-hidden" id="section-map">
      <div className="absolute inset-0 bg-sea opacity-20 animate-fade-in-out animation-delay-0"></div>
      <div
        className="absolute inset-0 bg-sea opacity-20 animate-fade-in-out animation-delay-2"
        style={{ transform: "scaleX(-1)" }}
      ></div>
      <BoatAnimation />
      <BoatAnimation2 />
      <PageDivider
        background="transparent"
        color="white"
        customClass="absolute top-0 z-0"
      />
      <div className="w-full relative z-20 relative min-h-screen">
        <div className="absolute aspect-video my-auto inset-0 flex items-center justify-center mx-auto w-full md:w-[800px] xl:w-[55vw] px-4">
          <Image
            src="/assets/images/maps.png"
            width={500}
            height={300}
            alt="Maps"
            className="w-full mx-auto -mt-4 md:mt-0"
          />
        </div>
        <div className="absolute inset-0 aspect-video my-auto w-full md:w-[800px] xl:w-[55vw] mx-auto">
          {!loading &&
            tourData.map((loc) => {
              const randomDelay = `${Math.random() * 2}s`;
              return (
                <div
                  key={loc.id}
                  className="absolute group cursor-pointer z-10 hover:z-20"
                  style={{
                    top: `${loc.map_top}%`,
                    left: `${loc.map_left}%`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  <div
                    className="animate-bounce text-red-400 z-10 hover:z-20 relative"
                    style={{
                      animationDelay: randomDelay,
                      animationDuration: "1.5s",
                    }}
                  >
                    <i className="material-icons md:!text-[2rem] xl:!text-[3vw]">
                      location_on
                    </i>
                  </div>
                  <Link
                    href={`/tour/${loc.id}`}
                    key={`${loc.id}`}
                    className="w-1/4"
                  >
                    <div
                      className="absolute opacity-0 scale-95 h-64 group-hover:opacity-100 group-hover:scale-100 group-hover:z-[100] transition-all duration-300 ease-out bg-gray-700 shadow-lg rounded-xl w-[200px] text-white -mt-4 overflow-hidden cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                      style={{
                        zIndex: 100,
                      }}
                    >
                      <Image
                        src={loc.images_url}
                        alt={loc.name}
                        width={300}
                        height={256}
                        className="h-full w-auto object-cover"
                      ></Image>
                      <div className="absolute w-full bottom-0 bg-gradient-to-t from-[#2a5475] to-transparent pointer-events-none h-full"></div>
                      <div className={`absolute w-full bottom-0 text-left p-4`}>
                        <div className="text-[12px] my-2 font-bold">
                          {loc.name}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] ">
                          <span className="opacity-70 line-clamp-3">
                            {loc.map_description}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
        <div className="text-2xl xl:text-[2.5vw] pt-[12vh] md:pt-[6vh] text-white text-center">
          Lets Find{" "}
          <span className="text-3xl xl:text-[4vw] font-bold font-satisfy text-title-primary">
            Your
          </span>{" "}
          Next Escape
        </div>
      </div>
      <PageDivider
        background="transparent"
        color="white"
        customClass="absolute bottom-0 z-0 -mt-10"
        direction="up"
      />
    </div>
  );
};

export default Maps;
