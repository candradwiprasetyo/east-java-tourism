// hooks/useLocation.ts

import { useState, useEffect } from "react";

const useLocation = () => {
  const [userCity, setUserCity] = useState<string | null>(null);

  useEffect(() => {
    const fetchLocationByIP = async () => {
      try {
        const res = await fetch("/api/ip-location");
        const data = await res.json();
        setUserCity(data.city);
      } catch (error) {
        console.error("Failed to fetch location from IP:", error);
      }
    };

    if (navigator.geolocation) {
      console.log("Geolocation is available.");
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
          try {
            const res = await fetch(
              `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
            );
            const data = await res.json();
            console.log(
              "City from coordinates:",
              data.results[0]?.components.city
            );
            setUserCity(data.results[0]?.components.city || "Unknown");
          } catch (error) {
            console.error("Failed to fetch city from coordinates:", error);
            fetchLocationByIP(); // fallback
          }
        },
        (error) => {
          console.warn(
            "Geolocation failed or denied, using IP:",
            error.message
          );
          fetchLocationByIP(); // fallback
        }
      );
    } else {
      console.warn("Geolocation is not supported, using IP.");
      fetchLocationByIP();
    }
  }, []);

  return userCity;
};

export default useLocation;
