"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAdminTour } from "@/hooks/useTour";
import Image from "next/image";
import Link from "next/link";
import Loading from "@/components/Loading";
import ModalConfirmDelete from "@/components/ModalConfirmDelete";

export default function TourTable() {
  const router = useRouter();
  const [limit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const { tours, total, loading, error, deleteTour } = useAdminTour(
    limit,
    offset
  );

  const [tourToDelete, setTourToDelete] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const onEdit = (id: number) => {
    router.push(`/admin/tour/edit/${id}`);
  };

  const confirmDelete = async () => {
    if (!tourToDelete) return;

    setIsDeleting(true);
    await deleteTour(tourToDelete.id);
    setIsDeleting(false);
    setTourToDelete(null);
  };

  if (loading) return <Loading />;
  if (error) return <p className="text-red-500">{error.message}</p>;

  return (
    <div className="bg-blue-50 py-5">
      <div className="container mx-auto py-1 max-w-7xl px-6 text-sm">
        <div className="flex justify-between my-4">
          <h1 className="text-xl font-bold">List Tour</h1>
          <Link href="/admin/tour/add">
            <button className="ml-6 bg-green-400 py-2 px-5 text-white rounded-[20px] text-sm">
              Add Tour
            </button>
          </Link>
        </div>

        <div className="bg-white rounded-2xl w-full">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-3 border-b">Image</th>
                <th className="px-4 py-3 border-b text-left">Name</th>
                <th className="px-4 py-3 border-b text-left">City</th>
                <th className="px-4 py-3 border-b text-left">Category</th>
                <th className="px-4 py-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map((tour) => (
                <tr key={tour.id}>
                  <td className="px-4 py-2 border-y">
                    {tour.thumbnail_url && (
                      <Image
                        src={tour.thumbnail_url}
                        alt={tour.name}
                        className="w-12 h-12 object-cover mx-auto"
                        width={30}
                        height={30}
                      />
                    )}
                  </td>
                  <td className="px-4 py-2 border-y">{tour.name}</td>
                  <td className="px-4 py-2 border-y">{tour.city_name}</td>
                  <td className="px-4 py-2 border-y">
                    {tour.tour_category_name}
                  </td>
                  <td className="px-4 py-2 border-y">
                    <button
                      onClick={() => onEdit(tour.id)}
                      className="bg-yellow-400 px-3 py-1 rounded-l-full text-white text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        setTourToDelete({ id: tour.id, name: tour.name })
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
            isOpen={!!tourToDelete}
            itemName={tourToDelete?.name}
            onCancel={() => setTourToDelete(null)}
            onConfirm={confirmDelete}
            loading={isDeleting}
          />
        </div>
      </div>
    </div>
  );
}
