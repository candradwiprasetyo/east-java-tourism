"use client";

import { useParams } from "next/navigation";
import EventForm from "../../components/EventForm";
import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";

export default function EditEventPage() {
  const params = useParams();
  const eventId = Number(params.id);

  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminHeader />
      <AdminNavigation />
      <EventForm editEventId={eventId} />
    </div>
  );
}
