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
      ? `FROM tours 
         JOIN cities ON tours.city_id = cities.id
         JOIN tour_categories ON tour_category_id = tour_categories.id`
      : `FROM tours 
         JOIN cities ON tours.city_id = cities.id
         JOIN tour_categories ON tour_category_id = tour_categories.id
         WHERE tours.is_show_on_map = true`;

    const dataQuery = `
      SELECT tours.*, cities.name AS city_name, tour_categories.name AS tour_category_name 
      ${baseQuery}
      ORDER BY tours.created_at DESC 
      LIMIT $1 OFFSET $2`;

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
    console.error("Error fetching tours:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const {
      city_id,
      tour_category_id,
      name,
      address,
      description,
      thumbnail_url,
      images_url,
      longitude,
      latitude,
      map_top,
      map_left,
      is_show_on_map,
      map_description,
    } = await req.json();

    const result = await pool.query(
      `INSERT INTO tours 
        (city_id, tour_category_id, name, address, description, thumbnail_url, images_url, 
         longitude, latitude, map_top, map_left, is_show_on_map, map_description)
       VALUES 
        ($1, $2, $3, $4, $5, $6, $7, 
         $8, $9, $10, $11, $12, $13) RETURNING *`,
      [
        city_id,
        tour_category_id,
        name,
        address,
        description,
        thumbnail_url,
        images_url,
        longitude,
        latitude,
        map_top,
        map_left,
        is_show_on_map,
        map_description,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error creating tour:", error);
    return new NextResponse("Failed to create tour", { status: 500 });
  }
}
