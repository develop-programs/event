import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { authenticateRequest } from "@/middleware/auth";

const prisma = new PrismaClient();

const resetPasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  return authenticateRequest(request, async (req: NextRequest, userId: string) => {
    try {
      const body = await req.json();
      
      // Validate input
      const validation = resetPasswordSchema.safeParse(body);
      if (!validation.success) {
        return NextResponse.json(
          { error: validation.error.errors[0].message },
          { status: 400 }
        );
      }

      const { currentPassword, newPassword } = body;

      // Get user
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        return NextResponse.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      // Verify current password
      const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json(
          { error: "Current password is incorrect" },
          { status: 401 }
        );
      }

      // Hash new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      // Update password
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });

      return NextResponse.json(
        { message: "Password updated successfully" },
        { status: 200 }
      );
    } catch (error) {
      console.error("Password reset error:", error);
      return NextResponse.json(
        { error: "Failed to reset password" },
        { status: 500 }
      );
    }
  });
}
