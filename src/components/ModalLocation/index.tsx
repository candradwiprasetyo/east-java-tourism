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
        className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center"
        onClick={onClose}
      ></div>
      <div className="bg-white p-6 rounded-lg w-96 text-black absolute mx-auto left-0 right-0">
        <h2 className="text-lg font-bold mb-4">Choose Destination</h2>
        <div className="grid grid-cols-3 text-sm">
          {cities.map((city, index) => (
            <div key={index} className="text-sm flex items-center">
              <input
                type="checkbox"
                id={city}
                checked={selectedCities.includes(city)} // centang jika kota ada di selectedCities
                onChange={() => onCitySelect(city)} // update pilihan kota saat checkbox berubah
              />
              <label htmlFor={city} className="ml-2">
                {city}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ModalLocation;
