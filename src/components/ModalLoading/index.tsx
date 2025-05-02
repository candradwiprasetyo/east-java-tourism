"use client";

import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import PageDivider from "../Divider";

const LoadingModal = () => {
  const animationContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.classList.add("overflow-hidden");

    if (animationContainer.current) {
      const animationInstance = lottie.loadAnimation({
        container: animationContainer.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        path: "/assets/loading-animation-2.json",
      });

      return () => {
        animationInstance.destroy();
        document.body.classList.remove("overflow-hidden");
      };
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 text-title-primary">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center relative overflow-hidden">
        <div ref={animationContainer} className="w-40 h-40 mx-auto mb-4" />
        <p className="text-lg font-semibold pb-24">
          Planning your perfect journey...
        </p>
        <div className="absolute w-full bottom-0 left-0 pointer-events-none z-10">
          <PageDivider direction="up" background="#edcebb" />
        </div>
      </div>
    </div>
  );
};

export default LoadingModal;
