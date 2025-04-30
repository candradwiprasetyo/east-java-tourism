import Image from "next/image";

const images = [
  "https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/183/2024/08/27/63fdb9789cf09-175183370.jpg",
  "https://www.yukbanyuwangi.co.id/wp-content/uploads/2023/12/DJI_0126_1200.jpg",
  "https://img.okezone.com/content/2020/10/23/408/2298618/fakta-fakta-menarik-taman-nasional-baluran-afrikanya-indonesia-KymfZeNePX.jpg",
  "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/97/b7/6f/tumpak-sewu-waterfalls.jpg?w=1200&h=1200&s=1",
  "https://rainbowrentcar.com/wp-content/uploads/2023/06/Menikmati-Keindahan-Pantai-Papuma-Surga-Tersembunyi-di-Jember-jpg.webp",
  "https://i.ytimg.com/vi/xl4iTWvWUPA/maxresdefault.jpg",
  "https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1692600212-dscf5151-jpg-medium.jpg",
  "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/26/1651611138.jpg",
  "https://cozzy.id/uploads/0000/630/2024/09/25/penginapan-murah-malang-hotel-murah-cozzyid.jpg",
];

const Event = () => {
  return (
    <div className="relative overflow-hidden py-10">
      <div className="container mx-auto px-40">
        <div className="text-[3vw] py-8 text-title-primary">
          The Special{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary">
            Occasion
          </span>{" "}
          of the Year
        </div>
      </div>

      {/* Wrapper animasi */}
      <div className="relative w-full overflow-hidden">
        <div className="flex w-max animate-scroll">
          {[...images, ...images].map((src, index) => (
            <div key={index} className="h-64 w-auto flex-shrink-0">
              <img
                src={src}
                alt={`Image ${index + 1}`}
                className="h-full w-auto object-cover "
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
