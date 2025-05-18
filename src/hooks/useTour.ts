import { TourDetail } from "@/types/tour";
import { useCallback, useEffect, useState } from "react";

export async function getTourDetail(id: string): Promise<TourDetail> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tour/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tour detail");

  return res.json();
}

export async function getToursShownOnMap(): Promise<TourDetail[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tour`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch tours list");

  const json = await res.json();
  return json.data;
}

export async function getToursByCityId(cityId: string): Promise<TourDetail[]> {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tour?city_id=${cityId}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) throw new Error("Failed to fetch tours by city_id");

  const json = await res.json();
  return json.data;
}

export function useAdminTour(limit = 10, offset = 0) {
  const [tours, setTours] = useState<TourDetail[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // useCallback untuk fetchTours agar stabil referensi dan bisa dipakai di useEffect dengan dependency
  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/tour?admin=true&limit=${limit}&offset=${offset}`
      );
      if (!res.ok) throw new Error("Failed to fetch tours");
      const json = await res.json();

      setTours(json.data || []);
      setTotal(json.total || 0);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [limit, offset]);

  const getTourById = useCallback(async (id: number): Promise<TourDetail> => {
    const res = await fetch(`/api/tour/${id}`);
    if (!res.ok) throw new Error("Failed to fetch tour by ID");
    const data: TourDetail = await res.json();
    return data;
  }, []);

  const createTour = useCallback(
    async (
      tour: Omit<TourDetail, "id" | "created_at" | "updated_at" | "city_name">
    ) => {
      const res = await fetch("/api/tour", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
      });
      if (!res.ok) throw new Error("Failed to create tour");
      await fetchTours();
    },
    [fetchTours]
  );

  const updateTour = useCallback(
    async (id: number, tour: Partial<TourDetail>) => {
      const res = await fetch(`/api/tour/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tour),
      });
      if (!res.ok) throw new Error("Failed to update tour");
      await fetchTours();
    },
    [fetchTours]
  );

  const deleteTour = useCallback(
    async (id: number) => {
      const res = await fetch(`/api/tour/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete tour");
      await fetchTours();
    },
    [fetchTours]
  );

  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  return {
    tours,
    total,
    loading,
    error,
    fetchTours,
    getTourById,
    createTour,
    updateTour,
    deleteTour,
  };
}
