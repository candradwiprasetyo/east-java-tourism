"use client";

import React from "react";
import { useEvent } from "@/hooks/useEvent";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { useEffect } from "react";

const Event = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, []);

  const { events } = useEvent();

  const duplicatedEvents = [...events, ...events];

  return (
    <div className="relative overflow-hidden py-10" id="event-list">
      <div className="container mx-auto px-40">
        <div className="text-[3vw] py-8 text-title-primary">
          The Special{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary">
            Occasion
          </span>{" "}
          of the Year
        </div>
      </div>

      <div className="relative w-full text-white">
        <div className="flex w-max animate-scroll">
          {duplicatedEvents.map((event, idx) => (
            <Link
              href={`/event/${event.id}`}
              key={`${event.id}-${idx}`}
              className="h-64 w-auto flex-shrink-0"
            >
              <div className="relative w-full h-full transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer hover:z-[50] hover:rounded-lg overflow-hidden">
                <Image
                  src={event.images_url}
                  alt={event.name}
                  width={300}
                  height={256}
                  className="h-full w-auto object-cover"
                ></Image>
                <div
                  className={`absolute w-full bottom-0 bg-gradient-to-t from-black to-transparent pointer-events-none text-left font-bold p-4`}
                >
                  <div className="w-1/2">{event.name}</div>
                </div>
                <div className="absolute top-3 right-0 bg-blue-400 opacity-80 text-xs px-3 py-1 font-bold rounded-l-full">
                  {format(new Date(event.start_date), "dd MMMM yyyy")}
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
