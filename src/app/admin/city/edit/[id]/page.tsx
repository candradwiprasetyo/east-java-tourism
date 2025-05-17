"use client";

import { useParams } from "next/navigation";
import CityForm from "../../components/CityForm";
import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";

export default function EditCityPage() {
  const params = useParams();
  const cityId = Number(params.id);

  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminHeader />
      <AdminNavigation />
      <CityForm editCityId={cityId} />
    </div>
  );
}
