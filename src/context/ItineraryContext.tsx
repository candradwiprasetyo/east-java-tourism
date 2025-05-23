"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { DateRange } from "react-day-picker";

type ItineraryContextType = {
  selectedCities: string[];
  setSelectedCities: Dispatch<SetStateAction<string[]>>;
  selectedInterest: string[];
  setSelectedInterest: Dispatch<SetStateAction<string[]>>;
  selectedDate: DateRange | undefined;
  setSelectedDate: (date: DateRange | undefined) => void;
};

const ItineraryContext = createContext<ItineraryContextType | undefined>(
  undefined
);

export const ItineraryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedInterest, setSelectedInterest] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<DateRange | undefined>(
    undefined
  );

  return (
    <ItineraryContext.Provider
      value={{
        selectedCities,
        setSelectedCities,
        selectedInterest,
        setSelectedInterest,
        selectedDate,
        setSelectedDate,
      }}
    >
      {children}
    </ItineraryContext.Provider>
  );
};

export const useItineraryContext = (): ItineraryContextType => {
  const context = useContext(ItineraryContext);
  if (!context) {
    throw new Error(
      "useItineraryContext must be used within an ItineraryProvider"
    );
  }
  return context;
};
