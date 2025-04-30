// app/chat-openai/page.tsx
"use client";

import { useState } from "react";

export default function ChatOpenAI() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/openai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setResponse(data.choices?.[0]?.message?.content || "No response");
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-black">
      <h1 className="text-xl font-bold mb-4">Chat with OpenAI</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border p-2 w-full"
          placeholder="Ask something..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 mt-2 w-full"
        >
          Send
        </button>
      </form>
      {response && <p className="mt-4 p-4 bg-gray-100">{response}</p>}
    </div>
  );
}
