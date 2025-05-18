import Link from "next/link";

export default function AdminNavigation() {
  return (
    <div className="bg-white relative text-title-primary border-b">
      <div className="container mx-auto py-5 flex gap-16 text-sm max-w-7xl px-6">
        {/* <div className="flex-none flex items-center gap-3">
          <Link href={"/admin"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300 w-6">space_dashboard</i>
            Dashboard
          </Link>
        </div> */}
        <div className="flex-none">
          <Link href={"/admin/city"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300">location_city</i>
            City
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/tour"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300 w-6">travel_explore</i>
            Tour
          </Link>
        </div>
        <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/event"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300">event</i>
            Event
          </Link>
        </div>
        {/* <div className="flex-none flex items-center gap-3">
          <Link href={"/admin/user"} className="flex items-center gap-3">
            <i className="material-icons text-blue-300">admin_panel_settings</i>
            User
          </Link>
        </div> */}
      </div>
    </div>
  );
}
