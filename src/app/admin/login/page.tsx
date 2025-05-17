"use client";

import { useState, useEffect } from "react";
import { useLogin } from "@/hooks/useLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const { login, loading, error } = useLogin();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    async function checkAuth() {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          router.replace("/admin");
        }
      } catch (e) {
        console.error("Error checking auth", e);
      }
    }

    checkAuth();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await login(email, password);
  }
  return (
    <div>
      <div className="w-full h-screen md:flex text-title-primary">
        <div
          className="flex-1 bg-cover bg-center relative content-center flex items-center w-full min-h-[200px]"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dl5renyaj/image/upload/v1746539008/pantai-karang-bolong-pacitan-profile1653616465_whhnuk.jpg")',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-center justify-center opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-30"></div>
          <div className="absolute inset-0 flex justify-center items-center text-white">
            <div className="text-white text-[2vw] left-0 right-0 bottom-40 mx-auto text-center">
              <span className="text-[4vw] font-bold font-satisfy text-[#f0f08d]">
                East Java Tourism
              </span>
              <div>Admin System</div>
            </div>
          </div>
        </div>
        <div className="flex-1 content-center flex items-center px-8 md:px-0 bg-gray-100">
          <div className="w-full md:w-[400px] mx-auto font-medium py-8 md:py-0">
            <div className="hidden md:inline">
              <Image
                src="/assets/images/wonderful-indonesia.png"
                alt="Wonderful Indonesia"
                width={200}
                height={100}
                className="mx-auto"
              />
            </div>

            {error && (
              <div className="text-red-600 text-xs mt-2 text-center">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mt-2 md:mt-5 text-primary-1">
                <label htmlFor="email" className="text-sm mb-2 block">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter email here"
                  name="email"
                  className="w-full text-xs rounded-[20px] py-3 px-4"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-5 text-primary-1">
                <label htmlFor="password" className="text-sm mb-2 block">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password here"
                  name="password"
                  className="w-full text-xs rounded-[20px] py-3 px-4"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-5">
                <button
                  type="submit"
                  disabled={loading}
                  className="text-center w-full py-3 text-white font-bold rounded-[30px] bg-green-300 hover:bg-green-400 transition disabled:opacity-50"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            <div className="mt-2 md:mt-4 text-center text-xs font-medium">
              Copyright © 2025. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
