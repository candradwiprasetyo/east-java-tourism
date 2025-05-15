import { TourDetail } from "@/types/tour";

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
