"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageDivider from "../Divider";
import { TourDetail } from "@/types/tour";
import { getToursShownOnMap } from "@/hooks/useTour";
import BoatAnimation from "@/components/BoatAnimation";
import BoatAnimation2 from "@/components/BoatAnimation2";

const Maps = () => {
  const [tourData, setTourData] = useState<TourDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
                  <div
                    onClick={() => router.push(`/tour/${loc.id}`)}
                    className="absolute opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 group-hover:z-20 transition-all duration-300 ease-out bg-gray-700 shadow-lg rounded-xl w-[240px] text-white -mt-4 overflow-hidden cursor-pointer pointer-events-none group-hover:pointer-events-auto"
                    style={{
                      zIndex: 20,
                    }}
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
