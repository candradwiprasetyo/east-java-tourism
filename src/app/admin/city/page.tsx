"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import CityTable from "./components/CityTable";

export default function CityAdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminNavigation />
      <CityTable />
    </>
  );
}
