"use client";

import { useEffect, useState } from "react";

const pathOptions = [
  "M 300,0 C 300,400 300,800 300,2000",
  "M 100,0 C 200,600 100,1000 200,2000",
  "M 2000,150 C 1600,50 1000,250 -100,150",
  "M 0,650 C 600,800 1200,700 2000,600",
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
      }, 62000);
    };

    spawnBoat();

    const interval = setInterval(() => {
      spawnBoat();
    }, 63000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {boat && (
        <div
          key={boat.id}
          className="w-12 h-12 absolute sail-curve animation-delay-2"
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
            <div className="ripple"></div>
            <div className="ripple"></div>
            <div className="ripple"></div>
            <div className="ripple"></div>
            <div className="ripple"></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BoatAnimationCurved;
