import { NextRequest, NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(req: NextRequest) {
  try {
    const isAdmin = req.nextUrl.searchParams.get("admin") === "true";
    const limitParam = req.nextUrl.searchParams.get("limit");
    const offsetParam = req.nextUrl.searchParams.get("offset");
    const cityIdParam = req.nextUrl.searchParams.get("city_id");

    const limit = limitParam ? parseInt(limitParam) : 10;
    const offset = offsetParam ? parseInt(offsetParam) : 0;

    const dataWhere: string[] = [];
    const dataParams: any[] = [];

    if (!isAdmin) {
      dataWhere.push("tours.is_show_on_map = true");
    }

    if (cityIdParam) {
      dataParams.push(parseInt(cityIdParam));
      dataWhere.push(`tours.city_id = $${dataParams.length}::int`);
    }

    let baseWhereClause = "";
    if (dataWhere.length > 0) {
      baseWhereClause = " WHERE " + dataWhere.join(" AND ");
    }

    dataParams.push(limit);
    dataParams.push(offset);

    const dataQuery = `
      SELECT tours.*, cities.name AS city_name, tour_categories.name AS tour_category_name
      FROM tours
      JOIN cities ON tours.city_id = cities.id
      JOIN tour_categories ON tours.tour_category_id = tour_categories.id
      ${baseWhereClause}
      ORDER BY tours.created_at DESC
      LIMIT $${dataParams.length - 1} OFFSET $${dataParams.length}
    `;

    const totalWhere: string[] = [];
    const totalParams: any[] = [];

    if (!isAdmin) {
      totalWhere.push("tours.is_show_on_map = true");
    }

    if (cityIdParam) {
      totalParams.push(parseInt(cityIdParam));
      totalWhere.push(`tours.city_id = $${totalParams.length}::int`);
    }

    let totalWhereClause = "";
    if (totalWhere.length > 0) {
      totalWhereClause = " WHERE " + totalWhere.join(" AND ");
    }

    const totalQuery = `
      SELECT COUNT(*) 
      FROM tours
      JOIN cities ON tours.city_id = cities.id
      JOIN tour_categories ON tours.tour_category_id = tour_categories.id
      ${totalWhereClause}
    `;

    const [dataResult, totalResult] = await Promise.all([
      pool.query(dataQuery, dataParams),
      pool.query(totalQuery, totalParams),
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
