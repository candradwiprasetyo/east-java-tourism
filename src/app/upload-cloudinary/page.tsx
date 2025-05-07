"use client";

import { useState } from "react";
import Image from "next/image";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Pilih gambar terlebih dahulu!");

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/cloudinary", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Gagal mengupload gambar");
      }

      const data = await response.json();
      setImageUrl(data.url);
      alert("Gambar berhasil diupload!");
    } catch (error) {
      alert(`Terjadi kesalahan saat mengupload gambar. ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Upload Gambar ke Cloudinary</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>

      {imageUrl && (
        <div>
          <h3>Gambar yang diupload:</h3>
          <Image src={imageUrl} alt="Uploaded Image" width={300} height={300} />
        </div>
      )}
    </div>
  );
}
