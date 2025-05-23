"use client";

import { useEffect, useState } from "react";

const pathOptions = [
  // Rute kiri ke kanan, sedikit lebih tinggi dari kotak
  "M 0,150 C 300,0 1200,300 2000,150",

  // Rute atas ke bawah, tapi agak ke kanan dan zig-zag
  "M 1400,0 C 1300,300 1500,600 1400,2000",

  // Rute kanan ke kiri, tapi lebih bawah dari kotak
  "M 2000,750 C 1400,800 800,650 -100,750",

  // Rute bawah ke atas, agak ke kanan dan tidak menabrak tengah
  "M 1400,1200 C 1300,900 1500,600 1400,-100",
];

const BoatAnimationCurved = () => {
  const [boat, setBoat] = useState<{ id: number; path: string } | null>(null);

  useEffect(() => {
    const spawnBoat = () => {
      const id = Date.now();
      const path = pathOptions[Math.floor(Math.random() * pathOptions.length)];
      setBoat({ id, path });

      setTimeout(() => {
        setBoat(null);
      }, 55000);
    };

    spawnBoat();

    const interval = setInterval(() => {
      spawnBoat();
    }, 56000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {boat && (
        <div
          key={boat.id}
          className="w-12 h-12 absolute sail-curve-2"
          style={{
            offsetPath: `path("${boat.path}")`,
            // @ts-expect-error: WebkitOffsetPath is a non standard css property
            WebkitOffsetPath: `path("${boat.path}")`,
            backgroundImage: `url('/assets/images/boat.png')`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="wave">
            <div className="ripple "></div>
            <div className="ripple "></div>
            <div className="ripple "></div>
            <div className="ripple "></div>
            <div className="ripple "></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoatAnimationCurved;
