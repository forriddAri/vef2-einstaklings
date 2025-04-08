"use client";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Card from "../../../components/Card"; 


export default function GamePage() {
  
  const [hand, setHand] = useState<any[]>([]);
  const [board, setBoard] = useState<any[]>([]);
  const router = useRouter();

  const [ownedCards, setOwnedCards] = useState<any[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("ownedCards");
      if (saved) {
        setOwnedCards(JSON.parse(saved));
      }
      if (!saved) {
        setOwnedCards([
          { title: "Test Card 1", description: "A default card." },
          { title: "Test Card 2", description: "Another one." },
        ]);
      }
    } catch (e) {
      console.error("Failed to load cards from localStorage", e);
    }
  }, []);

  const drawCard = () => {
    if (ownedCards.length === 0) return;
    const random = ownedCards[Math.floor(Math.random() * ownedCards.length)];
    
    const converted = {
      title: random.name,
      description: random.effect ?? "No effect.",
      power: random.power,
      health: random.health,
    };
  
    setHand([...hand, converted]);
  };
  const emptyHand = () => {
    setHand([])
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const title = e.dataTransfer.getData("name");
    const description = e.dataTransfer.getData("cardDescription");
    const power = parseInt(e.dataTransfer.getData("cardPower"));
    const health = parseInt(e.dataTransfer.getData("cardHealth"));

    setBoard([...board, { title, description, power, health }]);
    setHand(hand.filter((card) => card.title !== title));
  };

  return (
    <div className="p-6 space-y-4">
    
      <button
        onClick={drawCard}
        className="bg-yellow-500 text-white px-4 py-2 rounded ml-2"
      >
        Draw Card
      </button>
      <button
        onClick={emptyHand}
        className="bg-red-500 text-white px-4 py-2 rounded ml-2"
      >
        empthy hand
      </button>
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className="mt-8 p-6 border-4 border-dashed border-gray-400 rounded-lg min-h-[200px] bg-gray-100"
      >
        <h2 className="text-lg font-semibold mb-2">Board</h2>
        <div className="flex gap-4 flex-wrap">
          {board.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Hand</h2>
        <div className="flex gap-4 flex-wrap">
          {hand.map((card, index) => (
            
            <Card key={index} {...card} />
          ))}
        </div>
      </div>

     

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => router.push("/dashboard")}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Go to Dashboard
        </button>
        <button
          onClick={() => router.push("/dashboard/packs")}
          className="bg-purple-500 text-white px-4 py-2 rounded"
        >
          Go to Packs
        </button>
      </div>
    </div>
  );
}
