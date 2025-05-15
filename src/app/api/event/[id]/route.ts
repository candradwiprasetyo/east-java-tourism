import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json({ error: "Missing event id" }, { status: 400 });
    }

    const client = await pool.connect();
    const res = await client.query("SELECT * FROM events WHERE id = $1", [id]);
    client.release();

    if (res.rows.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
  } catch (error) {
    console.error("Error fetching event detail:", error);
    return NextResponse.json(
      { error: "Failed to fetch event detail" },
      { status: 500 }
    );
  }
}
