export const metadata = {
  title: "Explore Jawa Timur",
  description:
    "Buat itinerary liburan ke Jawa Timur secara otomatis berdasarkan minat, durasi, dan kota tujuan. Jelajahi wisata terbaik dengan efisien",
  openGraph: {
    title: "Explore Jawa Timur",
    description:
      "Buat itinerary liburan ke Jawa Timur secara otomatis berdasarkan minat, durasi, dan kota tujuan. Jelajahi wisata terbaik dengan efisien",
    url: "https://east-java-tourism.vercel.app",
    siteName: "Jawa Timur Itinerary",
    images: [
      {
        url: "https://res.cloudinary.com/dl5renyaj/image/upload/v1746539008/pantai-karang-bolong-pacitan-profile1653616465_whhnuk.jpg",
        width: 800,
        height: 600,
        alt: "Explore Jawa Timur",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore Jawa Timur",
    description:
      "Buat itinerary liburan ke Jawa Timur secara otomatis berdasarkan minat, durasi, dan kota tujuan. Jelajahi wisata terbaik dengan efisien",
    images: [
      "https://res.cloudinary.com/dl5renyaj/image/upload/v1746539008/pantai-karang-bolong-pacitan-profile1653616465_whhnuk.jpg",
    ],
  },
};

import MainSearch from "@/components/MainSearch";
import Gallery from "@/components/Gallery";
import Maps from "@/components/Maps";
import Event from "@/components/Event";
import Footer from "@/components/Footer";
import PageDivider from "@/components/Divider";
import Sea from "@/components/Sea";

export default function Home() {
  return (
    <>
      <MainSearch />
      <Maps />
      <Gallery />
      <Sea />
      <Event />
      <Footer />
      <PageDivider direction="up" background="transparent" />
    </>
  );
}
