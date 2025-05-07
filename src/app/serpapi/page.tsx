"use client";

import { useState } from "react";
import Image from "next/image";

type ImageResult = {
  thumbnail: string;
  title: string;
  link: string;
};

export default function SerpApiPage() {
  const [query, setQuery] = useState("");
  const [image, setImage] = useState<ImageResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query) return;
    setLoading(true);
    setError("");
    setImage(null);

    try {
      const res = await fetch(`/api/serpapi?q=${encodeURIComponent(query)}`);
      if (!res.ok) {
        throw new Error("Gagal mengambil data");
      }
      const data = await res.json();

      if (data && data.thumbnail) {
        setImage(data);
      } else {
        setError("Gambar tidak ditemukan.");
      }
    } catch (err) {
      setError(`Terjadi kesalahan saat mengambil data. ${err}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Pencarian Gambar (SerpApi)
      </h1>
      <div className="flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari gambar (contoh: apel)"
          className="flex-1 p-2 border rounded-md focus:outline-none"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cari
        </button>
      </div>

      {loading && (
        <p className="mt-6 text-center text-gray-600">Memuat gambar...</p>
      )}
      {error && <p className="mt-6 text-center text-red-600">{error}</p>}

      {image && (
        <div className="mt-6 flex justify-center">
          <Image
            src={image.thumbnail}
            alt={image.title}
            className="rounded-lg max-w-xs border shadow-md"
            width={500}
            height={500}
          />
        </div>
      )}
    </div>
  );
}
