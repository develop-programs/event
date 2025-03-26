import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcrypt";

const prisma = new PrismaClient();

// Sign up endpoint
export async function POST(request: NextRequest) {
  const body = await request.json();
  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(body.password, 10);

    // MongoDB compatible ID without hyphens
    const newUser = await prisma.user.create({
      data: {
        // Let MongoDB generate the ID automatically
        email: body.email,
        password: hashedPassword,
        Branch: body.Branch,
        Course: body.Course,
        name: body.name,
        phone: body.phone,
      },
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = newUser;
    return NextResponse.json({ user: userWithoutPassword }, { status: 201 });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Login endpoint
export async function PUT(request: NextRequest) {
  const body = await request.json();
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const passwordValid = await bcrypt.compare(body.password, user.password);

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Get user information
export async function GET(request: NextRequest) {
  prisma.$connect();
  try {
    const user = await prisma.user.findMany();
    return await NextResponse.json({ user });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
}

// Update user information
export async function PATCH(request: NextRequest) {
  const body = await request.json();
  const userId = body.userId;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Prepare update data (only include fields that are provided)
    const updateData: any = {};
    if (body.name) updateData.name = body.name;
    if (body.phone) updateData.phone = body.phone;
    if (body.Branch) updateData.Branch = body.Branch;
    if (body.Course) updateData.Course = body.Course;
    if (body.password)
      updateData.password = await bcrypt.hash(body.password, 10);

    // Update user
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: updateData,
    });

    // Remove password from response
    const { password, ...userWithoutPassword } = updatedUser;
    return NextResponse.json({ user: userWithoutPassword });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

// Delete user
export async function DELETE(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Delete user
    await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
