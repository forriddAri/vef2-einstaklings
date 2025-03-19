import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get 5 random cards from the database
    const cards = await prisma.card.findMany({
      take: 5,
      orderBy: { id: "asc" }, // Consider using "random" if you want true randomness
    });

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("❌ Error opening pack:", error);
    return NextResponse.json({ error: "Failed to open pack" }, { status: 500 });
  }
}
