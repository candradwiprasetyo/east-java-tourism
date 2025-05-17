"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { City } from "@/hooks/useCity";
import Link from "next/link";
import Image from "next/image";
import { useAdminCity } from "@/hooks/useCity";
import Loading from "@/components/Loading";

type Props = {
  editCityId?: number;
  onFinish?: () => void;
};

export default function CityForm({ editCityId, onFinish }: Props) {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);

  const { getCityById } = useAdminCity();

  const [formData, setFormData] = useState<
    Omit<City, "id" | "created_at" | "updated_at" | "weather">
  >({
    name: "",
    latitude: 0,
    longitude: 0,
    description: "",
    images_url: "",
    thumbnail_url: "",
    is_show_on_gallery: false,
  });

  const isEdit = !!editCityId;

  useEffect(() => {
    if (editCityId) {
      setFormLoading(true);
      getCityById(editCityId)
        .then((data) => {
          setFormData({
            name: data.name,
            latitude: data.latitude,
            longitude: data.longitude,
            description: data.description,
            images_url: data.images_url,
            thumbnail_url: data.thumbnail_url,
            is_show_on_gallery: data.is_show_on_gallery,
          });
        })
        .catch((err) => {
          console.error("Failed to fetch city:", err);
        })
        .finally(() => {
          setFormLoading(false);
        });
    }
  }, [editCityId, getCityById]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = type === "checkbox" ? target.checked : undefined;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let thumbnailUrl = formData.thumbnail_url;
    let imagesUrl = formData.images_url;

    try {
      if (selectedFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", selectedFile);
        formDataUpload.append("upload_preset", "main_preset");
        formDataUpload.append("folder", "cities");

        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: formDataUpload,
          }
        );

        const cloudinaryData = await cloudinaryRes.json();

        if (!cloudinaryRes.ok) {
          alert("Gagal upload gambar ke Cloudinary");
          setIsSubmitting(false);
          return;
        }

        thumbnailUrl = cloudinaryData.secure_url;
        const publicId = cloudinaryData.public_id;
        imagesUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/e_sharpen/${publicId}.jpg`;
      }

      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `/api/city/${editCityId}` : "/api/city";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          thumbnail_url: thumbnailUrl,
          images_url: imagesUrl,
        }),
      });

      if (res.ok) {
        if (onFinish) {
          onFinish();
        } else {
          router.push("/admin/city");
        }
      } else {
        alert("Failed to submit data.");
      }
    } catch (error) {
      console.error(error);
      alert("Terjadi kesalahan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (formLoading) return <Loading />;

  return (
    <div className="container mx-auto py-1 max-w-7xl px-6 text-sm">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col py-8 max-w-2xl mx-auto"
      >
        <h1 className="text-lg font-bold mb-4 text-center">
          {editCityId ? "Edit City" : "Add New City"}
        </h1>
        <div className="mb-2 text-xs font-bold">Name</div>
        <input
          type="text"
          name="name"
          placeholder="City Name"
          value={formData.name}
          onChange={handleChange}
          className="input mb-4"
          required
        />
        <div className="mb-2 text-xs font-bold">Latitude</div>
        <input
          type="number"
          step="any"
          name="latitude"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={handleChange}
          className="input mb-4"
          required
        />
        <div className="mb-2 text-xs font-bold">Longitude</div>
        <input
          type="number"
          step="any"
          name="longitude"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={handleChange}
          className="input mb-4"
          required
        />
        <div className="mb-2 text-xs font-bold">Description</div>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input mb-4"
          required
        />
        <div className="mb-2 text-xs font-bold">Images</div>
        {isEdit && formData.thumbnail_url && (
          <Image
            alt={formData.name}
            src={formData?.thumbnail_url}
            width={200}
            height={200}
            className="mb-2"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setSelectedFile(e.target.files[0]);
            }
          }}
          className="mb-4"
        />
        <label className="flex items-center space-x-2 my-4">
          <input
            type="checkbox"
            name="is_show_on_gallery"
            checked={formData.is_show_on_gallery}
            onChange={handleChange}
          />
          <span>Show on Gallery</span>
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-400 text-white px-4 py-2 rounded-full w-1/2"
          >
            {isEdit ? "Update City" : "Add City"}
          </button>
          <Link
            href={"/admin/city"}
            className="bg-red-400 text-white px-4 py-2 rounded-full w-1/2 text-center cursor-pointer"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
