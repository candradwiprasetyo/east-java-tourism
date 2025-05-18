"use client";

import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";
import EventTable from "./components/EventTable";

export default function CityAdminPage() {
  return (
    <>
      <AdminHeader />
      <AdminNavigation />
      <EventTable />
    </>
  );
}
