import Image from "next/image";
import { tourData } from "@/constants/tourData";

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
        {tourData.map((loc) => {
          const randomDelay = `${Math.random() * 2}s`;
          return (
            <div
              key={loc.id}
              className="absolute group cursor-pointer"
              style={{
                top: loc.top,
                left: loc.left,
                transform: "translate(-50%, -100%)",
              }}
            >
              <div
                className="animate-bounce text-red-600"
                style={{
                  fontSize: "60px",
                  animationDelay: randomDelay,
                  animationDuration: "1.5s",
                }}
              >
                <i className="material-icons" style={{ fontSize: "42px" }}>
                  location_on
                </i>
              </div>
              <div className="absolute hidden group-hover:block bg-gray-700 shadow-lg rounded-xl w-[240px] z-10 text-white -mt-10 overflow-hidden">
                <div className="relative">
                  <Image
                    src={loc.images}
                    alt={loc.name}
                    width={300}
                    height={256}
                    className="h-full w-auto object-cover"
                  />
                  <div className="text-xs flex items-center mt-2 gap-1 font-bold absolute -bottom-4 right-3 bg-[#eea5a0] px-4 py-2 rounded-full">
                    {loc.city}
                  </div>
                </div>
                <div className="px-4 py-6">
                  <h4 className="font-bold text-sm mb-2">{loc.name}</h4>
                  <p className="text-xs text-gray-300">{loc.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Maps;
