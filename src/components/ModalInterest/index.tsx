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

  const interests: string[] = [
    "nature",
    "culture",
    "culinary",
    "adventure",
    "relaxation",
    "shopping",
    "history",
    "spiritual",
    "wildlife",
    "urban",
    "photography",
    "romantic",
    "family",
    "eco-tourism",
  ];

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        onClick={onClose}
      ></div>
      <div
        className="bg-white p-6 rounded-lg w-96 text-black absolute mx-auto left-0 right-0"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4">Choose Interest</h2>
        <div className="grid grid-cols-3 text-sm gap-2 max-h-60 overflow-y-auto">
          {interests.map((interest, index) => (
            <div key={index} className="flex items-center">
              <input
                type="checkbox"
                id={interest}
                checked={selectedData.includes(interest)}
                onChange={() => onInterestSelect(interest)}
              />
              <label htmlFor={interest} className="ml-2 capitalize">
                {interest.replace("-", " ")}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModalInterest;
