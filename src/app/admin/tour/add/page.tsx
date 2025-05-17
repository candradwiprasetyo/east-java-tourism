import TourForm from "../components/TourForm";
import AdminHeader from "@/components/AdminHeader";
import AdminNavigation from "@/components/AdminNavigation";

export default function AddCityPage() {
  return (
    <div className="bg-blue-50 min-h-screen">
      <AdminHeader />
      <AdminNavigation />
      <TourForm />
    </div>
  );
}
