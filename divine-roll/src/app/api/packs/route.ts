import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const cards = await prisma.$queryRaw`
      SELECT * FROM "Card" ORDER BY RANDOM() LIMIT 5;
    `;
    console.log(" Fetched random cards:", cards);
    return NextResponse.json({ cards });
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}



