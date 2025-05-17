"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminCity } from "@/hooks/useCity";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";

export default function CityTable() {
  const router = useRouter();
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { cities, total, loading, error, deleteCity } = useAdminCity(
    limit,
    offset
  );

  const [cityToDelete, setCityToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onEdit = (id: number) => {
    router.push(`/admin/city/edit/${id}`);
  };

  const confirmDelete = async () => {
    if (!cityToDelete) return;

    setIsDeleting(true);
    await deleteCity(cityToDelete.id);
    setIsDeleting(false);
    setCityToDelete(null);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="bg-blue-50 py-5">
      <div className="container mx-auto py-1  max-w-7xl px-6 text-sm">
        <div className="flex justify-between my-4">
          <h1 className="text-xl font-bold">List City</h1>
          <div>
            <Link href={"/admin/city/add"}>
              <button className="ml-6 bg-green-400 py-2 px-5 text-white rounded-[20px] text-sm">
                Add City
              </button>
            </Link>
          </div>
        </div>
        <div className="bg-white rounded-2xl w-full">
          <table className="min-w-full ">
            <thead>
              <tr className="">
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b text-left">Name</th>
                <th className="px-4 py-3 border-b text-left">Longitude</th>
                <th className="px-4 py-3 border-b text-left">Latitude</th>
                <th className="px-4 py-3 border-b text-left">
                  Show on Homepage
                </th>
                <th className="px-4 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cities.map((city) => (
                <tr key={city.id}>
                  <td className="px-4 py-2 border-y">
                    {city.thumbnail_url && (
                      <Image
                        src={city?.thumbnail_url}
                        alt={city.name}
                        className="w-12 h-12 object-cover mx-auto"
                        width={30}
                        height={30}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-y">{city.name}</td>
                  <td className="px-4 py-2 border-y">{city.longitude}</td>
                  <td className="px-4 py-2 border-y">{city.latitude}</td>
                  <td className="px-4 py-2 border-y">
                    {city.is_show_on_gallery ? "Yes" : "No"}
                  </td>
                  <td className="px-4 py-2 border-y ">
                    <button
                      onClick={() => onEdit(city.id)}
                      className="bg-yellow-400 px-3 py-1 rounded-l-full text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setCityToDelete({ id: city.id, name: city.name })
                      }
                      className="bg-red-500 px-3 py-1 rounded-r-full text-white text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center px-4 py-4">
            <p className="text-sm text-gray-600">
              Showing {offset + 1}–{Math.min(offset + limit, total)} of {total}{" "}
              entries
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
              >
                Prev
              </button>
              <span className="text-sm">
                Page {page} of {Math.ceil(total / limit)}
              </span>
              <button
                onClick={() =>
                  setPage((prev) =>
                    prev < Math.ceil(total / limit) ? prev + 1 : prev
                  )
                }
                disabled={page >= Math.ceil(total / limit)}
                className="px-3 py-1 bg-gray-200 rounded-full disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <ModalConfirmDelete
            isOpen={!!cityToDelete}
            itemName={cityToDelete?.name}
            onCancel={() => setCityToDelete(null)}
            onConfirm={confirmDelete}
            loading={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}
