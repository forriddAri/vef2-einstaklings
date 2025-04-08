"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEffect} from "react";
import type { Card } from "@prisma/client";

export default function PacksPage() {
  // This state holds the cards that the user currently owns.
  const [ownedCards, setOwnedCards] = useState<Card[]>([]);
  // For debug output
  const [debugLog, setDebugLog] = useState<Card[] | string | null>(null);
  
  const router = useRouter();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ownedCards");
      if (saved) {
        setOwnedCards(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Could not parse ownedCards from localStorage:", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("ownedCards", JSON.stringify(ownedCards));
  }, [ownedCards]);
  
  // 1. Open Pack (simulate giving 5 random cards)
  async function openPack() {
    const res = await fetch("/api/packs", { method: "GET" });
    const data = await res.json();
    const newCards: Card[] = data.cards || [];
    
    // Update local state: add the new cards to the owned cards array
    setOwnedCards((prevCards) => [...prevCards, ...newCards]);
    setDebugLog(newCards);
    console.log("Opened Pack:", newCards);
  }
  
  // 2. Get All Cards from the DB (for debugging)
  async function getAllCards() {
    const res = await fetch("/api/cards");
    const data = await res.json();
    
    setDebugLog(data.cards);
    console.log("All Cards:", data.cards);
  }
  
  // 3. Show Owned Cards (from local state)
  async function showOwnedCards() {
    const raw = localStorage.getItem("ownedCards");
    try {
      const parsed = raw ? JSON.parse(raw) : [];
      setDebugLog(parsed);
      console.log("Owned Cards:", parsed);
    } catch (e) {
      console.error("Failed to parse ownedCards from localStorage", e);
      setDebugLog("Error parsing ownedCards");
    }
  }
  
  // 4. Reset Owned Cards (clear the local state)
  async function resetOwnedCards() {
    setOwnedCards([]);
    setDebugLog("Reset complete");
    console.log("Reset: local cards cleared");
  }
  
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold mb-2"> Packs Debug Panel</h1>
  
      <div className="flex flex-col gap-2">
        <button onClick={openPack} className="bg-green-600 text-white px-4 py-2 rounded">
         Open Pack (Give 5 Random Cards)
        </button>
        <button onClick={getAllCards} className="bg-blue-500 text-white px-4 py-2 rounded">
           Get All Cards (from DB)
        </button>
        <button onClick={showOwnedCards} className="bg-yellow-400 text-black px-4 py-2 rounded">
           Show Owned Cards
        </button>
        <button onClick={resetOwnedCards} className="bg-red-500 text-white px-4 py-2 rounded">
           Reset Owned Cards
        </button>
      </div>
  
      <button onClick={() => router.push("/dashboard")} className="mt-4 underline text-blue-700">
        Back to Dashboard
      </button>
  
      {debugLog && (
        <pre className="mt-4 bg-gray-100 p-4 rounded overflow-x-auto text-sm">
          {JSON.stringify(debugLog, null, 2)}
        </pre>
      )}
    </div>
  );
}
