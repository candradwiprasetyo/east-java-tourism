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
    const { searchParams } = new URL(request.url);
    const isShowOnMap = searchParams.get("is_show_on_map");

    let query = `
      SELECT 
        tours.*, 
        cities.name AS city_name
      FROM tours
      LEFT JOIN cities ON tours.city_id = cities.id
    `;

    const values: boolean[] = [];

    if (isShowOnMap === "true") {
      query += " WHERE tours.is_show_on_map = $1";
      values.push(true);
    }

    query += " ORDER BY tours.created_at ASC";

    const result = await pool.query(query, values);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching tours:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
