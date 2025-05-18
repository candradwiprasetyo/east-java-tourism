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
    return new NextResponse("City ID is required", { status: 400 });
  }

  try {
    const result = await pool.query(`SELECT * FROM cities WHERE id = $1`, [id]);

    if (result.rows.length === 0) {
      return new NextResponse("City not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching city:", error);
    return new NextResponse("Failed to fetch city", { status: 500 });
  }
}

export async function PUT(request: Request) {
  const id = getIdFromUrl(request);

  if (!id) {
    return new NextResponse("City ID is required", { status: 400 });
  }

  try {
    const {
      name,
      description,
      thumbnail_url,
      // properti lain jika ada
    } = await request.json();

    const result = await pool.query(
      `UPDATE cities SET 
         name = $1,
         description = $2,
         thumbnail_url = $3,
         updated_at = NOW()
       WHERE id = $4 RETURNING *`,
      [name, description, thumbnail_url, id]
    );

    if (result.rows.length === 0) {
      return new NextResponse("City not found", { status: 404 });
    }

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error("Error updating city:", error);
    return new NextResponse("Failed to update city", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const id = getIdFromUrl(request);

  if (!id) {
    return new NextResponse("City ID is required", { status: 400 });
  }

  try {
    await pool.query("DELETE FROM cities WHERE id = $1", [id]);
    return new NextResponse("City deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting city:", error);
    return new NextResponse("Failed to delete city", { status: 500 });
  }
}
