"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CityDetail } from "@/types/city";
import { getCityDetail } from "@/hooks/useCity";
import { sanitizeDescription } from "@/lib/sanitize";
import PageDivider from "@/components/Divider";
import Link from "next/link";
import Loading from "@/components/Loading";

interface Props {
  cityId: string;
}

export default function CityDetailClient({ cityId }: Props) {
  const [city, setCity] = useState<CityDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCity() {
      try {
        const data = await getCityDetail(cityId);
        setCity(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadCity();
  }, [cityId]);

  if (loading) return <Loading />;
  if (!city) return <p>Event not found</p>;

  return (
    <>
      <PageDivider />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 text-title-primary leading-normal">
          {city?.name}
        </h1>
        <Link
          href="/#section-city"
          className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition mb-4"
          scroll={true}
        >
          Back
        </Link>
        <Image
          src={city.images_url}
          alt={city.name}
          width={800}
          height={400}
          className="w-full h-auto object-cover rounded-md mb-6"
        />

        <div
          className="text-gray-500 prose-custom leading-8"
          dangerouslySetInnerHTML={{
            __html: sanitizeDescription(city?.description),
          }}
        ></div>
      </div>
      <PageDivider direction="up" />
    </>
  );
}
