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
    const result = await pool.query(
      "SELECT * FROM cities WHERE is_show_on_gallery = true"
    );
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching cities:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
