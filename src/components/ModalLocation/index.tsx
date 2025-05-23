"use client";

import PageDivider from "../Divider";

const ModalLocation = ({
  isOpen,
  onClose,
  selectedCities,
  onCitySelect,
}: {
  isOpen: boolean;
  onClose: () => void;
  selectedCities: string[];
  onCitySelect: (city: string) => void;
}) => {
  if (!isOpen) return null;

  const cities = [
    "Surabaya",
    "Malang",
    "Kediri",
    "Madiun",
    "Blitar",
    "Probolinggo",
    "Pasuruan",
    "Jember",
    "Banyuwangi",
    "Mojokerto",
    "Batu",
    "Lumajang",
    "Sidoarjo",
    "Ngawi",
    "Bojonegoro",
    "Tuban",
    "Ponorogo",
    "Trenggalek",
    "Pacitan",
    "Magetan",
    "Nganjuk",
    "Situbondo",
    "Bondowoso",
    "Sumenep",
    "Pamekasan",
    "Bangkalan",
    "Gresik",
    "Lamongan",
  ];

  return (
    <>
      <div
        className="fixed w-full bg-black bg-opacity-80 flex justify-center items-center h-screen top-0 left-0 z-30"
        onClick={onClose}
      ></div>
      <div className="bg-white p-8 rounded-2xl text-title-primary fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-40 overflow-hidden">
        <h2 className="text-lg font-bold mb-8">Pick Your Next Journey</h2>
        <div className="grid grid-cols-3 gap-y-2 gap-x-4 text-sm">
          {cities.map((city, index) => (
            <div key={index} className="text-sm flex items-center">
              <div className="w-6">
                <input
                  type="checkbox"
                  id={city}
                  checked={selectedCities.includes(city)}
                  onChange={() => onCitySelect(city)}
                  className="bg-gray-200 hover:bg-gray-300 cursor-pointer w-5 h-5  focus:outline-none rounded-xl"
                />
              </div>
              <div>
                <label htmlFor={city} className="ml-2">
                  {city}
                </label>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="bg-green-400 text-white py-3 px-6 rounded-full mt-4 block mx-auto mb-10"
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

export default ModalLocation;
