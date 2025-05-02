"use client";

import React from "react";
import PageDivider from "../Divider";

const ModalLoading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 text-title-primary">
      <div className="bg-white p-10 rounded-3xl shadow-lg text-center relative overflow-hidden">
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

export default ModalLoading;
