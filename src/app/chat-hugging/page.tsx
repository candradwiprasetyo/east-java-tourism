"use client";

import { useState } from "react";

export default function ChatHuggingPage() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/huggingface", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await res.json();
    setResponse(data?.response || "No response");
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold">Hugging Face Chat</h1>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Ketik pesan..."
          disabled={loading}
        />
        <button
          type="submit"
          className="mt-2 p-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Loading..." : "Kirim"}
        </button>
      </form>
      {response && <p className="mt-4 p-2 border rounded">{response}</p>}
    </div>
  );
}
