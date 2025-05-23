import { Itinerary } from "@/types/itinerary";
import ItineraryPageClient from "./ItineraryPageClient";

async function getItinerary(id: string): Promise<Itinerary | null> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/itinerary?id=${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) return null;

  const data = await res.json();
  return data.data;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const itinerary = await getItinerary(resolvedParams.id);
  if (!itinerary) return {};

  const destination = itinerary.destinations?.join(", ") || "Travel Itinerary";
  const interests = itinerary.interests?.join(", ");
  const title = `Trip from ${itinerary.origin} to ${destination} East Java`;
  const description = `Explore your itinerary with interest in ${interests}. Plan your journey from ${itinerary.origin} to ${destination} East Java.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: "https://res.cloudinary.com/dl5renyaj/image/upload/v1746539008/pantai-karang-bolong-pacitan-profile1653616465_whhnuk.jpg",
          width: 800,
          height: 600,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        "https://res.cloudinary.com/dl5renyaj/image/upload/v1746539008/pantai-karang-bolong-pacitan-profile1653616465_whhnuk.jpg",
      ],
    },
  };
}

export default async function ItineraryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const itinerary = await getItinerary(resolvedParams.id);
  return <ItineraryPageClient itinerary={itinerary} />;
}
