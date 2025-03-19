"use client";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold">Dashboard</h1>
  
      <div className="mt-6">
        <button
          onClick={() => router.push("/dashboard/game")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          play game
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push("/dashboard/packs")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Open a Pack
        </button>
      </div>

      <div className="mt-6">
        <button
          onClick={() => router.push("../")}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          log out
        </button>
      </div>

    </div>
  );
}