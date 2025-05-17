"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Loading from "@/components/Loading";
import { useAdminTour } from "@/hooks/useTour";
import { useAdminCity } from "@/hooks/useCity";

type Tour = {
  city_id: number;
  name: string;
  address: string;
  description: string;
  thumbnail_url: string;
  images_url: string;
  longitude: number;
  latitude: number;
  map_top: number;
  map_left: number;
  is_show_on_map: boolean;
  tour_category_id: number;
  map_description: string;
};

type TourCategory = { id: number; name: string };

type Props = {
  editTourId?: number;
  onFinish?: () => void;
};

export default function TourForm({ editTourId, onFinish }: Props) {
  const router = useRouter();
  const { getTourById } = useAdminTour();

  const [formLoading, setFormLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { cities } = useAdminCity(1000, 0);
  const tourCategories: TourCategory[] = [
    {
      id: 1,
      name: "Nature",
    },
    {
      id: 2,
      name: "Culinary",
    },
  ];

  const isEdit = !!editTourId;

  const [formData, setFormData] = useState<
    Omit<Tour, "id" | "created_at" | "updated_at">
  >({
    city_id: cities.length > 0 ? cities[0].id : 1,
    name: "",
    address: "",
    description: "",
    thumbnail_url: "",
    images_url: "",
    longitude: 0,
    latitude: 0,
    map_top: 0,
    map_left: 0,
    is_show_on_map: false,
    tour_category_id: tourCategories.length > 0 ? tourCategories[0].id : 1,
    map_description: "",
  });

  useEffect(() => {
    if (editTourId) {
      setFormLoading(true);
      getTourById(editTourId)
        .then((data) => {
          setFormData({
            city_id: data.city_id,
            name: data.name,
            address: data.address,
            description: data.description,
            thumbnail_url: data.thumbnail_url,
            images_url: data.images_url,
            longitude: data.longitude,
            latitude: data.latitude,
            map_top: data.map_top,
            map_left: data.map_left,
            is_show_on_map: data.is_show_on_map,
            tour_category_id: data.tour_category_id,
            map_description: data.map_description,
          });
        })
        .catch(console.error)
        .finally(() => setFormLoading(false));
    }
  }, [editTourId, getTourById]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target;
    const { name, value, type } = target;
    const checked =
      type === "checkbox" ? (target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
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
        formDataUpload.append("folder", "tours");

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
      const url = isEdit ? `/api/tour/${editTourId}` : "/api/tour";

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
          router.push("/admin/tour");
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
          {isEdit ? "Edit Tour" : "Add New Tour"}
        </h1>

        <label className="mb-2 text-xs font-bold">City</label>
        <select
          name="city_id"
          value={formData.city_id}
          onChange={handleChange}
          className="input mb-4"
          required
        >
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <label className="mb-2 text-xs font-bold">Tour Category</label>
        <select
          name="tour_category_id"
          value={formData.tour_category_id}
          onChange={handleChange}
          className="input mb-4"
          required
        >
          {tourCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <label className="mb-2 text-xs font-bold">Name</label>
        <input
          type="text"
          name="name"
          placeholder="Tour Name"
          value={formData.name}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Address</label>
        <textarea
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Description</label>
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Latitude</label>
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

        <label className="mb-2 text-xs font-bold">Longitude</label>
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

        <label className="mb-2 text-xs font-bold">Map Top (%)</label>
        <input
          type="number"
          name="map_top"
          placeholder="Map Top"
          value={formData.map_top}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Map Left (%)</label>
        <input
          type="number"
          name="map_left"
          placeholder="Map Left"
          value={formData.map_left}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="flex items-center space-x-2 mb-4">
          <input
            type="checkbox"
            name="is_show_on_map"
            checked={formData.is_show_on_map}
            onChange={handleChange}
          />
          <span>Show on Map</span>
        </label>

        <label className="mb-2 text-xs font-bold">Map Description</label>
        <textarea
          name="map_description"
          placeholder="Map Description"
          value={formData.map_description}
          onChange={handleChange}
          className="input mb-4"
        />

        <label className="mb-2 text-xs font-bold">Images</label>
        {isEdit && formData.thumbnail_url && (
          <Image
            alt={formData.name}
            src={formData.thumbnail_url}
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

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-400 text-white px-4 py-2 rounded-full w-1/2"
          >
            {isEdit ? "Update Tour" : "Add Tour"}
          </button>
          <Link
            href="/admin/tour"
            className="bg-red-400 text-white px-4 py-2 rounded-full w-1/2 text-center cursor-pointer"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
