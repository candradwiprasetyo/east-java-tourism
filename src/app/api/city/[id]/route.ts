import { NextResponse } from "next/server";
import pool from "@/lib/db";

type ParamsContext = { params: { id: string } };

export async function GET(req: Request, context: ParamsContext) {
  try {
    const { id } = context.params;

    const result = await pool.query("SELECT * FROM tours WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      return new NextResponse("Tour not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching tour:", error);
    return new NextResponse("Failed to fetch tour", { status: 500 });
  }
}

export async function PUT(req: Request, context: ParamsContext) {
  try {
    const { id } = context.params;

    const {
      city_id,
      name,
      location,
      description,
      images_url,
      thumbnail_url,
      is_featured,
    } = await req.json();

    const result = await pool.query(
      `UPDATE tours SET 
        city_id = $1,
        name = $2,
        location = $3,
        description = $4,
        images_url = $5,
        thumbnail_url = $6,
        is_featured = $7,
        updated_at = NOW()
      WHERE id = $8 RETURNING *`,
      [
        city_id,
        name,
        location,
        description,
        images_url,
        thumbnail_url,
        is_featured,
        id,
      ]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating tour:", error);
    return new NextResponse("Failed to update tour", { status: 500 });
  }
}

export async function DELETE(req: Request, context: ParamsContext) {
  try {
    const { id } = context.params;

    await pool.query("DELETE FROM tours WHERE id = $1", [id]);
    return new NextResponse("Tour deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting tour:", error);
    return new NextResponse("Failed to delete tour", { status: 500 });
  }
}
