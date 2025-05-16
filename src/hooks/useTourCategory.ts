import { useEffect, useState } from "react";
import { TourCategoryDetail } from "@/types/tourCatery";

export function useTourCategory() {
  const [tourCategory, setTourCategory] = useState<TourCategoryDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTourCategory() {
      try {
        const res = await fetch("/api/tour-category");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setTourCategory(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }

    fetchTourCategory();
  }, []);

  return { tourCategory, loading, error };
}
