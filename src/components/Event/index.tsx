"use client";

import React from "react";
import { useEvent } from "@/hooks/useEvent";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";

const Event = () => {
  const { events } = useEvent();

  const duplicatedEvents = [...events, ...events];

  return (
    <div className="relative overflow-hidden py-10" id="event-list">
      <div className="container mx-auto">
        <div className="text-[3vw] py-8 text-title-primary text-center">
          The Special{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary">
            Occasion
          </span>{" "}
          of the Year
        </div>
      </div>

      <div className="relative w-full text-white">
        <div className="flex w-max animate-scroll gap-6">
          {duplicatedEvents.map((event, idx) => (
            <Link
              href={`/event/${event.id}`}
              key={`${event.id}-${idx}`}
              className="w-auto flex-shrink-0 "
            >
              <div className="w-56 h-80 bg-cover bg-center shadow-lg rounded-3xl overflow-hidden relative hover:scale-110 transition-transform duration-500 ease-in-out">
                <Image
                  src={event.images_url}
                  alt={event.name}
                  width={300}
                  height={256}
                  className="h-full w-auto object-cover"
                ></Image>
                <div className="absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent pointer-events-none h-full"></div>
                <div className={`absolute w-full bottom-0 text-left p-4`}>
                  <span className="text-[9px] font-bold px-3 py-1 bg-green-600 rounded-full mb-2 text-white opacity-70">
                    {format(new Date(event.start_date), "dd MMMM yyyy")}
                  </span>
                  <div className="text-[12px] my-2">{event.name}</div>
                  <div className="flex items-center gap-1 text-[10px]">
                    <i
                      className="material-icons text-white"
                      style={{ fontSize: "15px" }}
                    >
                      location_on
                    </i>
                    <span className="opacity-70">{event.city_name}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
