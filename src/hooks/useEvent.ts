import { useEffect, useState, useCallback } from "react";
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
        const json = await res.json();
        const data: EventDetail[] = json.data;
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

export interface Event {
  id: number;
  city_id: number;
  city_name?: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  thumbnail_url: string;
  images_url: string;
  created_at: string;
}

export function useAdminEvent(limit = 10, offset = 0) {
  const [events, setEvents] = useState<Event[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/event?admin=true&limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch events");

      const json = await res.json();

      setEvents(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  const getEventById = useCallback(async (id: number): Promise<Event> => {
    const res = await fetch(`/api/event/${id}`);
    if (!res.ok) throw new Error("Failed to fetch event by ID");
    const data: Event = await res.json();
    return data;
  }, []);

  const createEvent = useCallback(
    async (event: Omit<Event, "id" | "created_at">) => {
      const res = await fetch("/api/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to create event");
      await fetchEvents();
    },
    [fetchEvents]
  );

  const updateEvent = useCallback(
    async (id: number, event: Partial<Event>) => {
      const res = await fetch(`/api/event/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(event),
      });
      if (!res.ok) throw new Error("Failed to update event");
      await fetchEvents();
    },
    [fetchEvents]
  );

  const deleteEvent = useCallback(
    async (id: number) => {
      const res = await fetch(`/api/event/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete event");
      await fetchEvents();
    },
    [fetchEvents]
  );

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  return {
    events,
    total,
    loading,
    error,
    fetchEvents,
    getEventById,
    createEvent,
    updateEvent,
    deleteEvent,
  };
}
