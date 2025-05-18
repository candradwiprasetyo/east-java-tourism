"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { CityDetail } from "@/types/city";
import { TourDetail } from "@/types/tour";
import { getCityDetail } from "@/hooks/useCity";
import { getToursByCityId } from "@/hooks/useTour";
import { sanitizeDescription } from "@/lib/sanitize";
import PageDivider from "@/components/Divider";
import Link from "next/link";
import Loading from "@/components/Loading";

interface Props {
  cityId: string;
}

export default function CityDetailClient({ cityId }: Props) {
  const [city, setCity] = useState<CityDetail | null>(null);
  const [tours, setTours] = useState<TourDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCityAndTours() {
      try {
        const [cityData, toursData] = await Promise.all([
          getCityDetail(cityId),
          getToursByCityId(cityId),
        ]);

        setCity(cityData);
        setTours(toursData);
      } catch (error) {
        console.error("Error fetching city or tours:", error);
      } finally {
        setLoading(false);
      }
    }

    loadCityAndTours();
  }, [cityId]);

  if (loading) return <Loading />;
  if (!city) return <p>City not found</p>;

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
        />

        {tours.length > 0 && (
          <div className="mt-10">
            <h2 className="text-xl font-semibold mb-4 text-title-primary">
              Tours in {city.name}
            </h2>
            <ul className="space-y-4">
              {tours.map((tour) => (
                <li
                  key={tour.id}
                  className="p-4 rounded-md shadow-sm bg-gray-50"
                >
                  <Link href={`/tour/${tour.id}`}>
                    <div className="flex gap-4">
                      <div className="flex-none">
                        <Image
                          src={tour.thumbnail_url}
                          alt={tour.name}
                          width={100}
                          height={100}
                          className="w-full h-auto object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-grow">
                        <p className="mb-2 font-bold">{tour.name}</p>
                        <p className="text-sm text-gray-600">
                          {tour.map_description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <PageDivider direction="up" />
    </>
  );
}
