"use client";

import { useState } from "react";

export default function SearchImage() {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);

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
        {images.map((img: any, index) => (
          <div key={index}>
            <img src={img.imageUrl} alt={img.name} className="w-full h-auto" />
            <p>{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
