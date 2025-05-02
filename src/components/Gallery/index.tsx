import Image from "next/image";

const Gallery = () => {
  return (
    <div className="bg-[#FDEDE3]">
      <div className="container mx-auto px-40 pb-20">
        <div className="text-[3vw] py-16 text-title-primary px-10 ">
          Discover{" "}
          <span className="text-[4vw] font-bold font-satisfy text-title-secondary ">
            Indonesias
          </span>{" "}
          Iconic Treasures
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-4 pl-6 justify-center">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full "
                src="https://static.promediateknologi.id/crop/0x0:0x0/0x0/webp/photo/p2/183/2024/08/27/63fdb9789cf09-175183370.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Gunung Bromo
              </div>
              {/* <div className="absolute top-3 right-0 bg-[#EC5858] py-1 px-3 text-white rounded-l-full text-sm">
                5 tours
              </div> */}
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://www.yukbanyuwangi.co.id/wp-content/uploads/2023/12/DJI_0126_1200.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Kawah Ijen
              </div>
              {/* <div className="absolute top-3 right-0 bg-blue-400 py-1 px-3 text-white rounded-l-full text-sm">
                5 tours
              </div> */}
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://img.okezone.com/content/2020/10/23/408/2298618/fakta-fakta-menarik-taman-nasional-baluran-afrikanya-indonesia-KymfZeNePX.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Taman Nasional Baluran
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/97/b7/6f/tumpak-sewu-waterfalls.jpg?w=1200&h=1200&s=1"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Air Terjun Tumpak Sewu
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://rainbowrentcar.com/wp-content/uploads/2023/06/Menikmati-Keindahan-Pantai-Papuma-Surga-Tersembunyi-di-Jember-jpg.webp"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Pantai Tiga Warna
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://i.ytimg.com/vi/xl4iTWvWUPA/maxresdefault.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Batu Night Spectacular
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 justify-center">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://wonderfulimage.s3-id-jkt-1.kilatstorage.id/1692600212-dscf5151-jpg-medium.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Jatim Park
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2023/01/26/1651611138.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Pulau Sempu
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://cozzy.id/uploads/0000/630/2024/09/25/penginapan-murah-malang-hotel-murah-cozzyid.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Pantai Papuma
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 pr-8 justify-center">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://www.eastjava.com/tourism/sumenep/images/gili_labak.jpg"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Gili Labak
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://i0.wp.com/melihatindonesia.id/wp-content/uploads/2022/11/sarangan.jpg?fit=722%2C722&quality=89&ssl=1"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0  right-0 bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Telaga Sarangan
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg">
              <Image
                className="h-auto max-w-full rounded-lg"
                src="https://bobobox.com/blog/wp-content//uploads/2024/08/Museum-Angkut-Malang-10-jpg.webp"
                alt=""
                width={500}
                height={300}
              />
              <div className="absolute w-full h-20 bottom-0 left-0 right-0  bg-gradient-to-t from-[#262f53] to-transparent py-3 px-4 flex items-end ">
                Museum Angkut
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
