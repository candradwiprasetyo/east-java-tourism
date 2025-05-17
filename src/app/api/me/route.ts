import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

type JwtPayload = {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    return NextResponse.json({ user: decoded });
  } catch (error) {
    console.error("JWT verify error:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}
