"use client";

import clsx from "clsx";
import { useState, useEffect } from "react";
import ModalLocation from "@/components/ModalLocation";
import ModalInterest from "@/components/ModalInterest";
import ModalCalendar from "@/components/ModalCalendar";
import ModalLoading from "@/components/ModalLoading";
import { DateRange } from "react-day-picker";
import { useRouter } from "next/navigation";
import useLocation from "@/hooks/useLocation";
import { coversData } from "@/constants/coversData";
import { calculateDayDifference } from "@/lib/dateUtils";
import ModalValidation from "../ModalValidation";

export default function MainSearch() {
  const router = useRouter();
  const [isModalLocationOpen, setIsModalLocationOpen] =
    useState<boolean>(false);
  const [isModalValidationOpen, setIsModalValidationOpen] =
    useState<boolean>(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [isModalInterestOpen, setIsModalInterestOpen] =
    useState<boolean>(false);
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const [isModalCalendarOpen, setIsModalCalendarOpen] =
    useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);
  const userCity = useLocation();

  const covers = coversData;

  const toggleModalLocation = () => {
    setIsModalLocationOpen(!isModalLocationOpen);
  };

  const toggleModalInterest = () => {
    setIsModalInterestOpen(!isModalInterestOpen);
  };

  const toggleModalCalendar = () => {
    setIsModalCalendarOpen(!isModalCalendarOpen);
  };

  const toggleModalValidation = () => {
    setIsModalValidationOpen(!isModalValidationOpen);
  };

  const handleCitySelection = (city: string) => {
    setSelectedCities((prevState) =>
      prevState.includes(city)
        ? prevState.filter((item) => item !== city)
        : [...prevState, city]
    );
  };

  const handleInterestSelection = (interest: string) => {
    setSelectedInterest((prevState) =>
      prevState.includes(interest)
        ? prevState.filter((item) => item !== interest)
        : [...prevState, interest]
    );
  };

  const handleCalendarSelect = (range: DateRange | undefined) => {
    setSelectedDate(range);
  };

  const handleExplore = async () => {
    if (!selectedDate?.from || !selectedDate?.to) {
      setIsModalValidationOpen(true);
      return;
    }

    setLoading(true);

    const payload = {
      origin: userCity || "Unknown",
      destinations: selectedCities,
      interests: selectedInterest,
      start_date: selectedDate.from.toISOString(),
      end_date: selectedDate.to.toISOString(),
      itinerary_data: {},
    };

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || "Failed to save itinerary");
      }

      const data = await res.json();

      const params = new URLSearchParams();
      if (selectedCities.length > 0) {
        params.append("cities", selectedCities.join(","));
      }
      if (selectedInterest.length > 0) {
        params.append("interests", selectedInterest.join(","));
      }
      params.append("from", selectedDate.from.toISOString());
      params.append("to", selectedDate.to.toISOString());

      router.push(`/itinerary/${data.id}`);
    } catch (err) {
      setLoading(false);
      console.error(err);
      alert("Failed to save itinerary. Please try again.");
    }
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isAnyModalOpen =
      isModalLocationOpen ||
      isModalInterestOpen ||
      isModalCalendarOpen ||
      isModalValidationOpen ||
      loading;

    if (isAnyModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [
    isModalLocationOpen,
    isModalInterestOpen,
    isModalCalendarOpen,
    isModalValidationOpen,
    loading,
  ]);

  return (
    <>
      <div className="flex items-center h-screen relative">
        <div className="hidden">{userCity}</div>
        <div className="flex xl:max-w-[80%] container mx-auto items-center relative px-4">
          {covers.map((cover) => (
            <div
              key={cover.id}
              className={clsx(
                `shadow-xl relative overflow-hidden`,
                cover.classCover
              )}
              style={{ height: `${cover.height}vh` }}
            >
              <div className="absolute inset-0 bg-black opacity-40"></div>
              <div
                className={clsx(
                  "text-white absolute bottom-[5%] text-[0.8vw] w-full text-center font-bold",
                  cover.classCoverTitle
                )}
              ></div>
            </div>
          ))}
          <div className="absolute mx-auto left-0 right-0 h-full flex items-center justify-center">
            <div className="relative w-full pb-[8vh]">
              <div className="text-white  text-[2vw] left-0 right-0 bottom-40 mx-auto text-center">
                Discover the Wonders of{"  "}
                <span className="text-[4vw] font-bold font-satisfy text-[#f0f08d]">
                  East Java
                </span>
              </div>
              <div className="rounded-full bg-white h-[5rem] absolute w-[81.5%] opacity-30 mx-auto h-[6vw] flex items-center justify-center left-0 right-0"></div>
              <div className="rounded-full bg-white h-[5rem] relative w-[80%] mx-auto h-[5vw] mt-[1vh]">
                <div
                  className="absolute left-[1vw] top-[1vw] flex gap-[1vw] cursor-pointer"
                  onClick={toggleModalLocation}
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-green-100 flex items-center justify-center">
                    <i
                      className="material-icons text-green-500"
                      style={{ fontSize: "1.5vw" }}
                    >
                      location_on
                    </i>
                  </div>
                  <div className="mt-[0.2vw]">
                    <div className="text-[0.8vw] text-green-500 font-bold">
                      Destination
                    </div>
                    <div className="text-[1vw] font-bold text-black cursor-pointer">
                      {selectedCities.length > 0
                        ? `${selectedCities.length} selected`
                        : "All"}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute left-[18vw] top-[1vw] flex gap-[1vw] cursor-pointer"
                  onClick={toggleModalCalendar}
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-blue-100 flex items-center justify-center">
                    <span
                      className="material-icons text-blue-500"
                      style={{ fontSize: "1.5vw" }}
                    >
                      calendar_month
                    </span>
                  </div>
                  <div className="mt-[0.2vw]">
                    <div className="text-[0.8vw] text-blue-500 font-bold">
                      Date
                    </div>
                    <div className="text-[1vw] font-bold text-black cursor-pointer">
                      {selectedDate?.from && selectedDate?.to
                        ? calculateDayDifference(
                            selectedDate.from,
                            selectedDate.to
                          )
                        : "Choose date"}
                    </div>
                  </div>
                </div>
                <div
                  className="absolute left-[36vw] top-[1vw] flex gap-[1vw] cursor-pointer"
                  onClick={toggleModalInterest}
                >
                  <div className="w-[3vw] h-[3vw] rounded-full bg-red-100 flex items-center justify-center">
                    <span
                      className="material-icons text-red-500"
                      style={{ fontSize: "1.5vw" }}
                    >
                      favorite
                    </span>
                  </div>
                  <div className="mt-[0.2vw]">
                    <div className="text-[0.8vw] text-red-500 font-bold">
                      Interest
                    </div>
                    <div className="text-[1vw] font-bold text-black">
                      {selectedInterest.length > 0
                        ? `${selectedInterest.length} selected`
                        : "All"}
                    </div>
                  </div>
                </div>
                <button
                  disabled={loading}
                  onClick={handleExplore}
                  className="bg-blue-300 right-[0.5vw] top-[0.5vw] text-white text-[1vw] absolute font-bold mx-auto rounded-full h-[4vw] my-auto w-[8vw] flex items-center justify-center cursor-pointer text-center"
                >
                  Explore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalLocation
        isOpen={isModalLocationOpen}
        onClose={toggleModalLocation}
        selectedCities={selectedCities}
        onCitySelect={handleCitySelection}
      />
      <ModalInterest
        isOpen={isModalInterestOpen}
        onClose={toggleModalInterest}
        selectedData={selectedInterest}
        onInterestSelect={handleInterestSelection}
      />
      <ModalCalendar
        isOpen={isModalCalendarOpen}
        onClose={toggleModalCalendar}
        onCalendarSelect={handleCalendarSelect}
      />

      <ModalValidation
        isOpen={isModalValidationOpen}
        onClose={toggleModalValidation}
        content="Please select a date range first"
      />

      {loading && <ModalLoading />}
    </>
  );
}
