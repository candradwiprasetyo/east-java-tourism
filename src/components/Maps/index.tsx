const locations = [
  {
    id: 1,
    name: "Kawah Ijen",
    description:
      "Serangkaian gunung berapi terkenal yang mengeluarkan api berwarna biru cerah & mengandung gas belerang.",
    top: "65%",
    left: "70%",
  },
  {
    id: 2,
    name: "Taman Nasional Baluran",
    description:
      "Kawasan lindung yang dikenal sebagai 'Afrika kecil' di Indonesia dengan pegunungan, sabana, & margasatwa.",
    top: "58%",
    left: "73%",
  },
  {
    id: 3,
    name: "Pulau Sempu",
    description:
      "Pantai pasir putih & air jernih menarik minat pengunjung ke pulau ini dengan kolam renang laguna.",
    top: "80%",
    left: "48%",
  },
  {
    id: 4,
    name: "Gunung Bromo",
    description:
      "Gunung vulkanis yang indah di Taman Nasional Bromo Tengger Semeru ini dilengkapi tangga hingga ke atas kawah.",
    top: "62%",
    left: "55%",
  },
  {
    id: 5,
    name: "Batu Night Spectacular",
    description:
      "Taman hiburan yang beroperasi malam hari dengan wahana, pertunjukan langsung, permainan karnaval, & pasar.",
    top: "62%",
    left: "48%",
  },
  {
    id: 6,
    name: "Pantai Balekambang",
    description:
      "Taman hiburan yang beroperasi malam hari dengan wahana, pertunjukan langsung, permainan karnaval, & pasar.",
    top: "78%",
    left: "45%",
  },
  {
    id: 7,
    name: "Gili Labak",
    description:
      "Pulau karang datar dengan pepohonan & dikelilingi terumbu karang untuk snorkeling, berenang & berperahu.",
    top: "35%",
    left: "68%",
  },
  {
    id: 8,
    name: "Pantai Klayar Pacitan",
    description:
      "Teluk kecil & indah dengan pantai pasir luas, formasi batu unik, plus penjual makanan & suvenir.",
    top: "73%",
    left: "22%",
  },
  {
    id: 9,
    name: "Gua Akbar Tuban",
    description:
      "Gua besar dengan formasi batu yang diberi cahaya & ceruk khusus untuk berdoa.",
    top: "27%",
    left: "38%",
  },
  {
    id: 10,
    name: "Taman Candi Ngawi",
    description:
      "Taman rindang dengan kebun geometris, kedai makanan, paviliun piknik, dan taman bermain anak.",
    top: "47%",
    left: "30%",
  },
];

const Maps = () => {
  return (
    <>
      <div className="w-full h-screen bg-maps relative">
        <div className="text-[3vw] py-4 text-title-primary text-center">
          Lets Find{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary ">
            Your
          </span>{" "}
          Next Escape
        </div>

        {locations.map((loc) => (
          <div
            key={loc.id}
            className="absolute group cursor-pointer"
            style={{
              top: loc.top,
              left: loc.left,
              transform: "translate(-50%, -100%)",
            }}
          >
            <div className="animate-bounce text-red-600">
              <i className="material-icons" style={{ fontSize: "42px" }}>
                location_on
              </i>
            </div>
            <div className="absolute hidden group-hover:block bg-gray-700 shadow-lg p-5 rounded-xl w-60 w-auto z-10 text-white">
              <h4 className="font-bold text-sm mb-2">{loc.name}</h4>
              <p className="text-xs text-gray-100">{loc.description}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Maps;
