"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAdminEvent, Event } from "@/hooks/useEvent";
import { useAdminCity } from "@/hooks/useCity";
import Loading from "@/components/Loading";
import Image from "next/image";
import Link from "next/link";

type Props = {
  editEventId?: number;
  onFinish?: () => void;
};

export default function EventForm({ editEventId, onFinish }: Props) {
  const router = useRouter();
  const isEdit = !!editEventId;

  const { getEventById } = useAdminEvent();
  const { cities } = useAdminCity(1000, 0);

  const [formData, setFormData] = useState<
    Omit<Event, "id" | "created_at" | "updated_at">
  >({
    name: "",
    city_id: 1,
    description: "",
    start_date: "",
    end_date: "",
    thumbnail_url: "",
    images_url: "",
  });

  const [formLoading, setFormLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  useEffect(() => {
    if (editEventId) {
      setFormLoading(true);
      getEventById(editEventId)
        .then((data) => {
          setFormData({
            name: data.name,
            city_id: data.city_id,
            description: data.description,
            start_date: data.start_date.slice(0, 16),
            end_date: data.end_date.slice(0, 16),
            thumbnail_url: data.thumbnail_url,
            images_url: data.images_url,
          });
        })
        .finally(() => setFormLoading(false));
    }
  }, [editEventId, getEventById]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "city_id" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    let thumbnailUrl = formData.thumbnail_url;
    let imagesUrl = formData.images_url;

    try {
      if (imageFile) {
        const uploadData = new FormData();
        uploadData.append("file", imageFile);
        uploadData.append("upload_preset", "main_preset");
        uploadData.append("folder", "events");

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/upload`,
          {
            method: "POST",
            body: uploadData,
          }
        );

        const data = await res.json();
        if (!res.ok) throw new Error("Upload gagal");

        thumbnailUrl = data.secure_url;
        imagesUrl = data.secure_url.replace("/upload/", "/upload/e_sharpen/");
      }

      const payload = {
        ...formData,
        city_id: Number(formData.city_id),
        thumbnail_url: thumbnailUrl,
        images_url: imagesUrl,
      };

      const method = isEdit ? "PUT" : "POST";
      const url = isEdit ? `/api/event/${editEventId}` : "/api/event";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        onFinish ? onFinish() : router.push("/admin/event");
      } else {
        alert("Gagal menyimpan event.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan saat menyimpan.");
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
          {isEdit ? "Edit Event" : "Add New Event"}
        </h1>

        <label className="mb-2 text-xs font-bold">Event Name</label>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">City</label>
        <select
          name="city_id"
          value={formData.city_id}
          onChange={handleChange}
          className="input mb-4"
          required
        >
          <option value="" disabled>
            -- Select City --
          </option>
          {cities.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>

        <label className="mb-2 text-xs font-bold">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Start Date</label>
        <input
          type="datetime-local"
          name="start_date"
          value={formData.start_date}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">End Date</label>
        <input
          type="datetime-local"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
          className="input mb-4"
          required
        />

        <label className="mb-2 text-xs font-bold">Event Image</label>
        {formData.thumbnail_url && (
          <Image
            alt="Thumbnail"
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
            if (e.target.files?.[0]) setImageFile(e.target.files[0]);
          }}
          className="mb-4"
        />

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white px-4 py-2 rounded-full w-1/2"
          >
            {isSubmitting ? "Saving..." : isEdit ? "Update Event" : "Add Event"}
          </button>
          <Link
            href="/admin/event"
            className="bg-red-500 text-white px-4 py-2 rounded-full w-1/2 text-center"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
