import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    console.log("Login Request:", email);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, password: true } 
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    // Check password
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!user) {
      console.error(" User not found or invalid credentials");
      return NextResponse.json({ error: "Invalid login" }, { status: 401 });
    }
    
    console.log("Creating token with user ID:", user.id);
    // Generate JWT token
    const token = jwt.sign({ userId: user.id }, "secret", { expiresIn: "1h" });

    
    // Set JWT as an HTTP-only cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    console.log(" Login successful");
    return NextResponse.json({ token });
  } catch (error) {
    console.error(" Error logging in:", error);
    return NextResponse.json({ error: "Failed to login" }, { status: 500 });
  }
}
