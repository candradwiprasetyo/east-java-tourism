import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Kalau sudah di halaman login, jangan redirect
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Cek token (contoh sederhana)
  const token = request.cookies.get("token");

  if (!token) {
    // Redirect ke login kalau gak ada token
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  // Kalau ada token, lanjut
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"], // middleware aktif untuk semua route /admin/*
};
