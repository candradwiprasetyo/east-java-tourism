import { useState } from "react";
import PageDivider from "../Divider";

type ModalBudgetProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedData: string;
  onBudgetSelect: (budget: string) => void;
};

const ModalBudget = ({
  isOpen,
  onClose,
  selectedData,
  onBudgetSelect,
}: ModalBudgetProps) => {
  const MAX_BUDGET = 20000000;
  const [budget, setBudget] = useState(selectedData);
  const [noLimit, setNoLimit] = useState(false);

  if (!isOpen) return null;

  const handlePick = () => {
    const selectedBudget = noLimit ? "unlimited" : String(budget);
    onBudgetSelect(selectedBudget);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10"
        onClick={onClose}
      ></div>
      <div
        className="z-20 bg-white p-6 rounded-2xl w-96 text-title-primary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Define Your Spending Plan</h2>

        {!noLimit && (
          <>
            <input
              type="range"
              min={0}
              max={MAX_BUDGET}
              step={500000}
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-gray-600 mt-2">
              Max: Rp
              {parseFloat(budget).toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </p>
          </>
        )}

        <label className="inline-flex items-center mt-4 space-x-2">
          <input
            type="checkbox"
            checked={noLimit}
            onChange={(e) => setNoLimit(e.target.checked)}
            className="bg-gray-200 hover:bg-gray-300 cursor-pointer 
      w-5 h-5  focus:outline-none rounded-xl"
          />
          <span className="text-sm">Explore Freely, No Budget Limit</span>
        </label>

        <button
          onClick={handlePick}
          className="bg-green-400 hover:bg-green-600 text-white p-3 rounded-lg mt-6 block mx-auto"
        >
          Pick It
        </button>
        <div className="absolute w-full bottom-0 left-0 pointer-events-none z-[-1]">
          <PageDivider direction="up" color="#edcebb" />
        </div>
      </div>
    </>
  );
};

export default ModalBudget;
