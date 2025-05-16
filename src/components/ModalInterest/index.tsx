import PageDivider from "../Divider";
import { useTourCategory } from "@/hooks/useTourCategory";

type ModalInterestProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedData: string[];
  onInterestSelect: (interest: string) => void;
};

const ModalInterest = ({
  isOpen,
  onClose,
  selectedData,
  onInterestSelect,
}: ModalInterestProps) => {
  if (!isOpen) return null;

  const { tourCategory } = useTourCategory();

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-10"
        onClick={onClose}
      ></div>
      <div
        className="z-20 bg-white p-6 rounded-2xl text-title-primary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-8">Choose What Excites You</h2>
        <div className="grid grid-cols-2 text-sm gap-y-2 gap-x-4 max-h-60 overflow-y-auto w-[300px]">
          {tourCategory.map((interest, index) => (
            <div key={index} className="flex items-center">
              <div className="w-6">
                <input
                  type="checkbox"
                  checked={selectedData.includes(interest.name)}
                  onChange={() => onInterestSelect(interest.name)}
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer 
      w-5 h-5  focus:outline-none rounded-xl"
                />
              </div>
              <label htmlFor={interest.name} className="ml-2 capitalize">
                {interest.name.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-green-400 text-white p-3 rounded-lg mt-8 block mx-auto"
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

export default ModalInterest;
