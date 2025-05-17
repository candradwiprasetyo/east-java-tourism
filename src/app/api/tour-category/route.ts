import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tour_categories");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching tour categories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
