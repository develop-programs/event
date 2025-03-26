import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

export function getTokenFromHeader(req: NextRequest): string | null {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  return authHeader.split(" ")[1];
}

export function verifyToken(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string };
  } catch (error) {
    return null;
  }
}

export async function authenticateRequest(req: NextRequest, handler: Function) {
  const token = getTokenFromHeader(req);
  
  if (!token) {
    return NextResponse.json(
      { error: "Authentication required" },
      { status: 401 }
    );
  }

  const decoded = verifyToken(token);
  
  if (!decoded) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  // Pass the authenticated user id to the handler
  return handler(req, decoded.userId);
}
