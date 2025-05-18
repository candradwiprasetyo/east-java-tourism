import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const limitParam = req.nextUrl.searchParams.get("limit");
    const offsetParam = req.nextUrl.searchParams.get("offset");

    const limit = limitParam ? parseInt(limitParam) : 10;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    const baseQuery = "FROM events JOIN cities ON events.city_id = cities.id";

    const dataQuery = `SELECT events.*, cities.name AS city_name ${baseQuery} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
    const totalQuery = `SELECT COUNT(*) ${baseQuery}`;

    const [dataResult, totalResult] = await Promise.all([
      pool.query(dataQuery, [limit, offset]),
      pool.query(totalQuery),
    ]);

    return NextResponse.json({
      data: dataResult.rows,
      total: parseInt(totalResult.rows[0].count),
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      city_id,
      name,
      description,
      start_date,
      end_date,
      thumbnail_url,
      images_url,
    } = await req.json();

    const result = await pool.query(
      `INSERT INTO events 
      (city_id, name, description, start_date, end_date, thumbnail_url, images_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        city_id,
        name,
        description,
        start_date,
        end_date,
        thumbnail_url,
        images_url,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating event:", error);
    return new NextResponse("Failed to create event", { status: 500 });
  }
}
