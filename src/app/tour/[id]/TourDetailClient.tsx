"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TourDetail } from "@/types/tour";
import { getTourDetail } from "@/hooks/useTour";
import { sanitizeDescription } from "@/lib/sanitize";
import PageDivider from "@/components/Divider";
import Link from "next/link";

interface Props {
  tourId: string;
}

export default function TourDetailClient({ tourId }: Props) {
  const [tour, setTour] = useState<TourDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTour() {
      try {
        const data = await getTourDetail(tourId);
        setTour(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadTour();
  }, [tourId]);

  if (loading) return <p>Loading...</p>;
  if (!tour) return <p>Event not found</p>;

  return (
    <>
      <PageDivider />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 text-title-primary leading-normal">
          {tour?.name}
        </h1>
        <div className="text-sm text-gray-500 mb-4">{tour?.address}</div>
        <Link
          href="/#event-list"
          className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition mb-4"
          scroll={true}
        >
          Back
        </Link>
        <Image
          src={tour.images_url}
          alt={tour.name}
          width={800}
          height={400}
          className="w-full h-auto object-cover rounded-md mb-6"
        />

        <div
          className="text-gray-500 prose-custom leading-8"
          dangerouslySetInnerHTML={{
            __html: sanitizeDescription(tour?.description),
          }}
        ></div>
      </div>
      <PageDivider direction="up" />
    </>
  );
}
