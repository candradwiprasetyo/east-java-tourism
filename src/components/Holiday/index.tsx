"use client";

import React, { useState } from "react";
import useHoliday from "../../hooks/useHoliday";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { backgroundImage } from "@/constants/backgroundImage";

const monthBgColors: { [key: number]: string } = {
  0: "bg-red-50", // Januari
  1: "bg-blue-50", // Februari
  2: "bg-green-50", // Maret
  3: "bg-yellow-50", // April
  4: "bg-pink-50", // Mei
  5: "bg-purple-50", // Juni
  6: "bg-indigo-50", // Juli
  7: "bg-teal-50", // Agustus
  8: "bg-orange-50", // September
  9: "bg-emerald-50", // Oktober
  10: "bg-amber-50", // November
  11: "bg-rose-50", // Desember
};

const Holiday = () => {
  const { holidays, loading, error } = useHoliday();

  const [filter, setFilter] = useState<string>("all");

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  // Filter holidays based on the selected filter
  let filteredHolidays = holidays;
  if (filter === "cuti") {
    filteredHolidays = holidays.filter((holiday) => holiday.is_cuti === true);
  } else if (filter === "libur") {
    filteredHolidays = holidays.filter((holiday) => holiday.is_cuti === false);
  }

  return (
    <div className="p-4 text-title-primary container mx-auto px-40">
      <div className="text-[3vw] py-8 text-title-primary text-center">
        Don’t Miss These{" "}
        <span className="text-[4vw] font-bold font-satisfy text-title-secondary">
          2025 Holidays!
        </span>
      </div>

      {/* Filter Selection */}
      <div className="flex justify-center space-x-4 mb-8">
        <button
          className={`p-2 px-4 rounded-lg ${
            filter === "all" ? "bg-gray-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("all")}
        >
          All Holidays
        </button>
        <button
          className={`p-2 px-4 rounded-lg ${
            filter === "cuti" ? "bg-gray-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("cuti")}
        >
          Collective Leave
        </button>
        <button
          className={`p-2 px-4 rounded-lg ${
            filter === "libur" ? "bg-gray-700 text-white" : "bg-gray-200"
          }`}
          onClick={() => setFilter("libur")}
        >
          National Holidays
        </button>
      </div>

      {/* Display Filtered Holidays */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 justify-items-center">
        {filteredHolidays.length > 0 ? (
          filteredHolidays.map((holiday, index) => {
            const month = new Date(holiday.tanggal).getMonth();
            const bgColorClass = monthBgColors[month];

            return (
              <div
                key={index}
                className="p-4 rounded-2xl flex justify-start items-center flex-col relative overflow-hidden w-full min-h-[150px]"
                style={{
                  backgroundImage: `url('${
                    backgroundImage[Math.floor(Math.random() * 10) + 1]
                  }')`,
                  backgroundSize: "cover",
                }}
              >
                <div
                  className={`absolute inset-0 opacity-90 ${bgColorClass}`}
                ></div>
                <div className="absolute inset-4">
                  <div className="text-5xl font-bold text-center leading-none z-1">
                    <div>
                      {format(new Date(holiday.tanggal), "d", { locale: id })}
                    </div>
                    <div className="uppercase text-sm">
                      {format(new Date(holiday.tanggal), "MMMM", {
                        locale: id,
                      })}
                    </div>
                  </div>
                  <p className="text-center mt-2 text-xs">
                    {holiday.keterangan}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="p-4 bg-gray-200 rounded-lg flex justify-center items-center">
            <span className="text-xl text-gray-600">
              No holidays found for the selected filter.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Holiday;
