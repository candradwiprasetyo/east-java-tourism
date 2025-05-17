import jwt from "jsonwebtoken";

export interface DecodedToken {
  name?: string;
  role?: string;
  exp?: number;
  [key: string]: unknown;
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    const decoded = jwt.decode(token);
    if (decoded && typeof decoded === "object") {
      return decoded as DecodedToken;
    }
    return null;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
}
