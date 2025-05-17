import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect();
    const res = await client.query(
      "SELECT * FROM events ORDER BY start_date ASC"
    );
    client.release();

    return NextResponse.json(res.rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
