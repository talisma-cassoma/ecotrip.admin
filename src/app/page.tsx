"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [serverStatus, setServerStatus] = useState<"checking" | "online" | "offline">("checking");

  useEffect(() => {
    fetch("https://ecotrip-api.onrender.com/ping")
      .then(async (res) => {
        if (res.status == 200) {
          setServerStatus("online");
        }
        try {
          const data = await res.json();
          if (data.message === "pong") {
            setServerStatus("online");
          }
        } catch (e) {
          // Se não conseguir parsear JSON, ignora
        }
      })
      .catch(() => setServerStatus("offline"));
  }, []);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      {serverStatus === "checking" && (
        <p className="text-gray-600">connecting the server...</p>
      )}
      {serverStatus === "online" && (
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-green-600 text-2xl font-bold">Server online ✅</h1>
          <nav className="flex gap-4">
            <Link href="/new-route" className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">
              save new-route
            </Link>
            <Link href="/driver" className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
              see all drivers
            </Link>
            <Link href="https://ecotrip-admins.onrender.com/" className="px-4 py-2 rounded bg-purple-500 text-white hover:bg-purple-600">
              back to ecoTrip admin
            </Link>
          </nav>
        </div>
      )}
      {serverStatus === "offline" && (
        <p className="text-red-600">Server offline ❌</p>
      )}
    </main>
  );
}
