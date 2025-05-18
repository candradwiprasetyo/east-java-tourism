import { NextResponse } from "next/server";
import pool from "@/lib/db";

function getIdFromUrl(request: Request) {
  const url = new URL(request.url);
  const segments = url.pathname.split("/");
  return segments[segments.length - 1];
}

export async function GET(request: Request) {
  const id = getIdFromUrl(request);

  if (!id) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    const result = await pool.query(
      `SELECT events.*, cities.name AS city_name FROM events JOIN cities ON events.city_id = cities.id WHERE events.id = $1`,
      [id]
    );

    if (result.rows.length === 0) {
      return new NextResponse("Event not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching event:", error);
    return new NextResponse("Failed to fetch event", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const id = getIdFromUrl(request);

  if (!id) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    const { name, description, city_id, thumbnail_url, start_date, end_date } =
      await request.json();

    const result = await pool.query(
      `UPDATE events SET 
         name = $1,
         description = $2,
         city_id = $3,
         thumbnail_url = $4,
         start_date = $5,
         end_date = $6,
         updated_at = NOW()
       WHERE id = $7 RETURNING *`,
      [name, description, city_id, thumbnail_url, start_date, end_date, id]
    );

    if (result.rows.length === 0) {
      return new NextResponse("Event not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating event:", error);
    return new NextResponse("Failed to update event", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = getIdFromUrl(request);

  if (!id) {
    return new NextResponse("Event ID is required", { status: 400 });
  }

  try {
    await pool.query("DELETE FROM events WHERE id = $1", [id]);
    return new NextResponse("Event deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    return new NextResponse("Failed to delete event", { status: 500 });
  }
}
