"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import TourTable from "./components/TourTable";

export default function CityAdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminNavigation />
      <TourTable />
    </>
  );
}
