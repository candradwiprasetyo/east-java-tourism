import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
  safelist: [
    "from-yellow-500",
    "from-green-500",
    "from-purple-500",
    "from-blue-100",
    "from-blue-500",
    "from-red-500",
    "from-neutral-300",
  ],
} satisfies Config;
