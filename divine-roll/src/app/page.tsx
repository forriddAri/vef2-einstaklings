"use client"; //til að höndla events í next.js

import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUP] = useState(false);
  const [message, setMessage] = useState("");

  async function handleAuth() {
    const endpoint = isSignUp ? "/api/signup" : "/api/login";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: JSON.stringify({email,password}),
    });

    const data = await res.json();
    setMessage(data.error || data.message || "Logged in!");

    if (!data.error && !isSignUp){
      localStorage.setItem("token", data.token);
    }
    
  }
  
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to Divine Roll</h1>

      <div className="bg-white p-6 rounded-lg shadow-md w-80">
        <h2 className="text-xl font-semibold mb-4">
          {isSignUp ? "Sign Up" : "Log In"}
        </h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full px-3 py-2 border rounded mb-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full px-3 py-2 border rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleAuth}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <p className="text-sm mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            className="text-blue-600 underline"
            onClick={() => setIsSignUP(!isSignUp)}
          >
            {isSignUp ? "Log In" : "Sign Up"}
          </button>
        </p>

        {message && <p className="mt-3 text-red-500">{message}</p>}
      </div>
    </main>
  );
}