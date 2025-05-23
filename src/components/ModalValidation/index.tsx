import React from "react";

interface ModalValidationProps {
  isOpen: boolean;
  content?: string;
  onClose: () => void;
}

export default function ModalValidation({
  isOpen,
  content,
  onClose,
}: ModalValidationProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Opps</h2>
        <p className="mb-6">{content}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-green-400 text-white"
          >
            Okay
          </button>
        </div>
      </div>
    </div>
  );
}
