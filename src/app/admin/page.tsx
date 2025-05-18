"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import TourTable from "./tour/components/TourTable";

export default function AdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminNavigation />
      <TourTable />
    </>
  );
}
