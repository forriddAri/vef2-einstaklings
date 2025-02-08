import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    console.log("signup request")
    const { email, password } = await req.json();
    console.log("📢 Signup Request:", email);

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    console.log("✅ User created:", user);
    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("❌ Error signing up:", error);
    return NextResponse.json({ error: "Failed to register user" }, { status: 500 });
  }
}
export async function GET() {
    return NextResponse.json({ message: "Signup route is working!" });
  }