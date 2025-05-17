import React from "react";

interface ModalConfirmDeleteProps {
  isOpen: boolean;
  itemName?: string;
  onCancel: () => void;
  onConfirm: () => Promise<void> | void;
  loading?: boolean;
}

export default function ModalConfirmDelete({
  isOpen,
  itemName = "this item",
  onCancel,
  onConfirm,
  loading = false,
}: ModalConfirmDeleteProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <p className="mb-6">
          Are you sure you want to delete <strong>{itemName}</strong>?
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded border border-gray-300"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
