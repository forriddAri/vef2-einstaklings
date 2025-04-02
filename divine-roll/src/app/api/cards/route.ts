import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";


export async function GET() {
  try {
    const cards = await prisma.card.findMany();
    console.log("✅ Fetched cards:", cards); // Debugging log

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("❌ Error fetching cards:", error);
    return NextResponse.json({ error: "Failed to fetch cards" }, { status: 500 });
  }
}

