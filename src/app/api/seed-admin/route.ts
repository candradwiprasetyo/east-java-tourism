import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { hashPassword } from "@/lib/hash";

export async function GET() {
  const name = "Admin";
  const email = "candradwiprasetyo@gmail.com";
  const password = "admin123";
  const role = "admin";

  try {
    const hashed = await hashPassword(password);

    await pool.query(
      `INSERT INTO users (name, email, password, role, created_at, updated_at)
       VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [name, email, hashed, role]
    );

    return NextResponse.json({ message: "Admin user created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create admin user" },
      { status: 500 }
    );
  }
}
