import { useEffect, useState } from "react";
import { EventDetail } from "@/types/event";

export function useEvent() {
  const [events, setEvents] = useState<EventDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch("/api/event");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  return { events, loading, error };
}

export async function getEventDetail(id: string): Promise<EventDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/event/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch event detail");
  return res.json();
}
