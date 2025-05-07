export function getWeatherIconName(code: number): string {
  if (code === 0) return "wb_sunny";
  if ([1, 2, 3].includes(code)) return "cloud";
  if ([45, 48].includes(code)) return "foggy";
  if ([51, 53, 55].includes(code)) return "rainy_light";
  if ([61, 63, 65, 80, 81, 82].includes(code)) return "rainy";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "help";
}

const weatherCodeClassMap: Record<number, string> = {
  0: "from-blue-500",
  1: "from-blue-500",
  2: "from-blue-500",
  3: "from-blue-500",
  45: "from-red-500",
  48: "from-red-500",
  51: "from-green-100",
  53: "from-green-100",
  55: "from-green-100",
  61: "from-green-500",
  63: "from-green-500",
  65: "from-green-500",
  80: "from-green-500",
  81: "from-green-500",
  82: "from-green-500",
  95: "from-purple-500",
  96: "from-purple-500",
  99: "from-purple-500",
};

export function getWeatherColor(code: number): string {
  return weatherCodeClassMap[code] || "from-neutral-300";
}
