"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageResult {
  name: string;
  imageUrl: string;
}

export default function SearchImage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<ImageResult[]>([]);

  const fetchImages = async () => {
    const res = await fetch(`/api/searchImages?query=${query}`);
    const data = await res.json();
    setImages(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Cari tempat..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border p-2"
      />
      <button onClick={fetchImages} className="bg-blue-500 text-white p-2 ml-2">
        Cari
      </button>

      <div className="grid grid-cols-3 gap-4 mt-4">
        {images.map((img, index) => (
          <div key={index}>
            <Image
              src={img.imageUrl}
              alt={img.name}
              width={400}
              height={300}
              className="w-full h-auto"
            />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
