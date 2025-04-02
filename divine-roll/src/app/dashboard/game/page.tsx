"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GamePage() {

    const [money, setMoney] = useState(0);
    const router = useRouter();

    return (
        <div className="p-4">
          <h1 className="text-2xl font-bold">Money: ${money}</h1>
          <button
            onClick={() => setMoney(money + 10)}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Flip burger for $10
          </button>
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
      );
    }