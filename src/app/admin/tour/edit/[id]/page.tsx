"use client";

import { useParams } from "next/navigation";
import TourForm from "../../components/TourForm";
import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";

export default function EdiTourPage() {
  const params = useParams();
  const tourId = Number(params.id);

  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminHeader />
      <AdminNavigation />
      <TourForm editTourId={tourId} />
    </div>
  );
}
