"use client";

import { useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { EventDetail } from "@/types/event";
import { getEventDetail } from "@/hooks/useEvent";
import { sanitizeDescription } from "@/lib/sanitize";
import PageDivider from "@/components/Divider";
import Link from "next/link";

interface Props {
  eventId: string;
}

export default function EventDetailClient({ eventId }: Props) {
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEvent() {
      try {
        const data = await getEventDetail(eventId);
        setEvent(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, [eventId]);

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found</p>;

  return (
    <>
      <PageDivider />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold mb-4 text-title-primary leading-normal">
          {event.name}
        </h1>
        <div className="text-sm text-gray-500 mb-4">
          {format(new Date(event.start_date), "dd MMMM yyyy")}
        </div>
        <Link
          href="/#event-list"
          className="inline-block px-4 py-2 bg-blue-400 text-white rounded-full hover:bg-blue-700 transition mb-4"
          scroll={true}
        >
          Back
        </Link>
        <Image
          src={event.images_url}
          alt={event.name}
          width={800}
          height={400}
          className="w-full h-auto object-cover rounded-md mb-6"
        />

        <div
          className="text-gray-500 prose-custom leading-8"
          dangerouslySetInnerHTML={{
            __html: sanitizeDescription(event.description),
          }}
        ></div>
      </div>
      <PageDivider direction="up" />
    </>
  );
}
