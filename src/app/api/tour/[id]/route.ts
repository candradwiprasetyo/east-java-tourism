import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const result = await pool.query(
      `SELECT tours.*, cities.name AS city_name
       FROM tours
       JOIN cities ON tours.city_id = cities.id
       WHERE tours.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return new NextResponse("Tour not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching tour:", error);
    return new NextResponse("Failed to fetch tour", { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const {
      city_id,
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
      tour_category_id,
      map_description,
    } = await req.json();

    const result = await pool.query(
      `UPDATE tours SET 
        city_id = $1,
        name = $2,
        address = $3,
        description = $4,
        thumbnail_url = $5,
        images_url = $6,
        longitude = $7,
        latitude = $8,
        map_top = $9,
        map_left = $10,
        is_show_on_map = $11,
        tour_category_id = $12,
        map_description = $13,
        updated_at = NOW()
      WHERE id = $14 RETURNING *`,
      [
        city_id,
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
        tour_category_id,
        map_description,
        id,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating tour:", error);
    return new NextResponse("Failed to update tour", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    await pool.query("DELETE FROM tours WHERE id = $1", [id]);
    return new NextResponse("Tour deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return new NextResponse("Failed to delete tour", { status: 500 });
  }
}
