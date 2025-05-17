import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true";
    const limitParam = req.nextUrl.searchParams.get("limit");
    const offsetParam = req.nextUrl.searchParams.get("offset");

    const limit = limitParam ? parseInt(limitParam) : 10;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    const baseQuery = isAdmin
      ? "FROM cities"
      : "FROM cities WHERE is_show_on_gallery = true";

    const dataQuery = `SELECT * ${baseQuery} ORDER BY created_at DESC LIMIT $1 OFFSET $2`;
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
    console.error("Error fetching cities:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      name,
      longitude,
      latitude,
      description,
      images_url,
      thumbnail_url,
      is_show_on_gallery,
    } = await req.json();

    const result = await pool.query(
      `INSERT INTO cities 
      (name, longitude, latitude, description, images_url, thumbnail_url, is_show_on_gallery)
      VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        name,
        longitude,
        latitude,
        description,
        images_url,
        thumbnail_url,
        is_show_on_gallery,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating city:", error);
    return new NextResponse("Failed to create city", { status: 500 });
  }
}
