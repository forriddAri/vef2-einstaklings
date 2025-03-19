"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PacksPage() {
  const [cards, setCards] = useState([]);
  const router = useRouter();

  async function openPack() {
    const res = await fetch("/api/packs");
    const data = await res.json();
    setCards(data.cards || []);
  }

  return (
    <div>
      <h1 >Open a Pack</h1>

      <button
        onClick={openPack}
        
      >
        Open Pack
      </button>

      {/* <div className="mt-6 grid grid-cols-5 gap-4">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-4 shadow rounded text-center">
            <p className="font-semibold">{card.name}</p>
            {card.imageUrl && <img src={card.imageUrl} alt={card.name} className="w-20 mx-auto" />}
            <p className="text-sm text-gray-600">{card.rarity}</p>
          </div>
        ))}
      </div> */}

      <button
        onClick={() => router.push("/dashboard")}
        
      >
        Back to Dashboard
      </button>
    </div>
  );
}
