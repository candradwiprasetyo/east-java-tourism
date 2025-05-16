import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM tour_categories");
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching tour categories:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
