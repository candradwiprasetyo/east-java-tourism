"use client";

import { useState, useEffect } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import PageDivider from "../Divider";
import "react-day-picker/dist/style.css";
import useHoliday from "@/hooks/useHoliday";
import { id } from "date-fns/locale";
import { format } from "date-fns";

type ModalCalendarProps = {
  isOpen: boolean;
  onClose: () => void;
  onCalendarSelect: (range: DateRange | undefined) => void;
};

const ModalCalendar = ({
  isOpen,
  onClose,
  onCalendarSelect,
}: ModalCalendarProps) => {
  const [range, setRange] = useState<DateRange | undefined>();
  const [month, setMonth] = useState<Date>(new Date());

  const { holidays } = useHoliday();
  const [holidayDates, setHolidayDates] = useState<Date[]>([]);

  useEffect(() => {
    if (holidays.length > 0) {
      const parsedDates = holidays.map((holiday) => new Date(holiday.tanggal));
      setHolidayDates(parsedDates);
    }
  }, [holidays]);

  const handleSelect = (selected: DateRange | undefined) => {
    setRange(selected);
    onCalendarSelect(selected);
  };

  if (!isOpen) return null;

  // Filter libur untuk bulan yang sedang ditampilkan
  const holidaysInCurrentMonth = holidays.filter((holiday) => {
    const date = new Date(holiday.tanggal);
    return (
      date.getMonth() === month.getMonth() &&
      date.getFullYear() === month.getFullYear()
    );
  });

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        onClick={onClose}
      ></div>
      <div
        className="bg-white p-6 rounded-2xl w-[700px] text-title-primary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">When Will the Journey Begin?</h2>
        <div className="text-sm max-h-72">
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleSelect}
            numberOfMonths={2}
            defaultMonth={range?.from}
            showOutsideDays
            locale={id}
            className="mx-auto flex justify-center gap-4"
            modifiers={{ holiday: holidayDates }}
            modifiersClassNames={{
              holiday: "bg-red-300 rounded-lg",
            }}
            onMonthChange={(newMonth) => setMonth(newMonth)}
          />
        </div>

        {holidaysInCurrentMonth.length > 0 && (
          <div className="mt-16">
            <h3 className="text-md font-semibold mb-2 text-red-600">
              Holiday:
            </h3>
            <ul className="text-xs list-disc pl-5 text-gray-800">
              {holidaysInCurrentMonth.map((holiday, index) => (
                <li key={index}>
                  {format(new Date(holiday.tanggal), "dd MMMM", { locale: id })}{" "}
                  – {holiday.keterangan}
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={onClose}
          className="bg-green-400 text-white p-3 rounded-lg mt-8 block mx-auto"
        >
          Pick It
        </button>

        <div className="absolute w-full bottom-0 left-0 pointer-events-none">
          <PageDivider direction="up" background="#edcebb" />
        </div>
      </div>
    </>
  );
};

export default ModalCalendar;
