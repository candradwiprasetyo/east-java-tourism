"use client";

import { useState } from "react";

type Itinerary = {
  origin: string;
  destination: string;
  duration: string;
  days: {
    day: number;
    date: string;
    activities: {
      time: string;
      activity: string;
      place: string;
      address: string;
      category: string;
      transportation_type: string;
      cost: string;
      image_url: string;
      google_maps_url: string;
    }[];
  }[];
};

export default function ItineraryPage() {
  const [streamedText, setStreamedText] = useState("");
  const [jsonData, setJsonData] = useState<Itinerary | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function extractJsonFromText(text: string) {
    const startTag = "--JSON-START--";
    const endTag = "--JSON-END--";
    const startIdx = text.indexOf(startTag);
    const endIdx = text.indexOf(endTag);
    if (startIdx === -1 || endIdx === -1 || endIdx <= startIdx) return null;

    const jsonString = text
      .substring(startIdx + startTag.length, endIdx)
      .trim();

    try {
      return JSON.parse(jsonString);
    } catch (e) {
      console.error("Gagal parsing JSON:", e);
      return null;
    }
  }

  const handleGenerate = async () => {
    setStreamedText("");
    setJsonData(null);
    setError("");
    setLoading(true);

    const payload = {
      origin: "Surabaya",
      destination: "Malang",
      interests: ["kuliner", "alam"],
      start_date: "2025-06-01",
      end_date: "2025-06-03",
    };

    try {
      const res = await fetch("/api/itinerary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.body) throw new Error("No response body");

      const reader = res.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value); // decode value sebagai teks
        fullText += chunk;
        setStreamedText((prev) => prev + chunk);
      }

      const extractedJson = extractJsonFromText(fullText);
      if (!extractedJson) {
        setError("Gagal parsing JSON dari respons.");
        return;
      }

      setJsonData(extractedJson);
    } catch (err) {
      console.error(err);
      setError("Gagal membuat itinerary. Cek console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button
        onClick={handleGenerate}
        disabled={loading}
        className={`px-4 py-2 rounded text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Itinerary"}
      </button>

      {error && (
        <div className="text-red-500 mt-4 bg-red-100 p-2 rounded">{error}</div>
      )}

      {streamedText && (
        <pre className="mt-4 bg-gray-100 p-4 whitespace-pre-wrap border rounded">
          {streamedText}
        </pre>
      )}

      {jsonData && (
        <pre className="mt-4 bg-white p-4 border rounded text-sm overflow-x-auto">
          {JSON.stringify(jsonData, null, 2)}
        </pre>
      )}
    </div>
  );
}
