"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type User = {
  id?: number;
  email?: string;
  name?: string;
  role?: string;
  [key: string]: unknown;
};

export default function AdminHeader() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/me", {
          cache: "no-store",
          credentials: "include",
        });

        if (!res.ok) {
          console.log("Failed to fetch user", await res.json());
          setUser(null);
          return;
        }

        const data = await res.json();
        setUser(data.user);
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser(null);
      }
    }

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/admin/login";
  };

  return (
    <div className="bg-white relative text-title-primary">
      <div className="border-b">
        <div className="container mx-auto py-1 flex justify-between max-w-7xl px-6">
          <div className="flex-1 flex gap-4 items-center">
            <Image
              src="/assets/images/wonderful-indonesia.png"
              alt="Wonderful Indonesia"
              width={100}
              height={30}
            />
            <div className="flex-none font-semibold text-xl text-gray-800">
              East Java Tourism Admin System
            </div>
          </div>
          <div className="flex-1 flex flex-row-reverse gap-3 items-center">
            <button
              onClick={handleLogout}
              className="ml-6 bg-red-400 py-2 px-5 text-white rounded-[20px] text-sm"
            >
              Logout
            </button>
            <div className="flex gap-3 cursor-default select-none">
              <div>
                <Image
                  src="https://spike-vue-horizontal.netlify.app/assets/user6-iQEKvgW-.jpg"
                  className="rounded-full w-10 h-10"
                  alt="User avatar"
                  width={40}
                  height={40}
                />
              </div>
              <div>
                <div className="font-bold">{user?.name || "Name"}</div>
                <div className="text-xs text-amber-700">
                  {user?.role || "Role"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
