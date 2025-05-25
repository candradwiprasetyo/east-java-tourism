import { useState, useEffect } from "react";

const useLocation = () => {
  const [userCity, setUserCity] = useState<string>("");

  useEffect(() => {
    const fetchLocationByIP = async () => {
      try {
        const res = await fetch("/api/ip-location");
        const data = await res.json();

        const city = data.city || "";
        const state = data.region || "";
        const country = data.country || "";

        const fullLocation = [city, state, country].filter(Boolean).join(", ");
        setUserCity(fullLocation || "Unknown location");
      } catch (error) {
        console.error("Failed to fetch location from IP:", error);
        setUserCity("Unknown location");
      }
    };

    const fetchLocationByCoords = async (
      latitude: number,
      longitude: number
    ) => {
      try {
        const res = await fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${process.env.NEXT_PUBLIC_OPENCAGE_API_KEY}`
        );
        const data = await res.json();

        const components = data.results[0]?.components || {};
        const city =
          components.city ||
          components.town ||
          components.village ||
          components.county ||
          "";
        const state = components.state || "";
        const country = components.country || "";

        const fullLocation = [city, state, country].filter(Boolean).join(", ");
        setUserCity(fullLocation || "Unknown location");
      } catch (error) {
        console.error("Failed to fetch city from coordinates:", error);
        fetchLocationByIP();
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchLocationByCoords(latitude, longitude);
        },
        (error) => {
          console.warn(
            "Geolocation failed or denied, using IP:",
            error.message
          );
          fetchLocationByIP();
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
